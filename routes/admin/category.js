const cloudinary = require("../../utility/cloudinary");
var Category = require("../../model/categoryMaster");

exports.categoryUpdate = async(req,res) => {
    const { user } = req;
    console.log(req)

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `image-${Date.now()}`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      console.log(result.url);

      var categoryObj = new Category({
        categoryID:`C-${Date.now()}`,
        categoryName: req.body.name,
        categoryDescription: req.body.desc?req.body.desc:null,
        categoryImage: result.url
      });

      if (await categoryObj.save()) 
      return res
        .status(201)
        .json({ success: true, message: "New Category Added!" });
      else return res
        .status(500)
        .json({ success: false, message: "server error, try after some time" });

    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "server error, try after some time" });
      console.log("Error while uploading category image", error.message);
    }

}

exports.getCategory = async(req,res) => {
  Category.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).json({success:false,message: "An error occurred", err});
    } else {
       res.status(200).json({ success: true, categoryItems:items });
    }
  });
}
