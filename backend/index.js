import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./dbConnect/connectDB.js"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"
import path from "path"



const app =express()
const PORT = process.env.PORT || 5000
const __dirname = path.resolve()
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
dotenv.config()



app.use("/api/auth", authRoutes)

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT,()=>{
    connectDB()
    console.log(`server running on ${PORT}` )
})


