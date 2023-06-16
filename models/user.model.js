const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedOTP: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  // phoneNumber: {
  //   type: String,

  //   unique: true,
  // },
  familyMembers: {
    type: Number,
    default: 0,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneNumberVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
