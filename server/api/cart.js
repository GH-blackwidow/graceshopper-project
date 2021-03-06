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
      isCurrent: true,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
  return items
}

//get items in the cart based on currentSession or userId
router.get('/:userId', async (req, res, next) => {
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
router.put('/:userId', async (req, res, next) => {
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
              quantity: req.body.quantity,
            })
      }
    }
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
