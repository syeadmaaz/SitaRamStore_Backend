var mongoose = require("mongoose");
mongoose.pluralize(null);

var mCustomerOrderSchema = new mongoose.Schema({
  userName: String,
  productDetails: [],
  items: Number,
  delivery: Number,
  orderTotal: Number,
  address: String,
});

module.exports = new mongoose.model("mCustomerOrder", mCustomerOrderSchema);
