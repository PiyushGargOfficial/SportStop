const Product = require("../db/models/product");
const { genNewProdID, updateProdID } = require("./idMiddleware");

const findProduct = async (data) => {
  const productExist = await Product.findOne({ name: data, isDeleted: false });
  return productExist;
};

const addProduct = async (data) => {
  const newId = await genNewProdID();

  // New Product : Some error coming where we are not able to add more than one product
  const newData = {
    name: data.name,
    price: data.price,
    mrp: data.mrp,
    warranty: data.warranty,
    rating: data.rating,
    totalreviews: data.totalreviews,
    prodID: newId,
  };

  const newProduct = new Product(newData);
  const productAdded = await newProduct.save();
  const updatedID = await updateProdID(newId);

  return productAdded;
};

const deleteProduct = async (data) => {
  const deletedProduct = await Product.findOneAndUpdate(
    {
      name: data,
      isDeleted: false,
    },
    {
      isDeleted: true,
    }
  );

  return deletedProduct;
};

module.exports.findProduct = findProduct;
module.exports.addProduct = addProduct;
module.exports.deleteProduct = deleteProduct;
