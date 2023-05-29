const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  if (req.headers.hasOwnProperty("authorization")) {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_KEY, async (error, decode) => {
      if (error) {
        res.send({ msg: "Token is expiries!" });
      } else {
        try {
          let user = await userModel.findOne({ _id: decode._id });
          if (user) {
            req.locals = decode;
            next();
          } else {
            res.status(401).send({ msg: "Token is invalid!" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  } else {
    res.send({ msg: "You not logged" });
  }
};

module.exports = verifyToken;
