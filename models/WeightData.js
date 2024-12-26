const mongoose = require("mongoose");

const WeightDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  disposition: {
    type: Number,
    required: true,
  },
});

const WeightData = mongoose.model("WeightData", WeightDataSchema);

module.exports = WeightData;
