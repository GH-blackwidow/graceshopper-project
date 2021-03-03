const Users = require('./users')
const Product = require('./product')
const Order = require('./orders')

Users.hasMany(Order)
Order.hasOne(Users)
Product.belongsTo(Order)
Order.hasMany(Product)

module.exports = {
  Users,
  Product,
  Order
}
