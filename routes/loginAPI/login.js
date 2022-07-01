const User = require("../../model/userMaster")
const validateFunction = require("../../utility/validateFunction")
const crypto = require("crypto")
const crypt = require("../../utility/crypt")

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


exports.login = async (req, res) =>{
    const {email, password} = req.query;

    console.log(req.query);


    try{
        if (!email || !password) {
            return res.status(422).json({ error: "Please fill the fields properly" });
        }
        if(!validateFunction.validateEmail(email)) return res.status(422).json({ error: "Please fill the Email correctly" });

        userExist  = await User.findOne({email})

        if(!userExist) return res.status(422).json({ error: "Please SignUp First" });

       

        let decpassword = crypt.decrypt(userExist.password, secretKey, iv);

        console.log(decpassword);

        if(decpassword===password) return res.status(201).json({ message: "SignedIN Successfully"});

        if(decpassword!==password)
        return res.status(422).json({ error: "Please fill the Email or Password correctly" });


    }

    catch(err){
        console.log(err)
    }
}