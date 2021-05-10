const mongoose = require("mongoose");
const DB = require("../config/keys");
const chalk = require("chalk");

mongoose
  .connect(DB.MongoDB_Atlas, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(chalk.blue.bold(`Database Connected`));
  })
  .catch((err) => {
    console.log(chalk.red.bold("Database Not Connected"));
  });
