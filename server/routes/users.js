const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { getPatientsForDoctor } = require("../controllers/userController");
const authMiddleware = require('../middleware/auth');

// Get all doctors
router.get("/doctors", async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" }).select("_id name email");
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch doctors", error: err.message });
    }
});

// Get all users (Admin)
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("_id name email role");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
});

// Get all patients (Doctor)
router.get("/patients", async (req, res) => {
    try {
        const patients = await User.find({ role: "patient" }).select("_id name email");
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch patients", error: err.message });
    }
});

// GET only patients of the logged-in doctor
router.get("/patients", authMiddleware, getPatientsForDoctor);

module.exports = router;
