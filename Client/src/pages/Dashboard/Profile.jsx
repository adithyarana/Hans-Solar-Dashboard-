import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state)=>state.userdata?.user)

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
        {/* Profile Icon */}
        <FaUserCircle className="text-orange-500" size={80} />
        
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-500">{user.name.toUpperCase()}</h2>
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-3 mt-4">
        <p>
            <span className="font-semibold text-xl">Name : </span>{user.name}
        </p>
        <p className="text-gray-700 text-md">
          <span className="font-semibold text-xl">Email : </span>{user.email}
        </p>
        <p className="text-gray-700 text-md">
          <span className="font-semibold text-xl">Role : </span>{user.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
