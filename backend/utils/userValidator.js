const { body, validationResult } = require("express-validator");

const userValidation = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .bail()
      .isEmail()
      .withMessage("Enter a valid Email"),
    body("firstName")
      .notEmpty()
      .withMessage("Firstname cannot be empty")
      .bail()
      .isAlpha()
      .withMessage("Enter a valid Firstname")
      .bail()
      .isLength({ min: 1, max: 256 })
      .withMessage("The Firstname should be between 1 and 256 alphabets"),
    body("lastName")
      .notEmpty()
      .withMessage("Lastname cannot be empty")
      .bail()
      .isAlpha()
      .withMessage("Enter a valid Lastname")
      .bail()
      .isLength({ min: 1, max: 256 })
      .withMessage("The Lastname should be between 1 and 256 alphabets"),
    body("mobileNumber")
      .notEmpty()
      .withMessage("Mobile Number cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Not a valid Mobile Number")
      .bail()
      .isInt()
      .withMessage("Not a valid Mobile Number 3")
      .bail()
      .isFloat({ min: 0000000000, max: 9999999999 })
      .withMessage("Not a valid Mobile Number 2"),
    body("gender")
      .if(body("gender").exists())
      .notEmpty()
      .withMessage("Gender cannot be empty")
      .bail()
      .isIn(["male", "female"])
      .withMessage("Invalid gender value"),
  ];
};

const userValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractErrors = [];
  errors.array().map((err) => extractErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractErrors,
  });
};

module.exports = {
  userValidation,
  userValidate,
};
