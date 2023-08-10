// Imports
const User = require("../models/User");
const {
  signupSchema,
  loginSchema,
  updateSchema,
  changePasswordSchema,
} = require("../validations/userValidations");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Sign String
const JWT_SECRET = "mySecretString";

// Signup
const signup = async (req, res) => {
  try {
    // Destructuring request data
    const { name, email, password, role } = req.body;
    let success = false;
    // Checking and handling the validation errors
    await signupSchema.validateAsync(req.body);

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
      role,
    });
    success = true;
    return res.json({
      success,
      user,
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
  try {
    const { email, password } = req.body;
    let success = false;
    // Validating Input
    await loginSchema.validateAsync(req.body);
    // Checking for user in database
    const user = await User.findOne({ email });
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
    const authData = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    success = true;
    const authToken = await jwt.sign(authData, JWT_SECRET);
    return res.status(200).json({ success, authToken });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res.status(500).send("Internal server error occured in login");
    }
  }
};

// Profile
const profile = async (req, res) => {
  try {
    let success = false;
    const user = await User.findById({ _id: req.user.id });
    success = true;
    return res.status(200).json({ success, user });
  } catch (error) {
    return res.status(500).send("Internal server error occured in profile");
  }
};

// Update user profile
const update = async (req, res) => {
  // Destructuring request params
  const { name, email } = req.body;
  // Getting user id extracted from taken using middleware
  const userID = req.user.id;
  console.log("req.user value in controller:", userID);
  let success = false;
  try {
    // Validating Input
    await updateSchema.validateAsync(req.body);

    // New user data to update
    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }
    console.log("newUser:", newUser);
    // Updating User
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $set: newUser },
      { new: true }
    );
    if (updatedUser) {
      success = true;
      return res.status(200).json({ success, updatedUser });
    } else {
      return res.status(400).json({ success, message: "User doesnt exists." });
    }
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res.status(500).send("Internal server error occured");
    }
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const { new_password, current_password } = req.body;
    const userID = req.user.id;
    let success = false;
    // Validating Input
    await changePasswordSchema.validateAsync(req.body);

    // Checking if old pass is correct
    const oldPass = await User.findById({ _id: userID }).select("password");
    const compareOldPassword = await bcrypt.compare(
      current_password,
      oldPass.password
    );
    if (!compareOldPassword) {
      return res
        .status(400)
        .json({ success, message: "Incorrect Old Password" });
    }

    //Checking if new password isn't same old
    const compareNewPassword = await bcrypt.compare(
      new_password,
      oldPass.password
    );
    if (compareNewPassword) {
      return res.status(400).json({
        success,
        message:
          "New password is same as old one. Please enter try different one.",
      });
    }

    // Changing password
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(new_password, salt);
    console.log("newHashedPassword:", newHashedPassword);
    const updatedPassword = {
      password: newHashedPassword,
    };
    console.log("updatedPassword:", updatedPassword);
    const changedPassword = await User.findByIdAndUpdate(
      userID,
      { $set: updatedPassword },
      { new: true }
    );
    console.log("changedPassword:", changedPassword);
    if (changedPassword) {
      success = true;
      return res.status(200).json({ success, changedPassword });
    }
    console.log("old password", oldPass, compare);
    return res.status(200).json({ oldPass, compare });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: error.details[0].message });
    } else {
      return res.status(500).send("Internal server error occured");
    }
  }
};
module.exports = { signup, login, profile, update, changePassword };
