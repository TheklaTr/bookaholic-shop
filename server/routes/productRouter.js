const router = require('express').Router()
const productController = require('../controllers/products')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router
  .route('/products')
  .get(productController.getProducts)
  .post(auth, adminAuth, productController.createProduct)

router
  .route('/products/:id')
  .delete(auth, adminAuth, productController.deleteProduct)
  .put(auth, adminAuth, productController.updateProduct)

module.exports = router
