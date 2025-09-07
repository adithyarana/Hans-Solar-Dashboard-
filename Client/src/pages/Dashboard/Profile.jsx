import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state)=>state.userdata?.user)
    const [showpass , setShowpass] = useState(false)

    const maskPassword = () => {
        return "********";
    };

  return (
    <>
    <div className="p-6">
      <div className="flex items-center gap-4 border-b border-gray-300 pb-4">
        {/* Profile Icon */}
        <FaUserCircle className="text-orange-500" size={80} />
        
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-500">{user.name.toUpperCase()}</h2>
      </div>

      {/* User Details */}
      <div className="flex flex-col gap-9 mt-4">
       {user.role ==="EMPLOYEE" && (
        <p className="text-gray-700 text-md">
          <span className="font-semibold text-xl">EmpId : </span> <span className="border border-gray-400 p-2 rounded-lg">{user.empid}</span>
        </p>  
       )}
        <p className="text-gray-700 text-md">
            <span className="font-semibold text-xl">Name : </span> <span className="border border-gray-400 p-2 rounded-lg">{user.name}</span>
        </p>
        <p className="text-gray-700 text-md">
          <span className="font-semibold text-xl">Email : </span> <span className="border border-gray-400 p-2 rounded-lg">{user.email}</span>
        </p>
        <p className="text-gray-700 text-md flex gap-2 items-center ">
          <span className="font-semibold text-xl">Password : </span> <span onClick={()=>setShowpass(!showpass)} className="p-2 border border-gray-400 rounded-lg cursor-pointer">{showpass ? user.normalpass : maskPassword()}</span>
          <span className="cursor-pointer mb-0.5" onClick={() => setShowpass(!showpass)}>{showpass ? <FaEye /> : <FaEyeSlash />}</span>
        </p>
        <p className="text-gray-700 text-md">
          <span className="font-semibold text-xl">Role : </span> <span className="border border-gray-400 p-2 rounded-lg">{user.role}</span>
        </p>
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

export default Profile;
