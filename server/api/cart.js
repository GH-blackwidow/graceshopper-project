const router = require('express').Router()
const {Order, Product} = require('../db/models')
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
  const items = await Order.findAll({
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

//get items in the cart based on currentSession or userId
router.get('/:userId', verifyCorrectUser, async (req, res, next) => {
  try {
    const {userId} = req.params
    if (!userId) {
      res.json(req.session.cart)
    } else {
      const cart = await cartItem(userId)
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

//route to update cart in total (add & deletes & creation)
router.put('/:userId', verifyCorrectUser, async (req, res, next) => {
  try {
    req.session.cart = req.body //update everyone's session with new cart data
    const {userId} = req.params
    //only update/create instance if someone is an user
    if (userId) {
      const currentOrder = await cartItem(userId)
      if (userId) {
        currentOrder
          ? await currentOrder.update(req.body)
          : await Order.create({
              userId: userId,
              productId: req.body.productId,
              quantity: req.body.quantity
            })
      }
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
//add route updates the order quantity
router.post('/add', verifyCorrectUser, async (req, res, next) => {
  const productData = await Product.findById(req.body.productId)
  if (!req.user) {
    req.session.cart.push({
      productId: req.body.productId,
      quantity: req.body.quantity,
      product: productData
    })
  } else {
    await Order.create({
      userId: req.user.id,
      productId: req.body.productId,
      quantity: req.body.quantity
    })

    const cart = await cartItem(req.user.id)
    req.session.cart = cart
  }
  res.json(req.session.cart)
})
