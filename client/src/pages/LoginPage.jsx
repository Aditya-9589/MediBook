import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/auth/login", formData);

            // Store token and user in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            console.log("Login Response:", res.data);       // Extra

            alert("Login successful!");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f3f4f6"
        }}>
            <form
                onSubmit={handleLogin}
                style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "400px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
                }}
            >
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textAlign: "center",
                    color: "#2563eb"
                }}>
                    Login
                </h2>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "0.5rem",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>
                <p style={{
                    fontSize: "14px",
                    marginTop: "1rem",
                    textAlign: "center"
                }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
}
