import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

import { ENV } from "./env.js";

setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      console.error(`MONGO_URI is not set in environment variables`);
    }

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
