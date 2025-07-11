
// src/pages/dashboard/DoctorDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:8000/api/appointments", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAppointments(res.data);
        } catch (err) {
            setError("Failed to fetch appointments", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `http://localhost:8000/api/appointments/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchAppointments(); // refresh after update
        } catch (err) {
            console.error("Error updating appointment status:", err);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <div style={{ padding: "1.5rem", background: "#fff", borderRadius: "8px" }}>
            <h2>Doctor Dashboard</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt._id}>
                                <td>{appt.patient?.name || "N/A"}</td>
                                <td>{appt.patient?.email || "N/A"}</td>
                                <td>{appt.date}</td>
                                <td>{appt.time}</td>
                                <td>{appt.reason}</td>
                                <td>{appt.status}</td>
                                <td>
                                    {appt.status === "pending" && (
                                        <>
                                            <button onClick={() => handleStatusChange(appt._id, "approved")}>Approve</button>
                                            <button onClick={() => handleStatusChange(appt._id, "rejected")}>Reject</button>
                                        </>
                                    )}
                                    {appt.status === "approved" && (
                                        <button onClick={() => handleStatusChange(appt._id, "completed")}>Complete</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorDashboard;

