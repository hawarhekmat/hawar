import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017", {
            dbName: 'project',
        })
        isConnected = true;
    } catch (error) {
        console.log(error);
    }
}