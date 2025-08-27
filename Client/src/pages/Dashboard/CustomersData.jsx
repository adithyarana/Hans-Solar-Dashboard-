import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../../components/customerdata/Filter";
import CreateLeadForm from "../../components/customerdata/CreateLeadForm";
import Dataheading from "../../components/customerdata/Dataheading";
import { GetCustomerData } from "../../constants/Apiurls";
import axios from "axios";

const CustomersData = () => {
  const [open, setOpen] = useState(false);
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
      <div className="flex justify-between gap-9">
        <div className=" bg-white w-full text-gray-600 font-medium   p-5 text-xl border border-gray-300 mt-5 ml-5">
          Customer Data
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center mr-6 rounded-xl text-nowrap cursor-pointer hover:opacity-80 transition-all  
        bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-5 mt-4 gap-1"
          >
            <span className=" text-2xl">+</span>Create New Lead
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
        </div>
      </div>

      <Filter />

      <Dataheading customerData={customerData?.customer} loading={loading} />
    </>
  );
};

export default CustomersData;
