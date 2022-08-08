var CustomerCart = require("../../model/mCustomerCart");
const User = require("../../model/userMaster");
const validateFunction = require("../../utility/validateFunction");

exports.saveCart = async (req, res) => {
  const userName = req.body.userName;
  const productDetails = req.body.productDetails;
  console.log(req.body);

  // console.log(productDetails);
  try {
    if (validateFunction.validateEmail(userName)) {
      email = userName;

      userExist = await User.findOne({ email });
      console.log(userExist);

      //if user is not registered
      if (!userExist)
        return res.status(422).json({
          success: false,
          message: "User not registered!!",
        });

      const mobile = userExist.mobile;

      const cart = await CustomerCart.findOneAndUpdate(
        { userName: mobile },
        {
          userName: mobile,
          productDetails,
        },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        userExist: userExist,
        message: "Cart Saved Successfully",
      });
    } else if (validateFunction.validateMobileNo(userName)) {
      mobile = userName;

      userExist = await User.findOne({ mobile });
      console.log(userExist);

      //if user is not registered
      if (!userExist)
        return res.status(422).json({
          success: false,
          message: "User not registered!!",
        });

      const cart = await CustomerCart.findOneAndUpdate(
        { userName: mobile },
        {
          userName: mobile,
          productDetails,
        },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        userExist: userExist,
        message: "Cart Saved Successfully",
      });
    } else
      return res.status(422).json({
        success: false,
        message: "Please enter mobile or email",
      });
  } catch (err) {
    console.log(err);
  }
};

exports.fetchCart = async (req, res) => {
  console.log(req.query);
  const userName = req.query.userName;
  var mobile;

  try {
    if (validateFunction.validateEmail(userName)) {
      email = userName;

      userExist = await User.findOne({ email });
      console.log(userExist);

      //if user is not registered
      if (!userExist)
        return res.status(422).json({
          success: false,
          message: "User not registered!!",
        });

      mobile = userExist.mobile;
    } else if (validateFunction.validateMobileNo(userName)) {
      mobile = userName;

      userExist = await User.findOne({ mobile });
      console.log(userExist);

      //if user is not registered
      if (!userExist)
        return res.status(422).json({
          success: false,
          message: "User not registered!!",
        });
    } else {
      return res.status(422).json({
        success: false,
        message: "Please enter mobile or email",
      });
    }
    const cartDetails = await CustomerCart.findOne({
      userName: mobile,
    });
    // console.log(cartDetails.productDetails)
    return res.status(201).json({
      success: true,
      cartDetails: cartDetails != null ? cartDetails.productDetails : [],
      message: "Cart Fetched Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.clearCart = async (req, res) => {
  const userName = req.query.userName;
  var mobile;

  try {
    if (validateFunction.validateEmail(userName)) {
      email = userName;

      userExist = await User.findOne({ email });
      console.log(userExist);

      //if user is not registered
      if (!userExist)
        return res.status(422).json({
          success: false,
          message: "User not registered!!",
        });

      mobile = userExist.mobile;
    } else if (validateFunction.validateMobileNo(userName)) {
      mobile = userName;

      userExist = await User.findOne({ mobile });
      console.log(userExist);

      //if user is not registered
      if (!userExist)
        return res.status(422).json({
          success: false,
          message: "User not registered!!",
        });
    } else
      return res.status(422).json({
        success: false,
        message: "Please enter mobile or email",
      });

    const cart = await CustomerCart.findOneAndUpdate(
      { userName: mobile },
      {
        userName: mobile,
        productDetails: [],
      },
      { upsert: true }
    );

    return res.status(201).json({
      success: true,
      userExist: userExist,
      message: "Cart Cleared",
    });
  } catch (err) {
    console.log(err);
  }
};
