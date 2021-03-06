const router = require('express').Router()
const {Order, Product} = require('../db/models')
module.exports = router

//get all past user orders
router.get('/:userId', async (req, res, next) => {
  try {
    //there's no virtual field for subtotal
    const pastOrders = await Order.findAll({
      where: {
        isCurrent: false,
        userId: req.params.userId,
      },
      include: [
        {
          model: Product,
        },
      ],
    })
    res.json(pastOrders)
  } catch (error) {
    next(error)
  }
})
