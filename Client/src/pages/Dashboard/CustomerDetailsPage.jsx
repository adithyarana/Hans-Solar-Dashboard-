import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import usegetcustomerdatabyId from "../../Hooks/usegetcustomerdatabyId";
import { IoIosArrowForward } from "react-icons/io";

const CustomerDetailsPage = () => {
  const { id } = useParams();

  const { customerdatabyid, loading } = usegetcustomerdatabyId(id);

  const data = customerdatabyid?.customer;
  console.log("data", data?.name);
  return (
    <>
    
        <div className="flex items-center gap-1  ml-14 mt-5">
          <NavLink to="/dashboard/customers">
            <span className="text-xl font-semibold text-gray-600">Leads</span>
          </NavLink>
          <span className="text-gray-600 mt-1">
            <IoIosArrowForward size={18} />
          </span>
          <NavLink
            className={({ isActive }) =>
              `text-xl font-semibold ${
                isActive ? "text-orange-500" : "text-gray-600"
              }`
            }
          >
            Details
          </NavLink>
        </div>

        <div className="bg-orange-50 shadow h-[300px] w-[80vw] ml-14">

        </div>
    
    </>
  );
};

export default CustomerDetailsPage;
