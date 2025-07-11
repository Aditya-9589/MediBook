import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && (!user.role || !allowedRoles.includes(user.role))) {
        return <p>Unauthorized Access</p>;
    }

    return children;
};

export default PrivateRoute;
