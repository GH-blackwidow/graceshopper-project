const Users = require('./users')
const Product = require('./product')
const Order = require('./orders')

//old
Users.hasMany(Order)
Order.hasOne(Users)
Product.belongsTo(Order)
Order.hasMany(Product)

//new
Users.hasMany(Order)
Order.belongsTo(Users)
Product.hasMany(Order)
Order.belongsTo(Product)

module.exports = {
  Users,
  Product,
  Order
}
