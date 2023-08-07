// Imports
const express = require("express");
const { signup } = require("../controllers/userController");
const router = express.Router();

// Auth Route 1: Create a user using - POST ('/api/auth/users/signup')
router.post("/signup", signup);

module.exports = router;
