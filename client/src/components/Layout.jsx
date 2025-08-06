import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        // setRole(user?.role);
        if (user?.role) setRole(user.role);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const navItems = {
        patient: [
            { path: "/dashboard", label: "Dashboard" },
            { path: "/appointments", label: "My Appointments" },
            { path: "/book", label: "Book Appointment" },
        ],
        // doctor: [
        //     { path: "/dashboard", label: "Dashboard" },
        //     { path: "/doctor/patients", label: "My Patients" },
        // ],
        doctor: [
            { path: "/dashboard", label: "Dashboard" },
            { path: "/patients", label: "My Patients" }, // ✅ FIXED HERE
        ],
        admin: [
            { path: "/dashboard", label: "Dashboard" },
            { path: "/users", label: "Manage Users" },
        ],
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
            <aside style={{ width: "250px", background: "#1E3A8A", color: "white", padding: "20px 10px", minHeight: "100vh", boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)" }}>
                <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>MediBook</h2>
                {role && navItems[role]?.map((item, idx) => (
                    <div key={idx}>
                        <Link to={item.path} style={{ display: "block", marginBottom: "10px", color: "white" }}>
                            {item.label}
                        </Link>
                    </div>
                ))}
                <button onClick={handleLogout} style={{ marginTop: "30px", background: "red", color: "white", padding: "8px 12px", border: "none", borderRadius: "4px" }}>
                    Logout
                </button>
            </aside>
            <main style={{ flex: 1, padding: "20px 30px", background: "#f9f9f9" }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
