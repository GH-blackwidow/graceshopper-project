const router = require('express').Router()
const {Product} = require('../db/models')
const {verifyAdmin} = require('../utils/gatekeeping')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    console.log('got product detail')

    res.json(product)
  } catch (error) {
    console.log('failed to get product detail')
  }
})

router.post('/', verifyAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', verifyAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
