const Users = require('./user')
const Product = require('./product')
const Order = require('./orders')
const OrderProducts = require('./order-products')

Users.hasMany(Order)
Order.belongsTo(Users)
Order.belongsToMany(Product, {through: OrderProducts})
Product.belongsToMany(Order, {through: OrderProducts})

module.exports = {
  Product,
  Users,
  Order,
  OrderProducts
}
