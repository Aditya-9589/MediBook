import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8000/api/users", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <Layout>
            <h2>All Users</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
};

export default UsersPage;
