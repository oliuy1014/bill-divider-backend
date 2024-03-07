// global variables
require('dotenv').config() // secret values from .env file
const bill_routes = require('./routes/bills')
const PORT = process.env.PORT

// initialize express app
const express = require('express')
const app = express()

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.get('/', (req, res) => {
  res.json({mssg: "response sending to homepage"})
})

app.use('/api/bills', bill_routes)

// listen for requests
app.listen(PORT, () => {
  console.log("listening on port", PORT)
})