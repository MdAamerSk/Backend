import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import userModel from "../models/user.model.js";

dotenv.config()

const app = express();

app.use(express.json())


app.get("/api",(req,res) => {
    res.status(200).json({
        message: "welcome to the authenticaion API"
    })
})

app.post("/api/auth/register",async(req,res) =>{

    const {email,name,password} = req.body;

    const user =await userModel.create({
        email,name,password
    })

    const token = jwt.sign(
        {
            id:user._id
        },
        "d041577bf75739da1eb105bb70eda6126bed69d7185ded8c37aa43fc8552ee12"
    )

    res.status(201).json({
        message:"user creates successfully",
        data :{
           user: {
            email,
            name,
            id:user._id
           } ,
           token
        }
    })

})

app.get("/api/auth/me",async (req,res) => {

    const authHeader = req.headers.authorization;
    console.log(authHeader);

    const data = jwt.decode(authHeader)
    console.log(data);

    const user = await userModel.findById(data.id)
    console.log(user);

})

export default app;