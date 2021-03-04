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
  quantity: {
    type: Sequelize.INTEGER
  },
  imgUrl: {
    type: Sequelize.TEXT,
    defaultValue: 'https://picsum.photos/200/300',
    allowNull: false
  }
})
module.exports = Product
