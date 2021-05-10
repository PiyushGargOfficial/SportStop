const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 5,
    maxLength: 256,
    unique: true,
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
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
