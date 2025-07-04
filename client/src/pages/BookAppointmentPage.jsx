import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import '../App.css'

const BookAppointmentPage = () => {
    const [formData, setFormData] = useState({
        doctor: "",
        date: "",
        time: "",
        reason: ""
    });

    const [doctors, setDoctors] = useState([]);

    // ✅ Fetch doctors from backend on component load
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/users/doctors");
                setDoctors(res.data);
            } catch (err) {
                console.error("Failed to load doctors:", err);
            }
        };

        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8000/api/appointments/book", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Appointment booked successfully!");
        } catch (err) {
            alert("Booking failed: " + (err.response?.data?.message || "Server error"));
        }
    };

    return (
        <Layout>
            <form className="appointment-form" onSubmit={handleSubmit}>
                <h2>Book Appointment</h2>

                <label>Doctor:</label>
                <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                    <option value="">Select Doctor</option>
                    {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                    ))}
                </select>

                <label>Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <label>Time:</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />

                <label>Reason:</label>
                <textarea name="reason" value={formData.reason} onChange={handleChange} required />

                <button type="submit">Book Appointment</button>
            </form>
        </Layout>

    );
};

export default BookAppointmentPage;
