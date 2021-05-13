const router = require("express").Router();
const {
  findUser,
  addUser,
  deleteUser,
} = require("../middlewares/userMiddleware");
const { userValidation, userValidate } = require("../utils/userValidator");

router.post("/addUser", userValidation(), userValidate, (req, res) => {
  findUser(req.body.email)
    .then((UserExist) => {
      if (UserExist) {
        res.status(422).json({ error: "User Already Exist" });
      } else {
        addUser(req.body)
          .then((User) =>
            res.status(201).json({ message: "User Successfully Added" })
          )
          .catch((err) =>
            res.status(400).json({ error: "User Registration Failed", err })
          );
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "There is some server issue. Please come back later.",
      });
    });
});

router.delete("/deleteUser", (req, res) => {
  findUser(req.body.firstName)
    .then((UserExist) => {
      if (UserExist) {
        deleteUser(UserExist.firstName)
          .then((deletedUser) => {
            res.status(200).json({
              message: `${
                deletedUser.firstName + deletedUser.lastName
              } Deleted`,
            });
          })
          .catch((err) => {
            res.status(400).json({
              error: `${UserExist.firstName + UserExist.lastName} Not Deleted`,
            });
          });
      } else {
        res.status(400).json({ error: `${req.body.firstName} Not Found` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "There is some server issue. Please come back later." });
    });
});

module.exports = router;
