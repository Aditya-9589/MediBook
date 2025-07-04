import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import '../App.css'

const AppointmentListPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("token");
                const user = JSON.parse(localStorage.getItem("user"));
                setUserRole(user.role);

                const res = await axios.get("http://localhost:8000/api/appointments", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAppointments(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Fetch Error:", err)
                setError("Failed to load appointments");
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await axios.patch(`http://localhost:8000/api/appointments/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update UI after change
            setAppointments((prev) =>
                prev.map((appt) =>
                    appt._id === id ? { ...appt, status } : appt
                )
            );
        } catch (err) {
            console.error("Status update error:", err)
            alert("Failed to update status");
        }
    };

    return (
    <Layout>
        <div>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>Appointments</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : (
                <table className="appointment-table">
                    <thead>
                        <tr>
                            {userRole === "admin" && <th>Patient</th>}
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Reason</th>
                            <th>Status</th>
                            {userRole !== "patient" && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt._id}>
                                {userRole === "admin" && (
                                    <td>{appt.patient?.name || "N/A"}</td>
                                )}
                                <td>{appt.doctor?.name || "N/A"}</td>
                                <td>{appt.date}</td>
                                <td>{appt.time || "N/A"}</td>
                                <td>{appt.reason}</td>
                                <td>{appt.status}</td>
                                {userRole !== "patient" && (
                                    <td>
                                        {["pending", "approved"].includes(appt.status) && (
                                            <>
                                                {appt.status !== "approved" && (
                                                    <button onClick={() => updateStatus(appt._id, "approved")}>
                                                        Approve
                                                    </button>
                                                )}
                                                {appt.status !== "rejected" && (
                                                    <button onClick={() => updateStatus(appt._id, "rejected")}>
                                                        Reject
                                                    </button>
                                                )}
                                                {appt.status !== "completed" && (
                                                    <button onClick={() => updateStatus(appt._id, "completed")}>
                                                        Complete
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </Layout>
);

};

export default AppointmentListPage;
