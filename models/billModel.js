const mongoose = require('mongoose')

const Schema = mongoose.Schema

// schema for persons/buyers 
const PersonSchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  total: Number
})

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
  buyers: [PersonSchema]
})

// schema for entire bills
const BillSchema = new Schema ({
  store: {
    type: String,
    required: true,
  },
  items: {
    type: [ItemSchema],
    required: true,
  },
  buyers: [PersonSchema]
}, {timestamps: true})

module.exports = mongoose.model("Bill", BillSchema)