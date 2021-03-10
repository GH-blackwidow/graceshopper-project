const router = require('express').Router()
const {Order, Product, OrderProducts} = require('../db/models')
const {verifyCorrectUser} = require('../utils/gatekeeping')
module.exports = router

router.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  next()
})
//function that fetch the current cart items from the database
async function cartItem(id) {
  const items = await Order.findOne({
    where: {
      userId: id,
      isCurrent: true
    },
    include: [
      {
        model: Product
      }
    ]
  })
  return items
}
//function that checks if product is in current cart in database
async function inCart(currentCartId, productId) {
  const product = await OrderProducts.findOne({
    where: {
      orderId: currentCartId,
      productId: productId
    }
  })
  return product
}
//function that creates a new product instance in an order
async function newProduct(newOrderId, productId) {
  const product = await OrderProducts.create({
    orderId: newOrderId,
    productId: productId,
    quantity: 1
  })
  return product
}

//get items in the cart based on currentSession or userId
router.get('/:userId', async (req, res, next) => {
  try {
    const {userId} = req.params
    if (!userId) {
      res.json(req.session.cart)
    } else {
      const cart = await cartItem(userId)
      if (!cart) {
        const newOrder = await Order.create({
          userId: userId
        })
        res.json(newOrder)
      } else {
        res.json(cart)
      }
    }
  } catch (error) {
    next(error)
  }
})

//adds product to cart or increments current quantity
//req.body: userId, productId
router.post('/add', async (req, res, next) => {
  try {
    const {userId, productId} = req.body
    //if user is signed in
    if (userId) {
      const existingOrder = await cartItem(userId)
      //if there are no other existing carts & this is an existing user
      if (!existingOrder && userId) {
        const newOrder = await Order.create({
          userId: userId
        })
        //set first product and quantity to in orderProducts
        const newItem = await newProduct(newOrder.id, productId)
      } else {
        const currentCart = await cartItem(userId)
        //checks if product is in cart
        const productOrdered = await inCart(currentCart.id, productId)
        //if the product is already in cart increment order
        if (productOrdered) {
          await productOrdered.increment('quantity')
        } else {
          //else add a new product to the cart
          const newItem = await newProduct(currentCart.id, productId)
        }
      }
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//deletes product to cart or decrements current quantity
//req.body: userId, productId
router.post('/decrement', async (req, res, next) => {
  try {
    const {productId, userId} = req.body
    //if user is signed in
    if (userId) {
      const currentCart = await cartItem(userId)
      //checks if product is in cart
      const productOrdered = await inCart(currentCart.id, productId)
      //if the product is already in cart && equal to 1 destroy instance
      if (productOrdered && productOrdered.quantity === 1) {
        await productOrdered.destroy()
      } else {
        //else add a decrement quantity
        await productOrdered.decrement('quantity')
      }
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//CHECKOUT: updates order status to false
//req.body: userId
router.post('/checkout', async (req, res, next) => {
  try {
    const userArray = Object.keys(req.body)
    const userId = userArray[0]
    if (userId) {
      const currentCart = await cartItem(userId)
      currentCart.update({isCurrent: false})
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//completely remove the product
router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    const currentOrder = await Order.findByPk(req.params.orderId)
    currentOrder.removeProduct(req.params.productId)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
