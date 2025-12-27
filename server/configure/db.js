const mongoose = require("mongoose");

async function connectDB() {
  const uri = "mongodb://127.0.0.1:27017/chacha_portal"; // or your Atlas URI
  
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

module.exports = connectDB;

