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
  isCurrent: {
    type: Sequelize.BOOLEAN,
    allowNull: false
    //true until order is completed
  },
  subtotal: {
    type: DataTypes.VIRTUAL
  }
})

module.exports = Order
