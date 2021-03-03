const {expect} = require('chai')
const db = require('../../server/db')
const Product = db.model('product')
const seed = require('../../script/seed')
describe('Seed file', () => {
  beforeEach(seed)

  it('populates the database with at least 5 products', async () => {
    const seededProducts = await Product.findAll()
    expect(seededProducts).to.have.lengthOf.at.least(5)
  })
})
