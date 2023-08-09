const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {},
  email: {},
  password: {},
  role: {},
});

module.exports = mongoose.model("user", UserSchema);
