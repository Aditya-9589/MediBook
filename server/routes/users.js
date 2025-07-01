// server/routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   GET /api/users/doctors
// @desc    Get all doctors
// @access  Public (can be secured later if needed)
router.get("/doctors", async (req, res) => {
    try {
        const doctors = await User.find({ role: "doctor" }).select("_id name email");
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch doctors", error: err.message });
    }
});

module.exports = router;
