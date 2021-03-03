// const {expect} = require('chai')
// const db = require('../../server/db/db')
// const Users = db.model('users')
// const Order = db.model('order')
// const Product = db.model('product')

// describe('Model Relations', () => {
//   before(() => db.sync({force: true}))
//   afterEach(() => db.sync({force: true}))

//   describe('Product and Order models', () => {
//     let product1, product2, order
//     beforeEach(async () => {
//       order = await Order.create({
//         quantity: 1,
//         shippingCost: 5,
//         currentOrder: true,
//         shippingAddress: '111 Water Lane',
//         subtotal: 30
//       })
//       product1 = await Product.create({
//         name: BubblyBeer,
//         alcoholContent: 0.7,
//         ounces: 8,
//         price: 6,
//         quantity: 1
//       })
//       product2 = await Product.create({
//         name: BubblyBeer,
//         alcoholContent: 0.7,
//         ounces: 8,
//         price: 6,
//         quantity: 1
//       })
//     })
//     afterEach(() => db.sync({force: true}))

//     it('an order may have many products', async () => {
//       const result = await order.hasProducts([product1, product2])
//       expect(result).to.be.equal(true)
//     })
//   })
// })
