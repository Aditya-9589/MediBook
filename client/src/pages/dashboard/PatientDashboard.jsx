import React from "react";

const PatientDashboard = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    // TEMP PATCH - if missing fields, simulate them
    if (user && !user.email) {
        user = {
            ...user,
            email: "demo@example.com",
            _id: "TEMP123456",
            createdAt: new Date().toISOString(),
        };
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl mt-6">
            <div className="md:flex">
                <div className="md:shrink-0 flex items-center justify-center bg-gray-100 p-4">
                    <img
                        className="h-32 w-32 object-cover rounded-full border"
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
                        alt="Patient Avatar"
                    />
                </div>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-blue-700 mb-2">{user.name}</h2>
                    <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {user.email}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Role:</strong> {user.role}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>User ID:</strong> {user._id}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Registered:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
