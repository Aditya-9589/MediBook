const PatientsPage = () => {
    const mockPatients = [
        { id: 1, name: "Rahul Singh", email: "rahul@gmail.com" },
        { id: 2, name: "Anjali Verma", email: "anjali@gmail.com" },
    ];

    return (
        <div>
            <h2>My Patients</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {mockPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientsPage;
