const User = require('../models/user')
const bcrypt = require('bcrypt')
const Payment = require('../models/payment')
const jwt = require('jsonwebtoken')

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ msg: 'The email address is already registered' })
      }

      if (password.length < 6) {
        return res.status(400).json({ msg: 'Password is at least 6 characters long' })
      }

      // Password Encryption
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
      const newUser = new User({ name, email, password: passwordHash })

      // Save mongoDB
      await newUser.save()

      // Then create jsonwebtoken to authentication
      const accessToken = createAccessToken({ id: newUser.id })
      const refreshToken = createRefreshToken({ id: newUser.id })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: true, // only works on https,
        sameSite: 'strict',
        maxAge: 5 * 24 * 60 * 60 * 1000, // 7d
      })

      // res.json(savedUser)
      res.json({ accessToken })
      // res.json({ msg: 'Register Success' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ msg: 'User does not exist!' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'Incorrect password!' })

      // If login success, create access token and refresh token
      const accessToken = createAccessToken({ id: user.id })
      const refreshToken = createRefreshToken({ id: user.id })

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: true, // only works on https
        sameSite: 'strict',
        maxAge: 5 * 24 * 60 * 60 * 1000, // 7d
      })

      res.json({ accessToken })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/user/refresh_token' })
      return res.json({ msg: 'Logged out' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getRefreshToken: (req, res) => {
    try {
      const rfToken = req.cookies.refreshToken
      if (!rfToken) {
        return res.status(400).json({ msg: 'Please Login or Register' })
      }

      jwt.verify(rfToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
          return res.status(400).json({ msg: 'Please Login or Register' })
        }
        const accessToken = createAccessToken({ id: user.id })

        res.json({ accessToken })
      })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(400).json({ msg: 'User does not exist' })
      res.json(user)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  addCart: async (req, res) => {
    try {
      const user = await User.findById(req.user.id)
      if (!user) return res.status(400).json({ msg: 'User does not exist.' })

      await User.findOneAndUpdate({ _id: req.user.id }, { cart: req.body.cart })

      return res.json({ msg: 'Added to cart' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
  history: async (req, res) => {
    try {
      const history = await Payment.find({ user_id: req.user.id })

      res.json(history)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },
}
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5d' })
}

module.exports = userController
