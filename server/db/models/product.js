const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  style: {
    type: Sequelize.STRING
  },
  origin: {
    type: Sequelize.STRING
  },

  alcoholContent: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  ounces: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.TEXT
  },
  reviews: {
    type: Sequelize.TEXT
  }
})
module.exports = Product
