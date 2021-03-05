'use strict'
const faker = require('faker')
const {green, red} = require('chalk')
const db = require('../server/db')
const {Product, Users, Order, OrderProducts} = require('../server/db/models')

const products = [
  {
    name: 'Bud Light',
    alcoholContent: 4.2,
    ounces: 12,
    price: 2.99,
    imgUrl:
      'https://centralsupercenter.com/wp-content/uploads/1970/01/bud-light-beer-12oz.jpg'
  },
  {
    name: 'Heineken Light',
    alcoholContent: 3.3,
    ounces: 12,
    price: 2.49,
    imgUrl:
      'https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_02cbe056-3367-4ce8-831d-cea75829e6ee.jpeg'
  },
  {
    name: 'Blue Moon Belgian White Wheat Beer',
    alcoholContent: 5.4,
    ounces: 19.02,
    price: 1.99,
    imgUrl:
      'https://products2.imgix.drizly.com/ci-blue-moon-belgian-white-ee35696c26860416.jpeg?auto=format%2Ccompress&fm=jpg&q=20'
  },
  {
    name: 'Lagunitas IPA',
    alcoholContent: 6.2,
    ounces: 19.02,
    price: 2.29,
    imgUrl:
      'https://dydza6t6xitx6.cloudfront.net/ci-lagunitas-ipa-ea3c01b7b5a23bd8.png'
  },
  {
    name: 'Corona Light',
    alcoholContent: 4.1,
    ounces: 19.02,
    price: 2.49,
    imgUrl:
      'https://www.wallywine.com/media/catalog/product/cache/1/image/1800x/9df78eab33525d08d6e5fb8d27136e95/0/0/000714.jpg'
  }
]

//dummy date for beer:
//const fakerProduct = [...Array(10)].map((product) => ({
//   name: faker.lorem.word(),
//   alcoholContent: faker.random.float({min: 2.0, max: 4.5}),
//   ounces: 12,
//   price: faker.commerce.price({min: 1.59, max: 4.99}),
// }))

const users = [...Array(10)].map(() => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isAdmin: faker.random.boolean(),
  age: faker.random.number({min: 21, max: 40})
}))

const orders = [...Array(10)].map(() => ({
  quantity: faker.random.number({min: 1, max: 10}),
  // shippingCost: (Math.random() * (5.0 - 1.0 + 1.0) + 1.0).toFixed(2),
  isCurrent: faker.random.boolean(),
  // shippingAddress: faker.address.streetAddress(),
  userId: faker.random.number({min: 1, max: users.length}),
  productId: faker.random.number({min: 1, max: products.length})
}))

const orderProducts = [...Array(10)].map(() => ({
  quantity: faker.random.number({min: 1, max: 10}),
  orderId: faker.random.number({min: 1, max: orders.length}),
  productId: faker.random.number({min: 1, max: products.length})
}))

const seed = async () => {
  try {
    await db.sync({force: true})
    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )
    await Promise.all(
      users.map(user => {
        return Users.create(user)
      })
    )
    await Promise.all(
      orders.map(order => {
        return Order.create(order)
      })
    )
    await Promise.all(
      orderProducts.map(orderProduct => {
        return OrderProducts.create(orderProduct)
      })
    )
  } catch (err) {
    console.log(red(err))
  }
}
module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
