const router = require('express').Router()
const categoryController = require('../controllers/categories')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router
  .route('/category')
  .get(categoryController.getCategories)
  .post(auth, adminAuth, categoryController.createCategory)

router
  .route('/category/:id')
  .delete(auth, adminAuth, categoryController.deleteCategory)
  .put(auth, adminAuth, categoryController.updateCategory)

module.exports = router
