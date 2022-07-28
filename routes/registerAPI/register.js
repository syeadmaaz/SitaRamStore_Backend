const User = require("../../model/userMaster");

const crypto = require("crypto");
const crypt = require("../../utility/crypt");
const validateFunction = require("../../utility/validateFunction");

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

exports.register = async (req, res) => {
  const { name, email, mobile, password, userType } = req.body;

  console.log(req.body);

  try {
    if (!name || !mobile || !email || !password) {
      return res.status(422).json({ error: "Please fill the fields properly" });
    }
    if (!validateFunction.validateEmail(email))
      return res.status(500).json({ error: "Please fill the Email correctly" });
    if (!validateFunction.validateMobileNo(mobile))
      return res
        .status(422)
        .json({ error: "Please fill the mobileNo correctly" });
    userExist = await User.findOne({ $or: [{ mobile }, { email }] });
    if (userExist)
      return res.status(422).json({ error: "Email or Mobile already Exist" });

    let encpassword = crypt.encrypt(password, secretKey, iv);

    const user = new User({
      name,
      email,
      mobile,
      password: encpassword.encryptedData,
      userType,
    });
    if (!(await user.save()))
      return res.status(500).json({ error: "Failed to SignUp" });

    return res.status(201).json({
      userName: mobile,
      userType: userType,
      message: `You have Successfully Signed Up, Please use your Email or Mobile No and Password to Login`,
    });
  } catch (err) {
    console.log(err);
  }
};
