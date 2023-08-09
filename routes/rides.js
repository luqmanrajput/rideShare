const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const { request, history } = require("../controllers/rideController");

// Rides Route 1: Create a ride using - POST ('/api/rides/request')
router.post("/request", authUser, request);

// Rides Route 2: Create a ride using - POST ('/api/rides/history')
router.get("/history", authUser, history);

module.exports = router;
