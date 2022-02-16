const router = require('express').Router()
const paymentController = require('../controllers/payments')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

router
  .route('/payment')
  .get(auth, adminAuth, paymentController.getPayments)
  .post(auth, paymentController.createPayment)

module.exports = router
