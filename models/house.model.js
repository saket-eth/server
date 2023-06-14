const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  name: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
