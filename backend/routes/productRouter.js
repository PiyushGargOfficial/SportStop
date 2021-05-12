const router = require("express").Router();
const Product = require("../db/models/product");
const { findProduct, addProduct } = require("../middlewares/productMiddleware");
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
          .catch((err) => res.json({ error: "Product Registration Failed" }));
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
  // Product.findOne({ name: req.body.name });
});

// const updateJobStatus = async (data) => {

//   const updatedJob = await Job.update({
//       _id: data.id
//   }, {
//       $set: {
//           status: data.status
//       }
//   })

//   return updatedJob

// }

module.exports = router;
