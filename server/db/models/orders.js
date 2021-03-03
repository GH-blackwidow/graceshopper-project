const Sequelize = require('sequelize')
const db = require('../db')
const {DataTypes} = require('sequelize')

const Order = db.define('order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      notEmpty: true
    }
  },
  shippingCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
    //flat rate per order, and split up by item in the front-end
  },
  currentOrder: {
    type: Sequelize.BOOLEAN,
    allowNull: false
    //true for items in the cart
  },
  shippingAddress: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  subtotal: {
    type: DataTypes.VIRTUAL
  },
  payment: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isCreditCard: true,
      notEmpty: true
    }
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
