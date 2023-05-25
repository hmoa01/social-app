const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signup = async (req, res) => {
  let { email, password } = req.body;
  let reqBody = req.body;

  try {
    let existUser = await userModel.findOne({ email });
    if (!existUser) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        let user = new userModel({ ...reqBody, password: hash });
        user.save();
        res.status(200).send("User is Registred!");
      });
    } else {
      console.log("User exist!");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = signup;
