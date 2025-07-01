const UsersPage = () => {
    const mockUsers = [
        { id: 1, name: "Admin", role: "admin", email: "admin@example.com" },
        { id: 2, name: "Dr. Mehta", role: "doctor", email: "mehta@hospital.com" },
        { id: 3, name: "Rahul Singh", role: "patient", email: "rahul@gmail.com" },
    ];

    return (
        <div>
            <h2>All Users</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {mockUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
