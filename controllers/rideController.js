const Ride = require("../models/Ride");
const { rideRequestSchema } = require("../validations/rideValidations");

// Creating ride request
const request = async (req, res) => {
  try {
    let success = false;
    const { startLocation, endLocation } = req.body;
    console.log(startLocation, endLocation);
    const tokenID = req.user.id;
    console.log("token Id:", tokenID);
    // Checking and handling the validation errors
    await rideRequestSchema.validateAsync(req.body);

    // Checking ride request has already been made
    const rideCheck = await Ride.find({
      userId: tokenID,
      rideStatus: "reserved",
    });
    console.log("rideCheck: ", rideCheck);
    if (rideCheck) {
      return res
        .status(400)
        .json({ success, message: "You have already booked a ride." });
    }

    // If there is no active ride request
    const ride = await Ride.create({
      userId: tokenID,
      startLocation: {
        longitude: startLocation.longitude,
        latitude: startLocation.latitude,
      },
      endLocation: {
        longitude: endLocation.longitude,
        latitude: endLocation.latitude,
      },
      rideStatus: "reserved",
    });
    console.log(ride);
    success = true;
    return res.status(201).json({ success, message: "Ride booked!", ride });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res
        .status(500)
        .send("Internal server error occured in making ride request");
    }
  }
};

module.exports = { request };
