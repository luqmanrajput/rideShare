const mongoose = require("mongoose");

// Connection Function
const connectToMongo = async () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017", {
      dbName: "rideShare",
    })
    .then(() => console.log("Database is Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectToMongo;
