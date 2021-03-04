const Users = require('./users')
const Product = require('./product')
const Order = require('./orders')

Users.hasMany(Order)
Order.belongsTo(Users)
Order.hasMany(Product, {through: 'product'})
Product.belongsToMany(Order, {through: 'order'})

module.exports = {
  Product,
  Users,
  Order
}
