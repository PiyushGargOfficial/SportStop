const { body, validationResult } = require("express-validator");

const productValidation = () => {
  return [
    //name validation
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .bail()
      .isString()
      .withMessage("Name must be a string value")
      .bail()
      .isLength({ min: 5, max: 256 })
      .withMessage("Name must contain a total length between 5 and 256")
      .custom((name) => {
        let result = name.match(/^([a-zA-Z0-9 _-]+)$/);
        if (result === null) {
          throw new Error(
            "Name must not contain special characters except _ or -"
          );
        } else {
          return true;
        }
      }),
    //price validation
    body("price")
      .notEmpty()
      .withMessage("Price cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Price must be a number")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Price cannot have a value less than 0"),
    //mrp validation
    body("mrp")
      .notEmpty()
      .withMessage("MRP cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("MRP must be a number")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("MRP cannot have a value less than 0"),
    //warranty validation
    body("warranty")
      .notEmpty()
      .withMessage("Warranty cannot be empty")
      .bail()
      .isString()
      .withMessage("Warranty must be a string value")
      .bail()
      .isLength({ min: 1, max: 256 })
      .withMessage("Warranty must contain a total length between 1 and 256"),
    //rating validation
    body("rating")
      .if(body("rating").exists())
      .notEmpty()
      .withMessage("Rating cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Rating must be a number")
      .bail()
      .isFloat({ min: 0.5, max: 5 })
      .withMessage("Rating must contain a value between 0 and 5"),
    //totalreviews validation
    body("totalreviews")
      .if(body("totalreviews").exists())
      .notEmpty()
      .withMessage("Total Reviews cannot be empty")
      .bail()
      .isNumeric()
      .withMessage("Total Reviews must be a number")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Total Reviews cannot have a value less than 0"),
  ];
};

//regex:
// "^[A-Za-z0-9_-]*$"

// check('email').custom(email => {
//     if (alreadyHaveEmail(email)) {
//       throw new Error('Email already registered')
//     }
//   })

// req.check('name')
//    .isLength({min:3}).withMessage('Name must be of 3 characters long.')
//    .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.')

const validate = (req, res, next) => {
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
  productValidation,
  validate,
};
