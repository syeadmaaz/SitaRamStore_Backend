const cloudinary = require("../../utility/cloudinary");
var Product = require("../../model/productMaster");

exports.productUpdate = async (req, res) => {
  const { user } = req;
  console.log(req);

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `image-${Date.now()}`,
      width: 500,
      height: 500,
      crop: "fill",
    });

    console.log(result.url);

    var productObj = new Product({
      categoryID: req.body.categoryID,
      productID: `P-${Date.now()}`,
      productName: req.body.name,
      productDescription: req.body.desc,
      productPrice: req.body.price,
      productImage: result.url,
    });

    if (await productObj.save())
      return res
        .status(201)
        .json({ success: true, message: "New Product Added!" });
    else
      return res
        .status(500)
        .json({ success: false, message: "server error, try after some time" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error, try after some time" });
    console.log("Error while uploading product image", error.message);
  }
};

exports.getProduct = async (req, res) => {
  console.log(req.query)
  Product.find({categoryID: req.query.categoryID}, (err, items) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "An error occurred", err });
    } else {
      res.status(200).json({ success: true, productItems: items });
    }
  });
};