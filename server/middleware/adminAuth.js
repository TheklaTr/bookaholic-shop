const User = require('../models/user')

const adminAuth = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await User.findOne({ _id: req.user.id })
    if (user.role === 0) return res.status(400).json({ msg: 'Admin resources access denied' })

    next()
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = adminAuth
