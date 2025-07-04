import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("patient");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! Please log in.");
                // Optional: Redirect to login
                window.location.href = "/";
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            alert("An error occurred while registering.");
            console.error(error);
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
                onSubmit={handleRegister}
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
                    color: "#16a34a"
                }}>
                    Register
                </h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginBottom: "1rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc"
                    }}
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                        backgroundColor: "#16a34a",
                        color: "white",
                        padding: "0.5rem",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Register
                </button>
                <p style={{
                    fontSize: "14px",
                    marginTop: "1rem",
                    textAlign: "center"
                }}>
                    Already have an account?{" "}
                    <Link to="/" style={{ color: "#16a34a", textDecoration: "underline" }}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
