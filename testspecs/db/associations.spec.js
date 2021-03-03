const {expect} = require('chai')
const db = require('../../server/db/db')
const Users = db.model('users')
const Order = db.model('order')
const Product = db.model('product')

describe('Model Relations', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  describe('Product and Order models', () => {
    let product1, product2, order, order2
    beforeEach(async () => {
      order = await Order.create({
        quantity: 1,
        shippingCost: 5,
        currentOrder: true,
        shippingAddress: '111 Water Lane',
        subtotal: 30
      })
      product1 = await Product.create({
        name: 'BubblyBeer',
        alcoholContent: 0.7,
        ounces: 8,
        price: 6,
        quantity: 1,
        orderId: order.id
      })
      product2 = await Product.create({
        name: 'BigBrews',
        alcoholContent: 0.6,
        ounces: 8,
        price: 5,
        quantity: 1,
        orderId: order.id
      })
      order2 = await Order.create({
        quantity: 1,
        shippingCost: 5,
        currentOrder: true,
        shippingAddress: '111 Water Lane',
        subtotal: 25
      })
    })
    afterEach(() => db.sync({force: true}))

    it('an order may have many products', async () => {
      const result = await order.hasProducts([product1, product2])
      expect(result).to.be.equal(true)
    })
    it('a product can have many orders', async () => {
      const example = await product.hasOrders([order, order2])
      expect(example).to.be.equal(true)
    })
  })
})

describe('Model Relations', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  describe('User and Order models', () => {
    let user1, user2, order1, order2
    beforeEach(async () => {
      user1 = await Users.create({
        name: 'Paul',
        email: 'paul@aol.com',
        address: '319 South Ave'
      })
      user2 = await Users.create({
        name: 'Jim',
        email: 'jim@gmail.com',
        address: '999 Love St'
      })
      order1 = await Order.create({
        quantity: 1,
        shippingCost: 5,
        currentOrder: true,
        shippingAddress: '111 Water Lane',
        subtotal: 3,
        userId: users.id
      })
      order2 = await Order.create({
        quantity: 1,
        shippingCost: 5,
        currentOrder: true,
        shippingAddress: '111 Water Lane',
        subtotal: 3,
        userId: users.id
      })
    })
    afterEach(() => db.sync({force: true}))

    it('Users can have many orders', async () => {
      const result = await users.hasOrders([order1, order2])
      expect(result).to.be.equal(true)
    })
    it('An order has one user', async () => {
      const example = await order.hasUserss([user1, user2])
      expect(example).to.be.rejected
    })
  })
})
