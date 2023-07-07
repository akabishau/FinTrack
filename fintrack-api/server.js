const express = require('express')
const app = express()

// configuration
require('dotenv').config()
app.use(express.json())
const path = require('path')

// extra packages
const helmet = require('helmet')
app.use(helmet())

const cors = require('cors')
app.use(cors())

// project no longer supported
const xss = require('xss-clean')
app.use(xss())

const rateLimiter = require('express-rate-limit')
app.set('trust proxy', 1) // to deploy on heroku (render.com ?)
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 })) // each IP 100 request per 15 minutes

const authenticateUser = require('./middleware/auth')

//app.get('/', (req, res) => { res.send('fintrack-api') })
app.use(express.static(path.join(__dirname, 'build')))

// routes
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/accounts', authenticateUser, require('./routes/accounts'))
app.use('/api/v1/transactions', authenticateUser, require('./routes/transactions'))
app.use('/api/v1/categories', authenticateUser, require('./routes/categories'))


// middleware
app.use(require('./middleware/not-found'))
app.use(require('./middleware/error-handler'))


// server and db connection
const port = process.env.PORT || 8000
const connectDB = require('./db/connect')
const createDefaultTransactionTypes = require('./init.js')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`)
      createDefaultTransactionTypes()
    })
  } catch (error) {
    console.log(error)
  }
}

start()