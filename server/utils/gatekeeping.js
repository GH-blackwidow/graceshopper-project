const {Users, Order} = require('../db/models')
const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    const err = new Error('Unauthorized')
    err.status = 401
    next(err)
  }
}

const verifyCorrectUser = async (req, res, next) => {
  const order = await Order.findOne({
    where: {
      id: req.order.id
    },
    include: {
      model: Users
    }
  })
  if (order.userId === req.params.user.id) {
    next()
  } else {
    const err = new Error('Unauthorized')
    err.status = 401
    next(err)
  }
}

module.exports = {
  verifyAdmin,
  verifyCorrectUser
}
