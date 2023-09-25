
const mongoose = require("mongoose");

const TrucksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const TrucksModel = mongoose.model("Truck", TrucksSchema);

module.exports = TrucksModel;
