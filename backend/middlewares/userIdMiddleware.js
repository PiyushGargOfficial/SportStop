const ID = require("../db/models/id");

const setID = async (data) => {
  const setID = new ID(data);
  const IDAdded = await setID.save();
  return IDAdded;
};

const currentUserID = async () => {
  const currID = await ID.findOne({
    _id: process.env.User_Reference,
  });
  return currID.userID;
};

const updateUserID = async (newID) => {
  await ID.findOneAndUpdate(
    {
      _id: process.env.User_Reference,
    },
    {
      userID: newID,
    }
  );

  const updatedID = await currentUserID();
  return updatedID;
};

const genNewUserID = async () => {
  const currID = await currentUserID();
  const newID = currID + 1;
  return newID;
};

module.exports.setID = setID;
module.exports.updateUserID = updateUserID;
module.exports.currentUserID = currentUserID;
module.exports.genNewUserID = genNewUserID;
