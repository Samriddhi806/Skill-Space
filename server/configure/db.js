const mongoose = require("mongoose");

async function connectDB() {
  const uri = "mongodb://127.0.0.1:27017/skillsphere";
  
  try {
    
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected - SkillSphere");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;

