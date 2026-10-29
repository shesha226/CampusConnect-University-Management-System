import mongoose from 'mongoose';

export async function connectToDatabase(): Promise<void> {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

    if(!mongoUri) {
        throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
    });

    console.log('Connected to MongoDB');
}