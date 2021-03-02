/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })
  describe('ensure order quantity has a check for null', () => {
    it('order quantity cannot be null', async () => {
      await expect(
        Order.create({
          quantity: null,
          shippingCost: 1,
          currentOrder: false,
          shippingAddress: '115 ave A New York, New York 10016'
        }),
        "We shouldn't be able to create an order with no quantity"
      ).should.be.rejected
    })
  })

  describe('ensure shipping cost has a check for null', () => {
    it('shipping cost cannot be null', async () => {
      await expect(
        Order.create({
          quantity: 5,
          shippingCost: null,
          currentOrder: false,
          shippingAddress: '115 ave A New York, New York 10016'
        }),
        "We shouldn't be able to create a order without shipping cost"
      ).should.be.rejected
    })
  })

  describe('address instance methods', () => {
    it('address cannot be an empty string', async () => {
      await expect(
        Order.create({
          quantity: 5,
          shippingCost: 1,
          currentOrder: false,
          shippingAddress: ''
        }),
        "We shouldn't be able to create a order with an empty address"
      ).should.be.rejected
    })
  })
})
