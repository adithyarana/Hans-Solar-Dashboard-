import React, { useState } from "react";
import Filter from "../../components/customerdata/Filter";
import CreateLeadForm from "../../components/customerdata/CreateLeadForm";

const CustomersData = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between py-2 px-4">
      <div>
        <Filter />
      </div>

      <button
        onClick={() => setOpen(true)}
        className="flex items-center rounded-xl cursor-pointer hover:opacity-80 transition-all  
        bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-2 gap-1"
      >
        <span className="text-2xl">+</span>Create New Lead
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

            <CreateLeadForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersData;
