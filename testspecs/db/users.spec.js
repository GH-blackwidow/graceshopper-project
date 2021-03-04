const {expect} = require('chai')
const db = require('../../server/db')
const Users = db.model('users')

describe('Users Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))

  describe('validations', () => {
    it('must include name, email, address, and payment', async () => {
      const user = await Users.create({
        name: 'Tim',
        email: 'timmytim@aol.com',
        address: '4 Timothy Lane',
        payment: '1111 2222 3333 4444',
        age: 21
      })
      expect(user.name).to.equal('Tim')
      expect(user.email).to.equal('timmytim@aol.com')
      expect(user.address).to.equal('4 Timothy Lane')
      expect(user.payment).to.equal('1111 2222 3333 4444')
      expect(user.age).to.equal(21)
    })
    it('age must be 21 or over', async () => {
      const userAge = await Users.create({
        name: 'Mary',
        email: 'mary@aol.com',
        address: '111 Water St',
        payment: '1111 2222 3333 4444',
        age: 19
      })
    })
    it('email must be valid', async () => {
      await expect(
        Users.create({
          name: 'John',
          email: 'john',
          address: '222 Green St',
          payment: '1111 2222 3333 4444',
          age: 27
        }),
        'Email should be a valid email'
      ).to.be.rejected
    })
  })
})
