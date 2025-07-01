const DoctorDashboard = () => {
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
                Doctor Panel
            </h3>
            <p>Here you can view appointments and manage your schedule.</p>
        </div>
    );
};

export default DoctorDashboard;
