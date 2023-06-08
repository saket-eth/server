const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = async ({ _id }) => {
  const token = jwt.sign({ userId: _id }, process.env.JWT_ACCESS_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
  return token;
};
