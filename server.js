// global variables
require('dotenv').config() // secret values from .env file
const mongoose = require('mongoose')
const bill_routes = require('./routes/bills')
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

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

// connect to db
mongoose.connect(MONGO_URI)
  .then(() => {
      app.listen(PORT, () => {
        console.log("connected to mongoDB and listening on port", PORT)
      })

  })
  .catch((error) => {console.log(error)})