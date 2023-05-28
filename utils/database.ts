import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL as string, {
            dbName: 'project',
        })
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}