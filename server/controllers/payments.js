const Payment = require('../models/payment')
const User = require('../models/user')
const Product = require('../models/product')

const paymentController = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payment.find()
      res.json(payments)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('name email')
      if (!user) return res.status(400).json({ msg: 'User does not exist.' })

      const { cart, paymentID, address } = req.body

      const { _id, name, email } = user

      const newPayment = new Payment({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      })

      cart.filter((item) => sold(item._id, item.quantity, item.sold))

      await newPayment.save()
      res.json({ msg: 'Payment Success!' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
}

const sold = async (id, quantity, oldSold) => {
  await Product.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold })
}

module.exports = paymentController
