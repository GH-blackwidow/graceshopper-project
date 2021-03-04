const Users = require('./users')
const Product = require('./product')
const Order = require('./orders')

Users.hasMany(Order)
Order.belongsTo(Users)
Order.hasMany(Product)
Product.belongsTo(Order)

module.exports = {
  Product,
  Users,
  Order
}
