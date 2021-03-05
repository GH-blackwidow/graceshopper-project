/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../server/db')
const OrderProducts = db.model('orderProducts')

describe('OrderProducts model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  it('has field quantity', async () => {
    const orderProducts = await OrderProducts.create({
      quantity: 4
    })
    expect(orderProducts.quantity).to.equal(4)
  })
  it('requires quantity', async () => {
    const orderProductsNull = OrderProducts.build()
    try {
      await orderProductsNull.validate()
      throw Error('validation should have failed without quantity')
    } catch (err) {
      expect(err.message).to.contain('quantity cannot be null')
    }
  })
  it('quantity cannot be empty', async () => {
    const orderPaymentEmpty = OrderProducts.build({
      quantity: ''
    })
    try {
      await orderPaymentEmpty.validate()
      throw Error('validation should have failed with empty quantity')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on quantity')
    }
  })
}) // end describe('OrderProducts model')
