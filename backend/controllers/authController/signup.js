const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const {httpStatus} = require("../../config/HttpErrors");
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
      res.status(httpStatus.EXIST.status)
          .send(httpStatus.EXIST.send)
    }
  } catch (error) {
    res.status(httpStatus.SERVICE_ERROR.status)
        .send({error: error.message})
  }
};

module.exports = signup;
