const sha256 = require("sha256");
// const Nexmo = require("nexmo");

// const nexmo = new Nexmo({
//   apiKey: "YOUR_NEXMO_API_KEY",
//   apiSecret: "YOUR_NEXMO_API_SECRET",
// });

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

// module.exports.sendOTP = (phoneNumber, otp) => {
//   const from =

//   nexmo.message.sendSms(from, phoneNumber, otp, (error, result) => {
//     if (error) {
//       console.error('Error sending OTP:', error);
//     } else {
//       console.log('OTP sent:', result);
//     }
//   })
// };
