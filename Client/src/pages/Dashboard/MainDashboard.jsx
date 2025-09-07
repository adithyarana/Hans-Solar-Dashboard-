import React from "react";
import { useSelector } from "react-redux";

const MainDashboard = () => {
  const user = useSelector((state) => state.userdata?.user);

  return (
    <>
      <div className="flex items-center justify-center h-full  p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-2xl w-full">
          {/* Welcome Text */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            <span className="text-orange-500">Welcome to</span>{" "}
            {user.role === "ADMIN" ? "Admin Dashboard" : ""}
            {user.role === "RECEPTIONIST" ? "Receptionist Dashboard" : ""}
            {user.role === "EMPLOYEE" ? "Employee Dashboard" : ""}
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

      {/* Bottom wave flipped */}
      <div className="absolute bottom-0 left-0 mb-1 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 transform rotate-180"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-orange-500/20"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default MainDashboard;
