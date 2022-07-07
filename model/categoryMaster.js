var mongoose = require("mongoose");
mongoose.pluralize(null);

var categoryMasterSchema = new mongoose.Schema({
  categoryID: String,
  categoryName: String,
  categoryDescription: String,
  categoryImage: String,
});

module.exports = new mongoose.model("categoryMaster", categoryMasterSchema);
