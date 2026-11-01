import mongoose from "mongoose";
import { env } from "./environment";

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDatabase;