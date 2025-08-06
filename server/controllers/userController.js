// controllers/userController.js
const Appointment = require("../models/Appointment");

const getPatientsForDoctor = async (req, res) => {

    console.log("REQ.USER:", req.user); // ✅ Check if user is correctly coming in


    try {
        const doctorId = req.user._id;

        const appointments = await Appointment.find({ doctor: doctorId })
            .populate("patient", "name email");

        const uniquePatients = [
            ...new Map(
                appointments.map(appt => [appt.patient._id.toString(), appt.patient])
            ).values()
        ];

        res.status(200).json(uniquePatients);
    } catch (error) {
        console.error("Error fetching patients for doctor:", error);
        res.status(500).json({ message: "Failed to fetch patients" });
    }
};

module.exports = {
    getPatientsForDoctor,
};
