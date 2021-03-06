const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

//get all past user orders
router.get('/', async (req, res, next) => {
  try {
    //there's no virtual field for subtotal
    //need to better understand how we're getting the userId
    const pastOrders = await Order.findAll({
      where: {
        isCurrent: false,
        userId: req.body.userId //not sure if this will be the best way to get the Id? or should do req.session?
      },
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(pastOrders)
  } catch (error) {
    next(error)
  }
})
