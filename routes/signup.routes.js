require("dotenv").config();
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const OAuth2 = google.auth.OAuth2;
const User = require("../models/user.model");
const PendingUser = require("../models/pending_user.model");

const router = require("express").Router();
const sha256 = require("sha256");

const { generateOTP, hashOTP } = require("../helpers/OTP");
const { generateAccessToken } = require("../helpers/jwt");
const { response } = require("express");
const { sendMail } = require("../helpers/email");
const CLIENT_ID = process.env.CLIENT_ID;

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    oauth2Client.setCredentials({ access_token: token });
    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const userInfo = await oauth2.userinfo.get();
    const { given_name, family_name, email } = userInfo.data;
    console.log("userInfo: ", userInfo.data);

    if (!userInfo.data.verified_email) {
      return res.send({
        error: true,
        message: "Your google email address is not verified",
      });
    }

    const checkUser = await User.findOne({
      email,
    }).exec();
    if (checkUser) {
      const token = await generateAccessToken(checkUser._id);
      return res.send({ token: token });
    }

    const user = await User.create({
      firstName: given_name,
      lastName: family_name,
      email,
    });
    const access_token = await generateAccessToken(user._id);
    res.send({ token: access_token });
  } catch (error) {
    console.error("Error:", error);
    return res.send({ error: "Failed to signup with Google." });
  }
});

router.post("/details", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({
      email,
    }).exec();
    if (checkUser) {
      return res.send({ message: "Account already exist. Please log in" });
    }

    const existingUser = await PendingUser.findOne({ email });

    if (existingUser) {
      await PendingUser.findByIdAndDelete(existingUser._id);
    }
    const hashedPassword = sha256(password.toString());
    const otp = generateOTP(6);
    console.log("OTP", otp);
    const hashedOTP = hashOTP(otp);

    await sendMail(email, firstName, otp);

    const user = await PendingUser.create({
      firstName,
      lastName,
      email,
      hashedOTP,
      password: hashedPassword,
    });

    return res.send({ userId: user._id });
  } catch (error) {
    console.error("Error:", error);
    return res.send({ error: "Failed to signup " });
  }
});

router.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const data = await PendingUser.findOne({ email });

    const hashedOTP = hashOTP(otp);
    if (hashedOTP !== data.hashedOTP) {
      return res.send({ error: true, message: "Invalid OTP" });
    }
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      hashedOTP: data.hashedOTP,
      password: data.password,
    });

    await PendingUser.deleteOne({ _id: data._id }).exec();

    return res.send({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
