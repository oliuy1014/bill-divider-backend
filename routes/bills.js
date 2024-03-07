const express = require('express')

const router = express.Router()

// Get all bills
router.get('/', (req, res) => {
  res.json({mssg: 'get all bills'})
})

// Get specific bill with id
router.get('/:id', (req, res) => {
  res.json({mssg: 'get specific bill'})
})

// Upload bill
router.post('/', (req, res) => {
  res.json({mssg: 'post new bill'})
})

// Delete bill
router.delete('/:id', (req, res) => {
  res.json({mssg: 'delete specific bill'})
})

// Update bill
router.patch('/:id', (req, res) => {
  res.json({mssg: 'update specific bill'})
})

module.exports = router