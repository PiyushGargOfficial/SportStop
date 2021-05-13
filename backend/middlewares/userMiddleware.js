const { User } = require("../db/models/user");
const { genNewUserID, updateUserID } = require("./userIdMiddleware");

const findUser = async (data) => {
  const userExist = await User.findOne({ email: data, isDeleted: false });
  return userExist;
};

const addUser = async (data) => {
  const newId = await genNewUserID();

  // New Product : Some error coming where we are not able to add more than one product
  const newUserData = {
    firstName: data.firstName,
    lastName: data.lastName,
    mobileNumber: data.mobileNumber,
    warranty: data.warranty,
    gender: data.gender,
    email: data.email,
    userID: newId,
  };

  const newUser = new User(newUserData);
  const userAdded = await newUser.save();
  const updatedID = await updateUserID(newId);

  return userAdded;
};

const deleteUser = async (data) => {
  const deletedUser = await User.findOneAndUpdate(
    {
      name: data,
      isDeleted: false,
    },
    {
      isDeleted: true,
    }
  );

  return deletedUser;
};

module.exports.findUser = findUser;
module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
