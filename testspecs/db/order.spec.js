/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('order quantity instance methods', () => {
    it('order quantity cannot be null', async () => {
      await expect(
        Order.create({
          quantity: null,
          shippingCost: 1,
          currentOrder: false,
          shippingAddress: '115 ave A New York, New York 10016',
          productId: 1,
          userId: 1
        }),
        "We shouldn't be able to create a order with no quantity"
      ).to.be.rejected
    })
  })
  describe('shipping cost instance methods', () => {
    it('shipping cost cannot be null', async () => {
      await expect(
        Order.create({
          quantity: 5,
          shippingCost: null,
          currentOrder: false,
          shippingAddress: '115 ave A New York, New York 10016',
          productId: 1,
          userId: 1
        }),
        "We shouldn't be able to create a order without shipping cost"
      ).to.be.rejected
    })
  })
  describe('address instance methods', () => {
    it('address cannot be an empty string', async () => {
      await expect(
        Order.create({
          quantity: 5,
          shippingCost: 1,
          currentOrder: false,
          shippingAddress: '',
          productId: 1,
          userId: 1
        }),
        "We shouldn't be able to create a order with an empty address"
      ).to.be.rejected
    })
  })
})
