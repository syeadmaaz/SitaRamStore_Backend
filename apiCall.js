const express = require("express");
const router = express.Router();

const register = require('./routes/registerAPI/register')
const login = require('./routes/loginAPI/login')
const {categoryUpdate,getCategory} = require('./routes/admin/category')
const {productUpdate} = require('./routes/admin/product')


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



// router.get("/", (req, res) => {
//   res.send("Hello World from the server router.js");
// });

router.get("/getCategory", getCategory);

router.post("/adminCategoryUpdate", upload.single("image"), categoryUpdate);

router.post("/adminProductUpdate", upload.single("image"), productUpdate);


  // console.log(image)
  
  // console.log(req)
  // console.log(req.body.name)

  // var obj = {
  //   name: req.body.name,
  //   desc: req.body.desc,
  //   img: {
  //     data: fs.readFileSync(
  //       path.join(__dirname + "/uploads/" + req.file.filename)
  //     ),
  //     contentType: "image/png",
  //   },
  // };
  // imgModel.create(obj, (err, item) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({ error: "Server Error, Try after some time" });
  //   } else {
  //     item.save();
  //     // res.redirect("/");
  //     res.status(201).json({ message: "Image Uploaded Successfully" });
  //   }
  // });


router.post("/register", register.register);
router.post("/login", login.login);

module.exports = router;
