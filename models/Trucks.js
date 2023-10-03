
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
  Gross_vehicle_weight: {
    type: String,
    required: true,
  },
  payload: {
    type: Number,
    required: true,
  },
  Fuel_tank_capacity: {
    type: Number,
    required: true,
  },
  DFM_capacity: {
    type: String,
  },
  bodylength: {
    type: Number,
    required: true,
    enum: [10, 12, 15, 14, 16, 20, 22, 24, 32, 36],
  },
  Cabin_type: {
    type: String,
    required: true,
    enum: ["Single", "Double"],
  },
  Steering: {
    type: String,
    required: true,
  },
  Gear: {
    type: String,
    required: true,
  },
  AC: {
    type: String,
    required: true,
    enum: ["AC", "Non-AC"],
  },
  Braking: {
    type: String,
    required: true,
    enum: ["Drum", "Disc", "Hydraulic"],
  },
  Suspension: {
    type: String,
    required: true,
  },
  Wheels: {
    type: String,
    required: true,
  },
  Engine_capacity: {
    type: String,
    required: true,
  },
  Torque: {
    type: String,
    required: true,
  },
  Horse_power: {
    type: String,
    required: true,
  },
});

const TrucksModel = mongoose.model("Truck", TrucksSchema);

module.exports = TrucksModel;

