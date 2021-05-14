const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userID: {
    type: Number,
    min: 10000,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 256,
  },
  cpassword: {
    type: String,
    required: true,
    min: 5,
    max: 256,
  },
  firstName: {
    type: String,
    required: true,
    default: "First Name",
    minLength: 1,
    maxLength: 256,
  },
  lastName: {
    type: String,
    required: true,
    default: "Last Name",
    minLength: 1,
    maxLength: 256,
  },
  date: {
    type: Date,
    required: true,
    default: Date,
  },
  mobileNumber: {
    type: Number,
    required: true,
    default: 0000000000,
    min: 10,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isAddress: {
    type: Boolean,
    default: false,
    required: true,
  },
  address: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
    },
  ],
});

const AddressSchema = new mongoose.Schema({
  alias: {
    type: String,
    default: "home",
  },
  postcode: {
    type: Number,
  },
  city: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  address: {
    type: String,
  },
  street: {
    type: String,
  },
  landmark: {
    type: String,
  },
});

const Address = mongoose.model("Addresses", AddressSchema);
const User = mongoose.model("Users", UserSchema);

module.exports.User = User;
module.exports.Address = Address;
