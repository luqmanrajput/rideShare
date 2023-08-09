const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const { request } = require("../controllers/rideController");

// Rides Route 1: Create a ride using - POST ('/api/users/request')
router.post("/request", authUser, request);

module.exports = router;
