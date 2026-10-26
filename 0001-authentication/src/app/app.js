import express from "express";
import jwt from "jsonwebtoken"

const app = express();

app.use(express.json())

app.get("/api",(req,res) => {
    res.status(200).json({
        message: "welcome to the authenticaion API"
    })
})

app.post("/api/auth/register",(req,res) =>{

    const {email,name,password} = req.body;

    /* save data to db
    */

    const token = jwt.sign(
        {
            email,name
            // _id
        },
        "d041577bf75739da1eb105bb70eda6126bed69d7185ded8c37aa43fc8552ee12"
    )

    res.status(201).json({
        message:"user creates successfully",
        data :{
           user: {
            email,name
           } ,
           token
        }
    })

})

export default app;