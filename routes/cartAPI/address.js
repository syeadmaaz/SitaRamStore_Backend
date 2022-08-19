const User = require("../../model/userMaster");
const validateFunction = require("../../utility/validateFunction");

exports.addAddress = async(req,res) => {
    const { userName, addressData } = req.body;
    try {
        if (!userName || !addressData) {
          return res.status(422).json({ success:false, message: "Required Data is not provided" });
        }

        var userExist = null

        if (validateFunction.validateEmail(userName)) {
            userExist = await User.findOne({ email:userName });
            console.log(userExist);

            if (!userExist)
              return res
                .status(422)
                .json({ success: false, message: "UserName not registered!!" });
        }
        else if (validateFunction.validateMobileNo(userName)) {
            userExist = await User.findOne({ mobile: userName });
            console.log(userExist);

            if (!userExist)
              return res
                .status(422)
                .json({ success: false, message: "UserName not registered!!" });
        } else {
            return res
              .status(422)
              .json({ success: false, message: "Not a Valid UserName!" });
        }

        return res.status(201).json({
            success: true,
            message: "Address Added Successfully!",
            userExist
        })

    }catch(err) {
        console.log(err)
    }
}