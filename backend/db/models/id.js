const mongoose = require("mongoose");

const IDSchema = new mongoose.Schema({
  productID: {
    type: Number,
    min: 10000,
  },
  userID: {
    type: Number,
    min: 10000,
  },
});

const ID = mongoose.model("ID", IDSchema);

module.exports = ID;
