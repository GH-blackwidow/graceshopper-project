'use strict'
const faker = require('faker')
const {green, red} = require('chalk')
const db = require('../server/db')
const {Product, Users, Order} = require('../server/db/models')

const products = [
  {
    name: 'Bud Light',
    alcoholContent: 4.2,
    ounces: 12,
    price: 2.99,
    imgUrl:
      'https://products2.imgix.drizly.com/ci-bud-light-b9f56e308351885e.jpeg?auto=format%2Ccompress&fm=jpg&q=20'
  },
  {
    name: 'Heineken Light',
    alcoholContent: 3.3,
    ounces: 12,
    price: 2.49,
    imgUrl:
      'https://products3.imgix.drizly.com/ci-heineken-light-ccc4c123d69f7425.jpeg?auto=format%2Ccompress&fm=jpg&q=20'
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
      'https://products3.imgix.drizly.com/ci-lagunitas-ipa-ea3c01b7b5a23bd8.png?auto=format%2Ccompress&fm=jpg&q=20'
  },
  {
    name: 'Corona Light',
    alcoholContent: 4.1,
    ounces: 19.02,
    price: 2.49,
    imgUrl:
      'https://products0.imgix.drizly.com/ci-corona-light-7bd9c33898fb3769.jpeg?auto=format%2Ccompress&fm=jpg&q=20'
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
  address: faker.address.streetAddress(),
  payment: '4604876475938242',
  registered: faker.random.boolean(),
  password: faker.internet.password(),
  age: faker.random.number({min: 21, max: 40})
}))

const orders = [...Array(10)].map(() => ({
  quantity: faker.random.number({min: 1, max: 500}),
  shippingCost: (Math.random() * (5.0 - 1.0 + 1.0) + 1.0).toFixed(2),
  currentOrder: faker.random.boolean(),
  shippingAddress: faker.address.streetAddress(),
  payment: '4604876475938242',
  userId: faker.random.number({min: 1, max: users.length}),
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
