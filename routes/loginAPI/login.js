const User = require("../../model/userMaster");
const validateFunction = require("../../utility/validateFunction");
const crypto = require("crypto");
const crypt = require("../../utility/crypt");

const secret_key = process.env.SECRET_KEY;
const secret_iv = process.env.SECRET_IV;

const secretKey = crypto
  .createHash("sha512")
  .update(secret_key, "utf-8")
  .digest("hex")
  .substr(0, 32);
const iv = crypto
  .createHash("sha512")
  .update(secret_iv, "utf-8")
  .digest("hex")
  .substr(0, 16);

exports.login = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  // console.log(req.body.password);

  try {
    if (!userName || !password) {
      return res.status(422).json({ error: "Fill the fields properly" });
    }

    if (validateFunction.validateEmail(userName)) {
      email = userName;

      userExist = await User.findOne({ email });
      console.log(userExist);

      if (!userExist)
        return res.status(422).json({ error: "Fill the Email correctly" });

      let decpassword = crypt.decrypt(userExist.password, secretKey, iv);
      console.log(decpassword);
      

      if (decpassword === password)
        return res.status(201).json({userType:userExist.userType, message: "SignIn Successful" });

      // if(decpassword!==password)
      else {
        // console.log(res.status(422).json({ error: "Invalid Password" }));
        return res.status(422).json({ error: "Invalid Password" });
      }
    } else if (validateFunction.validateMobileNo(userName)) {
      mobile = userName;

      userExist = await User.findOne({ mobile });
      // console.log(userExist);

      if (!userExist)
        return res.status(422).json({ error: "Fill the Mobile No correctly" });

      let decpassword = crypt.decrypt(userExist.password, secretKey, iv);
      console.log(decpassword);

      if (decpassword === password)
        return res.status(201).json({userType:userExist.userType, message: "SignIn Successful" });
      else return res.status(422).json({ error: "Invalid Password" });
    } else
      return res.status(422).json({ error: "Fill your credentials properly" });
  } catch (err) {
    console.log(err);
  }
};
