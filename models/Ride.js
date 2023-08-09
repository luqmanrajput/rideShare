const mongoose = require("mongoose");
const { Schema } = mongoose;

const RideSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  startLocation: {
    type: {
      longitude: Number,
      latitude: Number,
    },
  },
  endLocation: {
    type: {
      longitude: Number,
      latitude: Number,
    },
  },
  rideStatus: {
    type: String,
  },
});

module.exports = mongoose.model("ride", RideSchema);
