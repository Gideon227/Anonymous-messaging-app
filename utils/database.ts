"use server"
import mongoose from "mongoose";

let isConnected: boolean = false;

// Connect to MongoDB
export const connectToDB = async (): Promise<void> => {
     
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;  
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI as string, {
            dbName: "anonymous_project"
        });

        isConnected = true;
        console.log('MongoDB connection is successful');
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`MongoDB connection failed: ${error.message}`);
        } else {
            throw new Error('MongoDB connection failed with an unknown error');
        }
    }
};
