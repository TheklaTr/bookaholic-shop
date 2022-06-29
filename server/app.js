const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose')
const csrf = require('csurf')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 5 * 24 * 60 * 60 * 1000,
  },
})

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static('build'))
app.use(fileUpload({ useTempFiles: true }))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/imageRouter'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/paymentRouter'))

app.use(csrfProtection) // csrf
app.use(errorHandler)

mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.get('/api/csrf_token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

app.get('/', (req, res) => {
  return res.json({ message: 'Running...' })
})

module.exports = app
