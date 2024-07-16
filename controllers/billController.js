const Bill = require("../models/billModel");
const mongoose = require("mongoose");

// check that id is valid
const getAndCheckId = (req) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Invalid bill ID");
  } else {
    return id;
  }
};

// get all bills
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).sort({ createdAt: -1 });
    res.status(200).json({ bills });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single bill
const getBill = async (req, res) => {
  try {
    const id = getAndCheckId(req);
    const bill = await Bill.findById(id);
    if (!bill) {
      return res
        .status(400)
        .json({ error: "Could not find bill: ID not found" });
    }
    res.status(200).json({ bill: bill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// post a new bill
const createBill = async (req, res) => {
  const { store, items, buyers } = req.body;
  try {
    const bill = await Bill.create({ store, items, buyers });
    res.status(200).json(bill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a bill
const deleteBill = async (req, res) => {
  const id = getAndCheckId(req);
  const deletedBill = await Bill.findOneAndDelete({ _id: id });
  if (!deletedBill) {
    return res
      .status(400)
      .json({ error: "Could not delete bill: ID not found" });
  }
  res.status(200).json({ deletedBill: deletedBill });
};

// update a bill
const updateBill = async (req, res) => {
  try {
    const id = getAndCheckId(req);
    const updates = req.body;

    const bill = await Bill.findOneAndUpdate(
      { _id: id }, // filter by id
      { $set: { updates } },
      { new: true }, // return copy of updated bill
    );
    if (!bill) {
      return res
        .status(400)
        .json({ error: "Could not update bill: Id not found" });
    }
    res.status(200).json({ newBill: bill });
  } catch (error) {
    console.log("Error updating bill: ", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill,
  getAndCheckId,
};
