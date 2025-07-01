const AppointmentsPage = () => {
    const mockAppointments = [
        { id: 1, date: "2025-06-30", time: "10:00 AM", doctor: "Dr. Mehta" },
        { id: 2, date: "2025-07-02", time: "2:30 PM", doctor: "Dr. Sharma" },
    ];

    return (
        <div>
            <h2>My Appointments</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                    </tr>
                </thead>
                <tbody>
                    {mockAppointments.map((appt) => (
                        <tr key={appt.id}>
                            <td>{appt.id}</td>
                            <td>{appt.date}</td>
                            <td>{appt.time}</td>
                            <td>{appt.doctor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentsPage;
