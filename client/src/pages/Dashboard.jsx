import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import PatientDashboard from "./dashboard/PatientDashboard";
import DoctorDashboard from "./dashboard/DoctorDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

const Dashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    if (!token || !user) {
        return <p>Unauthorized. Please login.</p>;
    }

    let Content;
    switch (user.role) {
        case "patient":
            Content = <PatientDashboard />;
            break;
        case "doctor":
            Content = <DoctorDashboard />;
            break;
        case "admin":
            Content = <AdminDashboard />;
            break;
        default:
            Content = <p>Unknown role</p>;
    }

    return (
        <Layout>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem"
            }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600" }}>
                    Welcome, {user.role}
                </h2>
                <button
                    onClick={handleLogout}
                    style={{
                        backgroundColor: "#dc2626",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "4px",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Logout
                </button>
            </div>
            {Content}
        </Layout>
    );
};

export default Dashboard;
