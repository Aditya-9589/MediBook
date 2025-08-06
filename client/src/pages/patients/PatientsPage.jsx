

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "../../components/Layout";

// const PatientsPage = () => {
//     const [patients, setPatients] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchPatients = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const res = await axios.get("http://localhost:8000/api/users/mypatients", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setPatients(res.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch patients");
//                 setLoading(false);
//             }
//         };

//         fetchPatients();
//     }, []);

//     return (
//         <Layout>
//             <h2 style={{ marginBottom: "1rem" }}>👩‍⚕️ Patients Assigned to You</h2>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p style={{ color: "red" }}>{error}</p>
//             ) : (
//                 <table border="1" cellPadding="10">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {patients.map((patient, index) => (
//                             <tr key={patient._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{patient.name}</td>
//                                 <td>{patient.email}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </Layout>
//     );
// };

// export default PatientsPage;

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8000/api/users/mypatients", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch patients");
            } finally {
                setLoading(false); // moved to finally for guaranteed cleanup
            }
        };

        fetchPatients();
    }, []);

    return (
        <Layout>
            <h2 style={{ marginBottom: "1rem" }}>👩‍⚕️ Patients Assigned to You</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : patients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient._id}>
                                <td>{index + 1}</td>
                                <td>{patient.name}</td>
                                <td>{patient.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
};

export default PatientsPage;
