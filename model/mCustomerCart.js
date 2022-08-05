var mongoose = require("mongoose");
mongoose.pluralize(null);

var mCustomerCartSchema = new mongoose.Schema({
  userName: String,
  productDetails: [],
});

module.exports = new mongoose.model("mCustomerCart", mCustomerCartSchema);
