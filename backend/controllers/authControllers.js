import UserModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js"
import { sendVerificationEmail,sendWlcomeEmail,sendResetPassWordEmail,sendSuccessResetPassword } from "../mailTrap/emails.js"


export const singup = async (req,res)=>{
    const {email,name,password} =req.body
    try {
        if(!email || !name ||!password){
            throw new Error("Alfildes are required")
        }
        const userAlreadyExiste = await UserModel.findOne({email})
        if (userAlreadyExiste){
            res.status(400).json({success : false,message : "user already existe"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const verificationToken = Math.floor(100000 + Math.random() * 900000 ).toString()
        const user = new UserModel({
            email,
            name,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000
        })
        await user.save()

        generateTokenAndSetCookies(res,user._id)
        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message:"user created successfully",
            user : {
                ...user._doc,
                password : undefined
            }
        })

    } catch (error) {
        res.status(400).json({success :false , message : error.message})
    }
    

}

export const verifyEmail=async (req,res)=>{
   const {code }=req.body
   try {
    const user = await UserModel.findOne({
        verificationToken : code,
        verificationTokenExpiresAt : {$gt:Date.now()}
    })
    if(!user){
        res.status(400).json({success:false, message:"invikide or expired verification token"})
    }

    user.isVerified =true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt= undefined
    await user.save()

   await sendWlcomeEmail(user.email, user.name)

    res.status(201).json({
        success:true,
        message :"the acount is verified",
        user :{
            ...user._doc,
            password:undefined
        }
    })
    

   } catch (error) {
    console.log("error in very email", error)
    res.status(500).json({success:false ,message:"sever error"})  
   }

}
export const login = async (req,res)=>{
    const {email,password}= req.body
    try {
        if(!email||!password){
            throw new Error("Alfildes are required")
        }
        const user = await UserModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        const validPassword =await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }

        generateTokenAndSetCookies(res,user._id)
        user.lastLogin = new Date()
        await user.save()

        res.status(200).json({
            success:true,
            message : "logged in succssefully",
            user:{
                ...user._doc,
                password:undefined
            }
        })

    } catch (error) {
        console.log("error in login ", error)
        res.status(400).json({ success:false, message:error.message})
        
    }
}
export const logout = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true, message:"logged out succssefully"})
}

export const forgotPassword= async (req,res)=>{
    const {email}=req.body
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            res.status(400).json({success:false, message:"user not founded"})
        }
        //generet rest password token
        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExoriesAt = Date.now()+1*60*60*1000 //1 hour

        user.resetPasswordToken= resetToken
        user.resetPasswordTokenExpiresAt= resetTokenExoriesAt
        await user.save()

        // send reset password email
       await  sendResetPassWordEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)

       res.status(200).json({success:true ,message:"reset password link sent to your email"})

    } catch (error) {
        console.log("errorin sendeing reset password link ", error)
        res.status(400).json({success:false,message:error.message})
        
    }
}

export const resetPassword=async (req,res)=>{
    const {token}=req.params
    const {password}=req.body
    try {
        const user = await UserModel.findOne({resetPasswordToken: token , resetPasswordTokenExpiresAt :{$gt:Date.now()}})
        if (!user){
          return   res.status(400).json({success:false, message :"invalide or expired token"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        user.password= hashedPassword
        user. resetPasswordToken =undefined,
        user.resetPasswordTokenExpiresAt  =undefined,
        await user.save()

        await sendSuccessResetPassword(user.email)

        res.status(200).json({success:true, message:"Password reset successful"})

    } catch (error) {
        console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth =async (req,res)=>{
    try {
        const user =await UserModel.findById(req.userId).select("-password")
        if(!user) return res.status(400).json({success : false, message:"user not found"})

        res.status(200).json({success:true,user})
        

    } catch (error) {
        console.log("error in check Auth ", error)
            return res.status(400).json({success:false,message:error.message})
    }
}