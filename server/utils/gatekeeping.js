<<<<<<< HEAD
const User = require('../db/models.user')
const Order = require('../db/models/order')
=======
const {User, Order} = require('../db/models')

>>>>>>> 262cc07be5cb599e72aefe5deb2fbe692cd68282

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
  const user = await User.findOne({
    where: {
      id: req.user.id
    },
    include: {
      model: Order
    }
  })
  if (user.order.id === req.params.orderId) {
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
