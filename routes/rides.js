const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {
  request,
  history,
  available,
  select,
  complete,
} = require("../controllers/rideController");

// Rides Route 1: Create a ride using - POST ('/api/rides/request')
router.post("/request", authUser, request);

// Rides Route 2: Create a ride using - GET ('/api/rides/history')
router.get("/history", authUser, history);

// Rides Route 3: View available rides - GET ('/api/rides/history')
router.get("/available", authUser, available);

// Rides Route 4: Select a ride - PATCH ('/api/rides/select/:rideId')
router.patch("/select/:rideId", authUser, select);

// Rides Route 5: Complete a ride - PATCH ('/api/rides/select/:rideId')
router.patch("/complete/:rideId", authUser, complete);

module.exports = router;
