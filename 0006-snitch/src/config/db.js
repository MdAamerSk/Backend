import mongoose from "mongoose"
import config from "./config.js"

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("database connected successfully")
    } catch (error) {
        console.error("database connection failed", error)
    }
}

export default connectDB    