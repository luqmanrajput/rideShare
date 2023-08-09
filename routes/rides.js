const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {
  request,
  history,
  available,
} = require("../controllers/rideController");

// Rides Route 1: Create a ride using - POST ('/api/rides/request')
router.post("/request", authUser, request);

// Rides Route 2: Create a ride using - GET ('/api/rides/history')
router.get("/history", authUser, history);

// Rides Route 3: View available rides - GET ('/api/rides/history')
router.get("/available", authUser, available);

module.exports = router;
