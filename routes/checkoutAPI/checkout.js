const User = require("../../model/userMaster");
var CustomerOrder = require("../../model/mCustomerOrder");
const validateFunction = require("../../utility/validateFunction");

exports.checkout = async (req, res) => {
  const { userName, productDetails, items, delivery, orderTotal, address } =
    req.body;
  try {
    var mobile;
    if (validateFunction.validateEmail(userName)) {
      userExist = await User.findOne({ userName });
      console.log(userExist);

      if (!userExist)
        return res
          .status(422)
          .json({ sucess: false, message: "UserName Not Found" });

      mobile= userExist.mobile;
    }else if (validateFunction.validateMobileNo(userName)) {
        userExist = await User.findOne({ userName });
        console.log(userExist);

        if (!userExist)
          return res
            .status(422)
            .json({ sucess: false, message: "UserName Not Found" });

        mobile=userName;
    }else {
        return res
          .status(422)
          .json({ sucess: false, message: "UserName should be mobile or email" });
    }

    const order = await CustomerOrder.findOneAndUpdate(
      { userName: mobile },
      {
        userName: mobile,
        productDetails,
        productDetails,
        items,
        delivery,
        orderTotal,
        address,
      },
      { upsert: true }
    );

    if(!order) return res
      .status(422)
      .json({ sucess: false, message: "Server Error" });

    console.log(order)

    res.status(201).send({
      success: true,
      message: "Congratulations!!We have received your Order",
      userName,
      productDetails,
      items,
      delivery,
      orderTotal,
      address,
    });
  } catch (err) {
    console.log(err);
  }
};
