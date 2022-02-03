const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  full_name: {
    type: String,
    required: false,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 1024,
  },
  offers_bought: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
