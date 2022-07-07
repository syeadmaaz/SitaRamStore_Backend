const cloudinary = require("../../utility/cloudinary");

exports.imageUpload = async(req,res) => {
    const { user } = req;

    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `test_image`,
        width: 500,
        height: 500,
        crop: "fill",
      });

      console.log(result.url);

      // const updatedUser = await User.findByIdAndUpdate(
      //   user._id,
      //   { avatar: result.url },
      //   { new: true }
      // );
      res
        .status(201)
        .json({ success: true, message: "New Category Added!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "server error, try after some time" });
      console.log("Error while uploading profile image", error.message);
    }

}
