// Imports
const express = require("express");
const { signup, login } = require("../controllers/userController");
const router = express.Router();

// Auth Route 1: Create a user using - POST ('/api/auth/users/signup')
router.post("/signup", signup);
// Auth Route 2: loggin in user - POST ('/api/auth/users/login')
router.post("/login", login);

module.exports = router;
