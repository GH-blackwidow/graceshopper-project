const Sequelize = require('sequelize')
const db = require('../db')
const {DataTypes} = require('sequelize')

const Order = db.define('order', {
  // quantity: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     min: 1,
  //     notEmpty: true
  //   }
  // },
  isCurrent: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.VIRTUAL
  }
})

module.exports = Order
