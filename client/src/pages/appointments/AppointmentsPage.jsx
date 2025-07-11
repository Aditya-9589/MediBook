import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import '../../App.css'

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:8000/api/appointments", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAppointments(res.data);

            } catch (err) {
                console.error("Failed to load appointments list", err)
                setError("Failed to fetch appointments");
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <Layout>
            <h2>My Appointments</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt, index) => (
                            <tr key={appt._id}>
                                <td>{index + 1}</td>
                                <td>{appt.date}</td>
                                <td>{appt.time}</td>
                                <td>{appt.doctor?.name || "N/A"}</td>
                                <td>{appt.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
};

export default AppointmentsPage;
