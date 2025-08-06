const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// 🔐 Middleware
app.use(cors());
app.use(express.json());

// 📦 Routes
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointments");
const userRoutes = require("./routes/users");


// 🔗 Route Mounting
app.use("/api/auth", authRoutes);             // Login/Register
app.use("/api/appointments", appointmentRoutes); // Booking, status update
app.use("/api/users", userRoutes);            // Doctors, patients, all users

// 🔍 Health check route
app.get("/", (req, res) => {
    res.send("MediBook API is running");
});

// 🛢️ MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });
