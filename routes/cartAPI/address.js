const User = require("../../model/userMaster");
const validateFunction = require("../../utility/validateFunction");

exports.addAddress = async (req, res) => {
  const { userName, addressData } = req.body;
  try {
    if (!userName || !addressData) {
      return res
        .status(422)
        .json({ success: false, message: "Required Data is not provided" });
    }

    var userExist = null;
    var userAddress = null;

    if (validateFunction.validateEmail(userName)) {
      userExist = await User.findOne({ email: userName });
      console.log(userExist);

      if (!userExist)
        return res
          .status(422)
          .json({ success: false, message: "UserName not registered!!" });

      userAddress = userExist.address;
    } else if (validateFunction.validateMobileNo(userName)) {
      userExist = await User.findOne({ mobile: userName });
      console.log(userExist);

      if (!userExist)
        return res
          .status(422)
          .json({ success: false, message: "UserName not registered!!" });

      userAddress = userExist.address;
    } else {
      return res
        .status(422)
        .json({ success: false, message: "Not a Valid UserName!" });
    }

    console.log(userAddress);
    var newUserAddress = [];

    if (userAddress.length == 0) {
      newUserAddress.push(addressData);
    } else {
      if (addressData.default) {
        var index = -1;
        userAddress.map((items, ind) => {
          console.log(items);
          if (items.default) {
            index = ind;
          }
        });
        console.log(index);
        if (index != -1) userAddress[index].default = false;
        newUserAddress = userAddress;
        newUserAddress.push(addressData);
      } else {
        newUserAddress = userAddress;
        newUserAddress.push(addressData);
      }
    }

    User.findOne({ email: userExist.email }, (err, item) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "An error occurred",
          err,
        });
      } else {
        item.address = newUserAddress;
        item.save();
      }
    });


    return res.status(201).json({
      success: true,
      message: "Address Added Successfully!",
      userName,
      address: newUserAddress
    });
  } catch (err) {
    console.log(err);
  }
};
