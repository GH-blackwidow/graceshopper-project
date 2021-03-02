const Sequelize = require('sequelize')
const db = require('../db')
const {DataTypes} = require('sequelize')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  shippingCost: {
    type: Sequelize.INTEGER,
    allowNull: false
    //flat rate per order, and split up by item in the front-end
  },
  currentOrder: {
    type: Sequelize.BOOLEAN,
    allowNull: false
    //true for items in the cart
  },
  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.VIRTUAL
  }
})

module.exports = Order

//Seed Data will look like:
//quantity ordered, shippingCost, orderhistory, shippingAddress, productId(association), userId(association), (subtotal virtual field)

//Associations:
// product belongs to order (productId)
// order has many products

// order belongs to user (userId)
// user has one order
