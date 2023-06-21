const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const createToken = require("../../utils/jwt");
const {httpStatus} = require("../../config/HttpErrors");

const login = async (req, res) => {
  const { email, password } = req.body;

  let existEmail = await userModel.findOne({ email }, null, { lean: true });

  if (existEmail) {
    bcrypt.compare(password, existEmail.password, (err, result) => {
      if (result) {
        const { password, ...currentUser } = existEmail;
        let token = createToken(
          {
            _id: existEmail._id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            role: currentUser.role,
            time: new Date().getTime(),
          },
          "1d"
        );
        res.send({ user: currentUser, token });
      } else {
        res.status(httpStatus.INVALID_DATA.status).
            send({msg: "Password is not valid!"})
      }
    });
  } else {
      res.status(httpStatus.NOT_EXIST.status).send(httpStatus.NOT_EXIST.send);
  }
};

module.exports = login;
