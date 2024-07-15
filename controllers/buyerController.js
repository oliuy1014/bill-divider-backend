const mongoose = require("mongoose");
const { Buyer } = require("../models/buyerModel");
const { getAndCheckId } = require("../controllers/billController");

// get all buyers
const getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.find({}).sort({ createdAt: -1 });
    res.status(200).json({ buyers: buyers });
  } catch (error) {
    console.log("Error getting buyers: ", error);
    res.status(400).json({ error: error.message });
  }
};

// create a buyer
const createBuyer = async (req, res) => {
  const { name, bills } = req.body;
  try {
    const buyer = await Buyer.create({ name, bills });
    res.status(200).json({ buyer: buyer });
  } catch (error) {
    console.log("Error creating new buyer: ", error);
    res.status(400).json({ error: error.message });
  }
};

// update a buyer
const updateBuyer = async (req, res) => {
  try {
    const id = getAndCheckId(req);
    const updates = req.body;
    // TODO: verify form of updates?

    const buyer = await Buyer.findOneAndupdate(
      { _id: id },
      { $set: { ...updates } },
      { returnNewDocument: true },
    );

    if (!buyer) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ buyer: buyer });
  } catch (error) {
    console.log("Error updating buyer: ", error.message);
    res.status(400).json({ error: error.message });
  }
};

// flow: iterate through items and add users to items
// when sending an update, assign buyers to items' buyers
// arrays and add fractions of item prices to users.
//

module.exports = {
  getBuyers,
  // getBuyer,
  createBuyer,
  updateBuyer,
  // deleteBuyer,
};
