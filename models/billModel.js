const mongoose = require('mongoose');
const { BuyerSchema } = require('./buyerModel');

const Schema = mongoose.Schema;

// schema for individual purchase items
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  buyers: [BuyerSchema],
});

// schema for entire bills
const BillSchema = new Schema({
  store: {
    type: String,
    required: true,
  },
  items: {
    type: [ItemSchema],
    required: true,
  },
  buyers: [BuyerSchema],
},
  { timestamps: true },
);

module.exports = mongoose.model("Bill", BillSchema);
