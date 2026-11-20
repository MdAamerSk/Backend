import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport"
import authRoutes from "../routes/auth.routes.js"


const app = express();
app.use(cors(
   { 
    origin: process.env.CLIENT_URL,
    credentials: true 
   }
  )
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(
    () => app.listen(process.env.PORT,
      () => console.log('API on', process.env.PORT)
    )
  );