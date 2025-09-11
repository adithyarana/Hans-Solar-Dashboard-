import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import useDeleteEmploye from "../../Hooks/EmployeeApiHooks/useDeleteEmploye";
import { toast } from "react-toastify";
import DeletePopup from "./DeletePopup";
import EmployeeForm from "./EmployeeForm";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const EmployeesRowData = ({ employeeData, loading , refetch }) => {
  
  const [open, setOpen] = useState(false);
  const [openedit, setopenedit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const { Apicall } = useDeleteEmploye();

  if(!employeeData || employeeData.length === 0){
    return (
      <div className="flex justify-center mt-20 items-center h-full">
        <p className="text-gray-600 text-2xl">No employee data available ! </p>
      </div>
    )
  }

  const maskPassword = () => {
    return "********";
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    
    try {
      await Apicall(selectedEmployee.id);
      toast.success("Employee Deleted Successfully");
      setOpen(false);
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete employee. Please try again."
      );
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedEmployee(employeeData.find(emp => emp.id === id) || null);
    setOpen(true);
  };

  const openEditDialog = (emp) => {
    setSelectedEmployee(emp);
    setopenedit(true);
  };

  const closeEditDialog = () => {
    setopenedit(false);
    setSelectedEmployee(null);
  };

  const closeDeleteDialog = () => {
    setOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-b from-orange-500 to-red-500 text-white text-left">
              <th className="p-3 border-b">Emp Id</th>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Password</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-5">
                  <div className="animate-spin m-auto rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </td>
              </tr>
            ) : (
              employeeData?.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-3 font-semibold border-b border-gray-200">{emp.empid || "RECEP"}</td>
                  <td className="p-3 border-b border-gray-200">{emp.name}</td>
                  <td className="p-3 border-b border-gray-200">{emp.email}</td>
                  <td className="p-3 border-b flex gap-4 items-center text-lg border-gray-200">
                    {showPasswords[emp.id] ? emp.normalpass : maskPassword()} 
                    <span 
                      className="cursor-pointer mb-0.5" 
                      onClick={() => setShowPasswords(prev => ({
                        ...prev,
                        [emp.id]: !prev[emp.id]
                      }))}
                    >
                      {showPasswords[emp.id] ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </td>
                  <td className="p-3 border-b border-gray-200">{emp.role}</td>
                  <td className="p-3 border-b border-gray-200 flex justify-center gap-3">


                    {/* // edit popup */}
                    <button 
                      onClick={() => openEditDialog(emp)} 
                      className="px-4 py-3 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                    >
                      <MdEdit />
                    </button>

                    {/* // delete popup */}
                    <button
                      onClick={() => openDeleteDialog(emp.id)}
                      className="px-4 py-3 cursor-pointer rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      {openedit && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <EmployeeForm 
            closeedit={closeEditDialog} 
            initialData={selectedEmployee} 
            id={selectedEmployee.id} 
            refetcheditdata={refetch} 
          />
        </div>
      )}

      {/* Delete Popup */}
      {open && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <DeletePopup 
            close={closeDeleteDialog} 
            onDelete={handleDelete} 
          />
        </div>
      )}
    </div>
  );
};

export default EmployeesRowData;
