const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
    console.log("Connection Successful");
  }).catch(() => {
    console.log("Connection Unsuccessful");
  });