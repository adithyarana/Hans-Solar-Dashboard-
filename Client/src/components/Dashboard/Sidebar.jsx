import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoutUser } from "../../utils/UserSlice";
import { toast } from "react-toastify";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuUsers, LuUser } from "react-icons/lu";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userdata?.user);

  if (!user) return null;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    dispatch(LogoutUser());
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <div
      className={`shadow-xl flex flex-col justify-between h-screen transition-all duration-300 bg-white
        ${!toggle ? "w-[5vw]" : "w-[14vw]"}`}
    >
      <div>
        <div className="p-3 flex justify-between items-center">
          <IoReorderThreeOutline
            size={28}
            onClick={handleToggle}
            className="cursor-pointer text-gray-700 hover:text-orange-500 transition-colors"
          />
        </div>

        {toggle && (
          <div className="flex justify-center items-center mb-6">
            <img src="/LoginBanner.png" alt="Logo" className="w-50 " />
          </div>
        )}

        <div className="flex flex-col gap-6 px-3">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
               ${
                 isActive
                   ? "bg-orange-100 text-orange-500 font-semibold"
                   : "text-gray-600 hover:bg-gray-100"
               }`
            }
          >
            <AiOutlineDashboard size={22} />
            {toggle && "Dashboard"}
          </NavLink>

          <NavLink
            to="/dashboard/customers"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
               ${
                 isActive
                   ? "bg-orange-100 text-orange-500 font-semibold"
                   : "text-gray-600 hover:bg-gray-100"
               }`
            }
          >
            <LuUsers size={22} />
            {toggle && "Customers"}
          </NavLink>

          <NavLink
            to="/dashboard/employees"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
               ${
                 isActive
                   ? "bg-orange-100 text-orange-500 font-semibold"
                   : "text-gray-600 hover:bg-gray-100"
               }`
            }
          >
            <LuUser size={22} />
            {toggle && "Employees"}
          </NavLink>
        </div>
      </div>

      <div className="mb-5 px-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-all"
        >
          <FiLogOut size={22} />
          {toggle && "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
