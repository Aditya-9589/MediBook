const AdminDashboard = () => {
    return (
        <div style={{
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "1.5rem"
        }}>
            <h3 style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "0.5rem"
            }}>
                Admin Panel
            </h3>
            <p>Here you can manage users, doctors, and system settings.</p>
        </div>
    );
};

export default AdminDashboard;
