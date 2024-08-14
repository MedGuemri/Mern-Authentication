import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./dbConnect/connectDB.js"

import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"



const app =express()
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
dotenv.config()



app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server running on ${PORT}` )
})


