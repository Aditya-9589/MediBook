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


const getAppointments = async (req, res) => {
    try {

        // extra for checking
        // console.log("Incoming request user:", req.user); //

        const { role, _id } = req.user;

        let query = {};

        if (role === "doctor") {
            query.doctor = _id; // Only show appointments for logged-in doctor
        }

        if (role === "patient") {
            query.patient = _id; // Only show patient's appointments
        }

        const appointments = await Appointment.find(query)
            .populate("doctor", "name email")
            .populate("patient", "name email");

        // console.log(`[GET] Appointments for ${role} - ${userId}`);

        res.status(200).json(appointments);
    } catch (err) {
        console.error("Error fetching appointments:", err);
        res.status(500).json({ message: "Error retrieving appointments" });
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
