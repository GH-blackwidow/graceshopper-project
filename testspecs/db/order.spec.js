/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../../server/db')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has fields quantity, shippingCost, currentOrder ,shippingAddress and payment', async () => {
    const order = await Order.create({
      quantity: 1,
      shippingCost: 1,
      currentOrder: false,
      shippingAddress: '115 ave A New York, New York 10016',
      payment: '4604876475938242'
    })
    expect(order.quantity).to.equal(1)
    expect(order.shippingCost).to.equal(1)
    expect(order.currentOrder).to.equal(false)
    expect(order.shippingAddress).to.equal('115 ave A New York, New York 10016')
    expect(order.payment).to.equal('4604876475938242')
  })
  it('requires quantity, shippingCost, currentOrder, shippingAddress and payment', async () => {
    const orderNull = Order.build()
    try {
      await orderNull.validate()
      throw Error(
        'validation should have failed without quantity, shippingCost, currentOrder, shippingAddress and payment'
      )
    } catch (err) {
      expect(err.message).to.contain('quantity cannot be null')
      expect(err.message).to.contain('shippingCost cannot be null')
      expect(err.message).to.contain('currentOrder cannot be null')
      expect(err.message).to.contain('shippingAddress cannot be null')
      expect(err.message).to.contain('payment cannot be null')
    }
  })
  it('quantity, shippingCost, shippingAddress and payment cannot be empty', async () => {
    const orderPayment = Order.build({
      quantity: '',
      shippingCost: '',
      currentOrder: false,
      shippingAddress: '115 ave A New York, New York 10016',
      payment: ''
    })
    try {
      await orderPayment.validate()
      throw Error('validation should have failed with invalid payment')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on quantity')
    }
  })
  it('payment must be valid', async () => {
    const orderEmpty = Order.build({
      quantity: 1,
      shippingCost: 1,
      currentOrder: false,
      shippingAddress: '',
      payment: '25'
    })
    try {
      await orderEmpty.validate()
      throw Error(
        'validation should have failed with empty quantity, shippingCost, shippingAddress and payment'
      )
    } catch (err) {
      expect(err.message).to.contain(
        'Validation isCreditCard on payment failed'
      )
    }
  })
}) // end describe('Order model')
