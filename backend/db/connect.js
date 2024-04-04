const mongoose =require("mongoose")
require('dotenv').config();


const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL
    );
    console.log("MongoDB connection SUCCESS");
  } catch (error) {
    console.error("MongoDB connection FAIL");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;