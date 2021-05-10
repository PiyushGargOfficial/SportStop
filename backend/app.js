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

//Middleware
app.use("/", (req, res) => {
  res.send("Hello World");
});

//Server
app.listen(PORT, () => {
  console.log(chalk.blue.bold(`Server Running at PORT: ${PORT}`));
});
