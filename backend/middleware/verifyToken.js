const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const {httpStatus} = require("../config/HttpErrors");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  if (req.headers.hasOwnProperty("authorization")) {
    let token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_KEY, async (error, decode) => {
      if (error) {
        res.status(httpStatus.TOKEN_EXPIRIES.status)
            .send(httpStatus.TOKEN_EXPIRIES.send)
      } else {
        try {
          let user = await userModel.findOne({ _id: decode._id });
          if (user) {
            req.locals = decode;
            next();
          } else {
            res.status(httpStatus.TOKEN_EXPIRIES.status).send({msg: "Token is invalid."})
          }
        } catch (error) {
          res.status(httpStatus.SERVICE_ERROR.status)
              .send(httpStatus.SERVICE_ERROR.send)
        }
      }
    });
  } else {
    res.status(httpStatus.TOKEN_EXPIRIES.status).send({msg: "You not logged"})
  }
};

module.exports = verifyToken;
