const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },

  origin: {
    type: Sequelize.STRING,
    allowNull: false
  },

  alcoholContent: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reviews: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})
module.exports = Product
