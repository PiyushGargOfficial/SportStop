const ID = require("../db/models/id");

const setID = async (data) => {
  const setID = new ID(data);
  const IDAdded = await setID.save();
  return IDAdded;
};

const currentProdID = async () => {
  const currID = await ID.findOne({
    _id: process.env.Product_Reference,
  });
  return currID.productID;
};

const updateProdID = async (newID) => {
  await ID.findOneAndUpdate(
    {
      _id: process.env.Product_Reference,
    },
    {
      productID: newID,
    }
  );

  const updatedID = await currentProdID();
  return updatedID;
};

const genNewProdID = async () => {
  const currID = await currentProdID();
  const newID = currID + 1;
  return newID;
};

module.exports.setID = setID;
module.exports.updateProdID = updateProdID;
module.exports.currentProdID = currentProdID;
module.exports.genNewProdID = genNewProdID;
