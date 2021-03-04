const Sequelize = require('sequelize')
const db = require('../db')
const {DataTypes} = require('sequelize')

const OrderProducts = db.define('orderProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      notEmpty: true
    }
  }
})

module.exports = OrderProducts
