import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import hotelRoutes from "./routes/HotelRoutes.js";
import roomRoutes from "./routes/RoomRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected')
})

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(8080, () => {
    connect()
    console.log("Api running on port 8080")
})