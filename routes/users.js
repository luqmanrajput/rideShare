// Imports
const express = require("express");
const {
  signup,
  login,
  profile,
  update,
} = require("../controllers/userController");
const authUser = require("../middlewares/authUser");
const router = express.Router();

// Auth Route 1: Create a user using - POST ('/api/users/signup')
router.post("/signup", signup);

// Auth Route 2: loggin in user - POST ('/api/users/login')
router.post("/login", login);

// Auth Route 3: Showing user profile - POST ('/api/users/profile')
router.get("/profile", authUser, profile);

// Auth Route 4: Showing user profile - PATCH ('/api/users/profile')
router.patch("/profile", authUser, update);

module.exports = router;
