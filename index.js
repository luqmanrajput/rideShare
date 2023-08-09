// Imports
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
const rideRouter = require("./routes/rides");

// Connecting to MongoDB
connectToMongo();

// Acquiring express
const app = express();
// const port = 5000;

// For Getting response in jSON format
app.use(express.json());

// Enabling cors for cross domain requests
app.use(cors());

// Available routes for requests
app.use("/api/users", userRouter);
app.use("/api/rides", rideRouter);

// Listening to backend server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
