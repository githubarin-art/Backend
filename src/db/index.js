import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

mongoose.set('debug', true); // Enable debugging

const ConnectDb = async () => {
  try {
    const connectionReceived = await mongoose.connect(
      `mongodb+srv://Arin123:ArinDatabase123@cluster0.ylboxe4.mongodb.net/${DB_Name}?retryWrites=true&w=majority`
    );
    console.log(`\n MongoDB connected !! DB HOST : ${connectionReceived.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};

export default ConnectDb;