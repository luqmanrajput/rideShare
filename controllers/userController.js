// Imports
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign String
const JWT_SECRET = "mySecretString";

// Signup
const signup = async (req, res) => {
  // Destructuring request data
  const { name, email, password } = req.body;
  // Checking and handling the validation errors
  let success = false;
  // const errors = validationResult(req);
  // If errors are found:
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ success, errors: errors.array });
  // }
  // If no validation errors are found:
  try {
    // Checking if user already exists:
    console.log("Enter in Try Block");
    let dbUser = await User.findOne({ email });
    console.log(dbUser);
    // If user already exists:
    if (dbUser) {
      return res.status(400).json({ success, error: "User already exists!" });
    }
    // If user doesn't exists:
    //   Creating new user
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: secPass,
    });

    console.log("Create User", user);
    const authID = {
      user: {
        id: user.id,
      },
    };
    // const authToken = jwt.sign(authID, JWT_SECRET);
    success = true;
    return res.json({
      user,
      authID,
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(500).send("Internal server error occured");
  }
};

module.exports = { signup };
