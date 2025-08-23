import React from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const user = useSelector((state) => state.userdata?.user);
  console.log("user data", user);
  return (
    <div className="px-4 py-3 flex gap-2 mr-9 justify-end w-[85vw] ">
      <div className="text-lg px-3 text-white font-semibold rounded-full bg-gradient-to-r from-orange-500 to-red-500">{user.name}</div>
      <FaRegCircleUser size={30} />
    </div>
  );
};

export default Navbar;
