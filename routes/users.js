// Imports
const express = require("express");
const { signup, login, profile } = require("../controllers/userController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

// Auth Route 1: Create a user using - POST ('/api/auth/users/signup')
router.post("/signup", signup);

// Auth Route 2: loggin in user - POST ('/api/auth/users/login')
router.post("/login", login);

// Auth Route 3: Showing user profile - POST ('/api/auth/users/profile')
router.get("/profile", authUser, profile);

module.exports = router;
