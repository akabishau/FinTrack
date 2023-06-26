const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.send('fintrack-api')
})


const port = 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})