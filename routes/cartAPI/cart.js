var CustomerCart = require("../../model/mCustomerCart");

exports.saveCart = async (req, res) => {
  const userName = req.query.userName;
  const productDetails = req.query.productDetails;
  console.log(req.query);
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

//  db.cart.findAndModify({
//    query: { userName },
//    update: { $set: { productDetails } },
//    upsert: true,
//  })

// cart.find({userName}).upsert().replaceOne({
//   userName,
//   productDetails
// })

// cart.findAndModify({
//   query: { userName },
//   update: { $set: { productDetails } },
//   upsert: true,
// })
