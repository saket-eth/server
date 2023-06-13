const router = require("express").Router();
const sha256 = require("sha256");
const User = require("../models/user.model");
const { generateAccessToken } = require("../helpers/jwt");
const { generateOTP, hashOTP, sendOTP } = require("../helpers/OTP");

router.post("/email", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // if (!user.isEmailVerified) {
    //   return res.send({ message: "Your email is not verified" });
    // }

    const hashedPassword = sha256(password.toString());
    if (hashedPassword !== user.password) {
      return res.send({ error: true, message: "Invalid Password" });
    }

    const access_token = await generateAccessToken(user._id);
    return res.send({ token: access_token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/phone-number", async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user.isPhoneNumberVerified) {
      res.send("Your phone number is not verified");
    }

    const access_token = await generateAccessToken(user._id);
    return res.send({ token: access_token });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
