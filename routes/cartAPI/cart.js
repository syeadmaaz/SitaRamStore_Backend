var CustomerCart = require("../../model/mCustomerCart");

exports.saveCart = async (req, res) => {
  const userName = req.query.userName;
  const productDetails = req.query.productDetails;
  console.log(req.query);
  try {
    const cart = new CustomerCart({
      userName,
      productDetails,
    });

    if (
      !(await cart.findAndModify({
        query: { userName },
        update: { $set: { productDetails } },
        upsert: true,
      }))
    )
      //  if (!(await cart.save()))
      return res
        .status(500)
        .json({ success: false, message: "Failed to Save Cart" });

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
