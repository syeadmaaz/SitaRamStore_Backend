var CustomerCart = require("../../model/mCustomerCart");

exports.saveCart = async (req, res) => {
  const userName = req.body.userName;
  const productDetails = req.body.productDetails;
  console.log(req.body);
  // console.log(productDetails);
  try {
    const cart = await CustomerCart.findOneAndUpdate(
      {userName: userName},
      {
      userName,
      productDetails,
      },
      {upsert: true}
    );
    
    return res.status(201).json({
      success: true,
      message: "Cart Saved Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchCart = async(req,res) => {
  console.log(req.query);
  
  try{
    const cartDetails = await CustomerCart.findOne({
      userName: req.query.userName,
  });
    // console.log(cartDetails.productDetails)
    return res.status(201).json({
      success: true,
      cartDetails: cartDetails != null ? cartDetails.productDetails : [],
      message: "Cart Fetched Successfully",
    });
  }catch(err) {
    console.log(err)
  }
}