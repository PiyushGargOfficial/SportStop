const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  prodID: {
    type: Number,
    min: 10000,
    required: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 256,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    required: true,
    default: Date,
  },
  mrp: {
    type: Number,
    required: true,
    min: 1,
  },
  rating: {
    type: Number,
    min: 0.5,
    max: 5,
  },
  totalreviews: {
    type: Number,
    min: 0,
  },
  warranty: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
