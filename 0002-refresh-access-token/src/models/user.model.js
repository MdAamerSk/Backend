import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3,"Name must be atleast 3 characters long"],
        maxLength: [50,"Name must be most 50 characters long"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please fill a valid email address'
        ]
    },
    passwordHash: {
        type: String,
        required: true,
    },
    refreshToken:{
        type:String,
    }
})

const userModel = mongoose.model("users",userSchema);

export default userModel;