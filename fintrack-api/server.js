const express = require('express')
const app = express()

// configuration
require('dotenv').config()
app.use(express.json())

const authenticateUser = require('./middleware/auth')

app.get('/', (req, res) => { res.send('fintrack-api') })

// routes
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/accounts', authenticateUser, require('./routes/accounts'))
app.use('/api/v1/transactions', authenticateUser, require('./routes/transactions'))
app.use('/api/v1/categories', authenticateUser, require('./routes/categories'))


// middleware
  // error handler
app.use(require('./middleware/not-found'))



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