const Ride = require("../models/Ride");
const { rideRequestSchema } = require("../validations/rideValidations");

// Creating ride request
const request = async (req, res) => {
  try {
    let success = false;
    const { startLocation, endLocation } = req.body;
    const tokenID = req.user.id;
    const tokenRole = req.user.role;
    if (tokenRole === "driver") {
      return res
        .status(400)
        .json({ message: "Login as user to request a ride" });
    }
    // Checking and handling the validation errors
    await rideRequestSchema.validateAsync(req.body);

    // Checking ride request has already been made
    const rideCheck = await Ride.findOne({
      userId: tokenID,
      rideStatus: "reserved",
    });
    console.log("fdsfdsfsdf", rideCheck);
    console.log(!rideCheck === 0);
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
      rideStatus: "available",
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

// View Ride history
const history = async (req, res) => {
  try {
    let success = false;
    const tokenID = req.user.id;
    const tokenRole = req.user.role;
    if (tokenRole === "driver") {
      return res
        .status(400)
        .json({ message: "Login as user to view ride history" });
    }

    // fetching completed rides in the past
    const rides = await Ride.find({ userId: tokenID, rideStatus: "completed" });
    if (rides.length === 0) {
      return res
        .status(400)
        .json({ success, message: "No previous rides record found" });
    }
    console.log(rides);
    success = true;
    return res
      .status(400)
      .json({ success, message: "Rides record found", rides });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res
        .status(500)
        .send("Internal server error occured in viewing ride history");
    }
  }
};

// Available Rides
const available = async (req, res) => {
  try {
    const tokenRole = req.user.role;
    console.log("token role for available api:", tokenRole);
    if (tokenRole === "user") {
      return res
        .status(400)
        .json({ message: "Login as driver to view available rides" });
    }
    const rides = await Ride.find({ rideStatus: "available" });
    if (!rides) {
      return res.status(400).json({ message: "No Rides available to accept" });
    }
    return res.status(200).json({ rides });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { request, history, available };
