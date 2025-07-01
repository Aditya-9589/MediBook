import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setRole(user?.role);
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
        doctor: [
            { path: "/dashboard", label: "Dashboard" },
            { path: "/patients", label: "My Patients" },
        ],
        admin: [
            { path: "/dashboard", label: "Dashboard" },
            { path: "/users", label: "Manage Users" },
        ],
    };

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside style={{ width: "250px", background: "#1E3A8A", color: "white", padding: "20px" }}>
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
            <main style={{ flex: 1, padding: "20px" }}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
