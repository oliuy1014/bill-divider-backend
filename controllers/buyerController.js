const Buyer = require("../models/buyerModel");

const { getAndCheckId } = require("../controllers/billController");

// get all buyers
const getBuyers = async (req, res) => {
  try {
    console.log(Buyer);
    const buyers = await Buyer.find({}).sort({ createdAt: -1 });
    res.status(200).json({ buyers: buyers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get buyer by id
const getBuyer = async (req, res) => {
  try {
    const id = getAndCheckId(req);
    const buyer = await Buyer.findById(id);
    if (!buyer) {
      return res
        .status(400)
        .json({ error: "Could not find buyer: ID not found" });
    }
    res.status(200).json({ buyer: buyer });
  } catch (error) {
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
    res.status(400).json({ error: error.message });
  }
};

// update a buyer
const updateBuyer = async (req, res) => {
  try {
    const id = getAndCheckId(req);
    const updates = req.body;

    const buyer = await Buyer.findOneAndUpdate(
      { _id: id }, // filter by id
      { $set: { ...updates } },
      { new: true }, // return copy of updated buyer
    );

    if (!buyer) {
      return res
        .status(400)
        .json({ error: "Could not update buyer: Id not found" });
    }

    res.status(200).json({ buyer: buyer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a buyer
const deleteBuyer = async (req, res) => {
  try {
    const id = getAndCheckId(req);
    const deletedBuyer = await Buyer.findOneAndDelete({ _id: id });

    if (!deletedBuyer) {
      return res
        .status(400)
        .json({ error: "Coud not delete buyer: ID not found" });
    }

    res.status(200).json({ deletedBuyer: deletedBuyer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getBuyers,
  getBuyer,
  createBuyer,
  updateBuyer,
  deleteBuyer,
};
