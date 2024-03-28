const express = require('express')
const router = express.Router()
const Bill = require('../models/billModel')
const { getBills, getBill, createBill, updateBill, deleteBill} = require('../controllers/billController')

// Get all bills
router.get('/', getBills)
// Get specific bill with id
router.get('/:id', getBill)

// Upload bill
router.post('/', createBill)

// Delete bill
router.delete('/:id', deleteBill)

// Update bill
router.patch('/:id', updateBill) 

module.exports = router