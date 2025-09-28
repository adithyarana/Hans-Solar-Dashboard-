import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoutUser } from "../../utils/UserSlice";
import { toast } from "react-toastify";
import { AiOutlineDashboard } from "react-icons/ai";
import { LuUsers, LuUser } from "react-icons/lu";
import { IoReorderThreeOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { IoPersonSharp } from "react-icons/io5";
import { motion } from "framer-motion";

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
      className={`shadow-xl flex flex-col justify-between h-screen  transition-all duration-500 ease-in bg-white
        ${!toggle ? "w-[5vw]" : "w-[14vw]"}`}
    >
      <div>
        <div className="p-3 flex transition-all duration-300 ease-in-out justify-between items-center">
          <IoReorderThreeOutline
            size={28}
            onClick={handleToggle}
            className="cursor-pointer  text-gray-700 hover:text-orange-500 transition-colors"
          />
        </div>

        {toggle && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center mb-6"
          >
            <img src="/LoginBanner.png" alt="Logo" className="w-50 " />
          </motion.div>
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: toggle ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {toggle && "Dashboard"}
            </motion.span>
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
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: toggle ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {toggle && "Leads"}
            </motion.span>
          </NavLink>

          {user.role === "ADMIN" && (
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
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: toggle ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {toggle && "Employes"}
              </motion.span>
            </NavLink>
          )}

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
       ${
         isActive
           ? "bg-orange-100 text-orange-500 font-semibold"
           : "text-gray-600 hover:bg-gray-100"
       }`
            }
          >
            <IoPersonSharp size={22} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: toggle ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {toggle && "Profile"}
            </motion.span>
          </NavLink>

          <div className="mb-5 ">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 w-full cursor-pointer rounded-lg text-orange-500 font-medium hover:opacity-90 transition-all"
            >
              <FiLogOut size={22} />
              {toggle && "Logout"}
            </button>
          </div>



        </div>
      </div>
    </div>
  );
};

export default Sidebar;
