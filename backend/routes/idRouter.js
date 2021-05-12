const router = require("express").Router();
const { setID } = require("../middlewares/idMiddleware");

router.post("/setID", (req, res) => {
  setID(req.body)
    .then((IdAdded) => {
      if (IdAdded) {
        res.status(201).json({ message: "ID Set" });
      } else {
        res.status(400).json({ error: "ID Not Set" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "There is some server issue. Please come back later." });
    });
});

module.exports = router;
