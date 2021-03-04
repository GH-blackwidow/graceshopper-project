const Users = require('./user')
const Product = require('./product')
const Order = require('./orders')

Users.hasMany(Order)
Order.belongsTo(Users)
Product.hasMany(Order)
Order.belongsTo(Product)

module.exports = {
  Product,
  Users,
  Order
}
