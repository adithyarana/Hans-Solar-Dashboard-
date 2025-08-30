import React from "react";
import { useSelector } from "react-redux";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const user = useSelector((state) => state.userdata?.user);
  console.log("user data", user);

  return (
    <div className="px-4 py-3 flex  items-center  mr-9 justify-end w-[85vw] ">
      <div className="text-lg px-3 text-gray-700 font-semibold ">{user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}</div>
      <IoPersonCircleSharp className="text-orange-500" size={35} />
    </div>
  );
};

export default Navbar;
