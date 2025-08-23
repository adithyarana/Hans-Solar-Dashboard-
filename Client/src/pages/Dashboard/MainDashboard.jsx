import React from "react";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const user = useSelector((state) => state.userdata?.user);

  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-2xl w-full">
        {/* Welcome Text */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          <span className="text-orange-500">Welcome to</span>{" "}
          {user.role === "ADMIN" ? "Admin Dashboard" : "Employee Dashboard"}
        </h1>

        {/* User Name Highlight */}
        <p className="text-2xl font-semibold text-gray-700">
          Glad to see you,{" "}
          <span className="text-orange-500 font-bold">{user.name}</span> 👋
        </p>

        {/* Subtext */}
        <p className="mt-4 text-lg text-gray-500">
          Manage your tasks and explore insights easily from here.
        </p>

        {/* Animated underline for style */}
        <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default MainDashboard;
