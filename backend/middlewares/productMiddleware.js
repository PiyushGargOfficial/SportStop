const Product = require("../db/models/product");

const findProduct = async (data) => {
  const productExist = await Product.findOne({ name: data, isDeleted: false });
  return productExist;
};

const addProduct = async (data) => {
  const newProduct = new Product(data);
  const productAdded = await newProduct.save();
  return productAdded;
};

module.exports.findProduct = findProduct;
module.exports.addProduct = addProduct;
