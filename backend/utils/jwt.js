const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn });
};

module.exports = createToken;
