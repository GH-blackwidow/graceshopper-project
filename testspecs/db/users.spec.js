const {expect} = require('chai')
const db = require('../../server/db')
const Users = db.model('users')

describe('Users Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})

describe('validations', () => {
  it('must include name, email, address, and payment', async () => {
    await expect(
      Users.create({
        name: null,
        email: null,
        address: null,
        payment: '1111 2222 3333 4444',
        age: 21
      }),
      'Name, email, address and payment must be provided'
    ).to.be.rejected
  })
  it('age must be 21 or over', async () => {
    await expect(
      Users.create({
        name: 'Mary',
        email: 'mary@aol.com',
        address: '111 Water St',
        payment: '1111 2222 3333 4444',
        age: 19
      }),
      'Age cannot be under 21'
    ).to.be.rejected
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
