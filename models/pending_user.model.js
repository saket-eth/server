const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema({
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
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    // validate: {
    //   validator: function (v) {
    //     const phoneRegex = /^\d{10}$/;
    //     return phoneRegex.test(v);
    //   },
    //   message: "Invalid phone number format",
    // },
    unique: true,
  },
  familyMembers: {
    type: Number,
    default: 0,
  },
});

const PendingUser = mongoose.model("Pending User", pendingUserSchema);

module.exports = PendingUser;
