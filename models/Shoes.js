const mongoose = require("mongoose");

const ShoeScheema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 255,
  },
  brand: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  buyers: {
    type: Array,
  },
  creator: {
    type: String,
  },
});

module.exports = mongoose.model("Shoe", ShoeScheema);
