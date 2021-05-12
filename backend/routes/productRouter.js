const router = require("express").Router();
const Product = require("../db/models/product");
const {
  findProduct,
  addProduct,
  deleteProduct,
} = require("../middlewares/productMiddleware");
const {
  productValidation,
  validate,
} = require("../middlewares/productValidator");

router.post("/addProduct", productValidation(), validate, (req, res) => {
  findProduct(req.body.name)
    .then((productExist) => {
      if (productExist) {
        res.status(422).json({ error: "Product Already Exist" });
      } else {
        addProduct(req.body)
          .then((product) =>
            res.status(201).json({ message: "Product Successfully Added" })
          )
          .catch((err) =>
            res.status(400).json({ error: "Product Registration Failed", err })
          );
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: "There is some server issue. Please come back later." });
    });
});

router.delete("/deleteProduct", (req, res) => {
  findProduct(req.body.name)
    .then((productExist) => {
      if (productExist) {
        deleteProduct(productExist.name)
          .then((deletedProduct) => {
            res.status(200).json({ message: `${deletedProduct.name} Deleted` });
          })
          .catch((err) => {
            res.status(400).json({ error: `${productExist.name} Not Deleted` });
          });
      } else {
        res.status(400).json({ error: `${req.body.name} Not Found` });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "There is some server issue. Please come back later." });
    });
});

module.exports = router;
