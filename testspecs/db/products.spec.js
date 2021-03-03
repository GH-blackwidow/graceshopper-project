const {expect} = require('chai')
const db = require('../../server/db')
const Product = db.model('product')
describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('Create new product', () => {
      let beer

      beforeEach(async () => {
        beer = await Product.create({
          name: 'Bud Light',
          alcoholContent: 4.2,
          ounces: 12,
          price: 2.99,
          imgUrl:
            'https://products2.imgix.drizly.com/ci-bud-light-b9f56e308351885e.jpeg?auto=format%2Ccompress&fm=jpg&q=20'
        })
      })

      it('create a beer with correct name', () => {
        expect(beer.name).to.be.equal('Bud Light')
      })

      it('create a beer with correct price', () => {
        expect(beer.price).to.be.equal(2.99)
      })
      it('requires name, alcoholContent, price', async () => {
        const newBeer = Product.build()
        try {
          await newBeer.validate()
          throw Error(
            'validation should have failed without name, alcoholContent, price'
          )
        } catch (err) {
          expect(err.message).to.contain('name cannot be null')
          expect(err.message).to.contain('alcoholContent cannot be null')
          expect(err.message).to.contain('price cannot be null')
        }
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
