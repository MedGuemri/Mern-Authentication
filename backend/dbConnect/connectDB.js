import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected on ${connect.connection.host}`)
        
    } catch (error) {
        console.log("error connection to DB", error.message )
        
    }
}