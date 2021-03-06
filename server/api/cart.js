const router = require('express').Router()
const {Order, Product} = require('../db/models')
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
router.get('/', async (req, res, next) => {
  //how to identify is someone has a session already is it req.user? req.body.user?
  try {
    if (!req.user) {
      res.json(req.session.cart)
    } else {
      const cart = await cartItem(req.user.id)
      res.json(cart)
    }
  } catch (error) {
    next(error)
  }
})

//route to update cart in total
router.put('/', async (req, res, next) => {
  try {
    req.session.cart = req.body //update session with new cart data
    const currentOrder = await Order.findAll({
      where: {
        isCurrent: true,
        userId: req.body.userId //not sure is this is right to find the userId
      },
      include: [
        {
          model: Product
        }
      ]
    })
    if (currentOrder) {
      //if current order then update
      await currentOrder.update(req.body)
    } else {
      //if not create a new order
      await Order.create({
        userId: req.body.user,
        productId: req.body.productId,
        quantity: req.body.quantity
      })
    }
    req.session.cart = req.body
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
