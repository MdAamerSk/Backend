import mongoose from "mongoose"
import config from "./config.js";

export async function connectDB() {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("db connected successfully")
    }
    catch (err) {
        console.log(err.message);
    }
}