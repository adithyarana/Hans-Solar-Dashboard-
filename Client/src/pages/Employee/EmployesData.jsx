import React, { useState } from "react";
import EmployeeForm from "../../components/Employee/EmployeeForm";
import EmployesRowData from "../../components/Employee/EmployesRowData";
import useGetEmployee from "../../Hooks/EmployeeApiHooks/useGetEmployee.jsx";

const EmployesData = () => {
  const [open, setOpen] = useState(false);
  const {employeeData , loading , refetch} = useGetEmployee()
  console.log("employeeData", employeeData);
  return (
    <>
    <div className="flex gap-3">
      <div className=" bg-white w-full text-gray-600 font-medium   p-5 text-xl border border-gray-300 mt-5 ml-5">
        Employes Data
      </div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center mr-6 rounded-xl text-nowrap cursor-pointer hover:opacity-80 transition-all  
        bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-3 py-5 mt-4 gap-1"
      >
        <span className=" text-2xl">+</span>Create New Employee
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
            <EmployeeForm close={setOpen} refetch={refetch} />
          </div>
        
      )}
    </div>

    <div>
       <EmployesRowData employeeData={employeeData} loading={loading} refetch={refetch}/>
    </div>
    </>
    
  );
};

export default EmployesData;
