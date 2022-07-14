const express = require("express");
const router = express.Router();

const register = require('./routes/registerAPI/register')
const login = require('./routes/loginAPI/login')
const {categoryUpdate,getCategory} = require('./routes/admin/category')
const {productUpdate, getProduct} = require('./routes/admin/product')


var fs = require("fs");
var path = require("path");

var multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

var upload = multer({ storage: storage });



router.get("/", (req, res) => {
  res.send("Hello World from the server router.js");
});

router.post("/register", register.register);
router.post("/login", login.login);



router.post("/adminCategoryUpdate", upload.single("image"), categoryUpdate);
router.post("/adminProductUpdate", upload.single("image"), productUpdate);

router.get("/getCategory", getCategory);
router.get("/getProduct",getProduct)

module.exports = router;
