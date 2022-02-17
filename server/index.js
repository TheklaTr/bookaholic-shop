const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

app.get('/', (req, res) => {
  return res.json({ message: 'Running...' })
})

server.listen(config.PORT, () => {
  logger.info('Server is running on port', config.PORT)
})
