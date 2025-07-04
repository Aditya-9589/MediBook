// server/controllers/appointmentController.js

const Appointment = require("../models/Appointment");

// @desc    Book a new appointment
// @route   POST /api/appointments/book
// @access  Private (Patient)
const bookAppointment = async (req, res) => {
    try {
        const { doctor, date, time, reason } = req.body;

        const appointment = new Appointment({
            patient: req.user.userId,
            doctor,
            date,
            time,
            reason,
            status: "pending",
        });

        await appointment.save();
        res.status(201).json({ message: "Appointment booked successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to book appointment", error: err.message });
    }
};

// @desc    Get all appointments (filtered by role)
// @route   GET /api/appointments
// @access  Private (Admin/Doctor/Patient)
const getAppointments = async (req, res) => {
    try {
        const role = req.user.role;
        const userId = req.user.userId;

        let filter = {};

        if (role === "doctor") {
            filter = { doctor: userId };
        } else if (role === "patient") {
            filter = { patient: userId };
        }

        const appointments = await Appointment.find(filter)
            .populate("doctor", "name email")
            .populate("patient", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
    }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
// @access  Private (Doctor/Admin)
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({ message: "Appointment status updated" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update status", error: err.message });
    }
};

module.exports = {
    bookAppointment,
    getAppointments,
    updateAppointmentStatus,
};
