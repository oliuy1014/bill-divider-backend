const Bill = require('../models/billModel')
const mongoose = require("mongoose")

// check that id is valid
const getAndCheckId = (req) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({error: "invalid bill id"})
  }
  return id
}

// get all bills
const getBills = async(req, res) => {
  console.log("getting all bills!")
  const bills = await Bill.find({}).sort({createdAt: -1})
  for (let i = 0; i < bills.length; i++) {
    console.log(`bill ${i}: ${bills[i]}`)
  }
  res.status(200).json({bills})
}

// get single bill
const getBill = async(req, res) => {
  const id = getAndCheckId(req)
  const bill = await Bill.findById(id)
  res.status(200).json({bill: bill})
}

// post a new bill 
const createBill = async(req, res) => {
  const {store, items, buyers} = req.body
  try {
    const bill = await Bill.create({store, items, buyers})
    res.status(200).json(bill)
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.mssg})
  }
}

// delete a bill 
const deleteBill = async (req, res) => {
  const id = getAndCheckId(req)
  const deletedBill = await Bill.findOneAndDelete( {"_id": id});
  if (!deletedBill) {
    return res.status(400).json({error: "Cannot delete bill: id not found"})
  }
  res.status(200).json({bill: deletedBill})
}

// update a bill
const updateBill = async (req, res) => {
  const id = getAndCheckId(req)
  const bill = await Bill.updateOne({"_id": id}, { ...req.body })

  if (!bill) {
    return res.status(400).json({error: "Cannot update bill: id not found"})
  }
  res.status(200).json({newBill: bill})
}

module.exports = {
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill
}