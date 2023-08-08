// Imports
const User = require("../models/User");
const { signupSchema, loginSchema } = require("../validations/userValidations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign String
const JWT_SECRET = "mySecretString";

// Signup
const signup = async (req, res) => {
  // Destructuring request data
  const { name, email, password } = req.body;
  let success = false;
  try {
    // Checking and handling the validation errors
    const { error } = await signupSchema.validateAsync(req.body);

    // Checking if user already exists:
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

    const authID = {
      user: {
        id: user.id,
      },
    };
    success = true;
    const authToken = jwt.sign(authID, JWT_SECRET);
    return res.json({
      user,
      authToken,
      message: "User created successfully!",
    });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res.status(500).send("Internal server error occured");
    }
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  let success = false;

  try {
    // Checking and handling validation errors
    const { error } = await loginSchema.validateAsync(req.body);
    // Checking for user in database
    const user = await User.findOne({ email });
    console.log(user);
    // If user is found
    if (!user) {
      return res.status(400).json({ success, message: "Invalid email!" });
    }
    const comparePass = await bcrypt.compare(password, user.password);
    console.log(comparePass);
    if (!comparePass) {
      return res.status(400).json({ success, message: "Invalid credentials" });
    }
    // If pass matches generate authToken
    const authID = {
      user: {
        id: user.id,
      },
    };
    success = true;
    const authToken = await jwt.sign(authID, JWT_SECRET);
    return res.status(200).json({ success, authToken });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res.status(500).send("Internal server error occured");
    }
  }
};

// Profile
const profile = async (req, res) => {
  try {
    console.log(req.user.id);
    const user = await User.findById({ _id: req.user.id });
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send("Internal server error occuredfsndfb");
  }
};

module.exports = { signup, login, profile };
