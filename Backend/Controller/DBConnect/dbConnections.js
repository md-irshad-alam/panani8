import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
("node --trace-warnings");
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
export default connection;
