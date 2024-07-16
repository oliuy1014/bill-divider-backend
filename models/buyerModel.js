const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// schema for total owed on a bill
const TotalSchema = new Schema({
  bill_id: {
    type: String,
    required: true,
  },
  total: Number,
});

// schema for buyers
const BuyerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bills: {
    type: [TotalSchema],
  },
});

// Create the Buyer model
const Buyer = mongoose.model("Buyer", BuyerSchema);

// Export the Buyer model directly
module.exports = Buyer;
