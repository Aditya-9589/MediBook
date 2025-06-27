import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("patient");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Register submitted:", { name, email, role, password });
        // Later: Call API here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleRegister}
                className="bg-white shadow-md rounded p-6 w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-4 text-center text-green-600">Register</h2>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Register
                </button>
                <p className="text-sm mt-3 text-center">
                    Already have an account?{" "}
                    <Link to="/" className="text-green-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
