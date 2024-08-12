import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email : {
        type :String,
        required : true,
        uunique : ture
    },
    password :{
        type :String,
        required : true
    },
    name :{
        type : String,
        required : ture
    },
    lastLogin :{
        type  : Date,
        default : Date.now
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    resetPasswordToken : String,
    resetPasswordTokenExpiresAt : Date,
    verificationToken : String,
    verificationTokenExpiresAt: Date







}
    ,{timestamps:true})

const UserModel = mongoose.model("User", userSchema)
export default UserModel