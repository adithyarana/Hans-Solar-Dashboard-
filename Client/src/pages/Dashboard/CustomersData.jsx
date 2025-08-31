import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Filter from "../../components/customerdata/Filter";
import CreateLeadForm from "../../components/customerdata/CreateLeadForm";
import Dataheading from "../../components/customerdata/Dataheading";
import { GetCustomerData } from "../../constants/Apiurls";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import axios from "axios";

const CustomersData = () => {
  const [open, setOpen] = useState(false);
  const [filteropen, setFilterOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchCustomerData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(GetCustomerData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if we're coming back from a delete operation
    if (location.state?.shouldRefresh) {
      fetchCustomerData();
      // Clear the state to prevent unnecessary refetches
      window.history.replaceState({}, document.title);
    } else {
      fetchCustomerData();
    }
  }, [fetchCustomerData, location.state]);

  return (
    <>
      <div className="flex justify-between items-center  gap-4">
        <div className=" bg-white w-full  text-gray-600 font-medium   p-5 text-xl border border-gray-300 mt-5 ml-14">
          Customer Data
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center mr-6 rounded-xl text-nowrap cursor-pointer hover:opacity-80 transition-all  
        bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-2 mt-4 gap-1"
          >
            <span className=" text-2xl">
              <FaPlus />
            </span>
          </button>

          {open && (
            <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl overflow-y-auto p-6">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500 text-xl"
                >
                  ✕
                </button>

                <CreateLeadForm close={setOpen} onSuccess={fetchCustomerData} />
              </div>
            </div>
          )}

          {/* <Filter /> */}
          <div className="relative flex justify-end mr-12 mt-4">
            {/* Button */}
            <span
              onClick={() => setFilterOpen(!filteropen)}
              className="flex hover:opacity-80  bg-gradient-to-b from-orange-500 to-red-500 px-4 py-2 rounded-xl items-center gap-2 cursor-pointer"
            >
              <span className="text-lg text-white font-semibold">Filter</span>
              <FaFilter className="text-white" size={20} />
            </span>

          
      {/* Dropdown */}
      <div
        className={`absolute top-full mt-3 right-0 z-50 transform transition-all duration-300 ease-in-out ${
          filteropen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <Filter leaddata={customerData?.customer} />
      </div>
          </div>
        </div>
      </div>

      <Dataheading customerData={customerData?.customer} loading={loading} />
    </>
  );
};

export default CustomersData;
