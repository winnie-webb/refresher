const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
async function ConnectToDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = ConnectToDB;
