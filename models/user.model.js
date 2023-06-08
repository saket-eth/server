const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
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
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(v);
      },
      message: "Invalid phone number format",
    },
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
