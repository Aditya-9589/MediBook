import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import PrivateRoute from "./components/PrivateRoute";

// (Optional) mock placeholder pages
import AppointmentsPage from "./pages/appointments/AppointmentsPage";
import PatientsPage from "./pages/patients/PatientsPage";
import UsersPage from "./pages/users/UsersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes by role */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["admin", "doctor", "patient"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <PrivateRoute allowedRoles={["patient"]}>
              <AppointmentsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute allowedRoles={["doctor"]}>
              <PatientsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route 
          path="/book" 
          element={
            <PrivateRoute>
              <BookAppointmentPage />
            </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
