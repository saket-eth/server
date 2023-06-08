const sha256 = require("sha256");

module.exports.generateOTP = (length) => {
  const characters = "0123456789";
  let otp = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
};

module.exports.hashOTP = (otp) => {
  return sha256(otp.toString());
};
