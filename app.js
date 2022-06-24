const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config({ path: "./config.env" });
require("./db/connection");
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(require("./apiCall"));

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
