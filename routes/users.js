// Imports
const express = require("express");
const router = express.Router();
const authUser = require("../middlewares/authUser");
const {
  signup,
  login,
  profile,
  update,
  changePassword,
} = require("../controllers/userController");

// Users Route 1: Create a user using - POST ('/api/users/signup')
router.post("/signup", signup);

// Users Route 2: loggin in user - POST ('/api/users/login')
router.post("/login", login);

// Users Route 3: Showing user profile - POST ('/api/users/profile')
router.get("/profile", authUser, profile);

// Users Route 4: Showing user profile - PATCH ('/api/users/profile')
router.patch("/profile", authUser, update);

// Users Route 4: Showing user profile - PATCH ('/api/users/change-password')
router.post("/change-password", authUser, changePassword);

module.exports = router;
