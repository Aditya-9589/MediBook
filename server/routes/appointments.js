// server/routes/appointments.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
} = require("../controllers/appointmentController");

// Book an appointment (Patient)
router.post("/book", authMiddleware, bookAppointment);

// Get appointments (role-based)
router.get("/", authMiddleware, getAppointments);

// Update appointment status (Doctor/Admin)
router.patch("/:id/status", authMiddleware, updateAppointmentStatus);

module.exports = router;
