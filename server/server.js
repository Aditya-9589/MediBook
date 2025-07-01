const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// ✅ Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const appointmentRoutes = require("./routes/appointments");
app.use("/api/appointments", appointmentRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("MediBook API is running");
});

// MongoDB connection
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
