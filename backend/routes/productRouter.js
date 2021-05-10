const router = require("express").Router();
const Product = require("../db/models/product");

router.post("/addProduct", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});

module.exports = router;
