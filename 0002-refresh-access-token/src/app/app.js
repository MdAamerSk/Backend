import express from "express"
import config from "../config/config.js";
import { connectDB } from "../config/db.js";

await connectDB()

const app = express()

app.use(express.json())

export default app;