require("./db/connection");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT;


const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
  });