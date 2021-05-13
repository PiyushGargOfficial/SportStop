const express = require("express");
const chalk = require("chalk");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//Database
require("./db/connect");

const app = express();
const PORT = process.env.PORT;

//Body Parser
app.use(express.json());

//Router
const ProductRouter = require("./routes/productRouter");
const IDRouter = require("./routes/idRouter");
const UserRouter = require("./routes/userRouter");

//Controllers
app.use("/api/products", ProductRouter);
app.use("/api/id/", IDRouter);
app.use("/api/users/", UserRouter);

//testing middleware
app.use("/", (req, res, next) => {
  console.log("Hello World");
  next();
});

//Server
app.listen(PORT, () => {
  console.log(chalk.blue.bold(`Server Running at PORT: ${PORT}`));
});
