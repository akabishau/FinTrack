const express = require('express')
const app = express()

// configuration
require('dotenv').config()
app.use(express.json())

app.get('/', (req, res) => { res.send('fintrack-api') })

// routes
app.use('/api/v1/auth', require('./routes/auth'))
// transactions
// categories
// accounts


// middleware
  // error handler
  // not found



// server and db connection
const port = process.env.PORT || 3000
const connectDB = require('./db/connect')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
};

start()