import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineSmartphone } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import useDeleteLead from "../../Hooks/useDelateLead";
import { toast } from "react-toastify";
import DeletePopup from "../../components/customerdata/DelatePopup";
import {useSelector} from "react-redux"
import CreateLeadForm from "../../components/customerdata/CreateLeadForm";
import useGetCustomerDataById from "../../Hooks/usegetcustomerdatabyId";

const stageColors = {
  NEW_LEAD: "bg-blue-100 text-blue-700",
  IN_PROCESS: "bg-yellow-100 text-yellow-700",
  QUALIFIED: "bg-green-100 text-green-700",
  SITE_VISIT_SCHEDULED: "bg-red-100 text-red-700",
  SITE_VISIT_DONE: "bg-red-100 text-red-700",
  ESTIMATE_SENT: "bg-red-100 text-red-700",
  NEGOTIATION: "bg-red-100 text-red-700",
  LEAD_LOST: "bg-red-100 text-red-700",
  ON_HOLD: "bg-red-100 text-red-700",
  LEAD_WON: "bg-red-100 text-red-700",
};

const CustomerDetailsPage = () => {
  const [lead, setlead] = useState([]);
  const [open, setopen] = useState(false);
  const [OpenEdit , setOpenEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userdata?.user);


  const { customerdatabyid, loading, refetch } = useGetCustomerDataById(id);
  const { Apicall } = useDeleteLead();
  

  useEffect(() => {
    if (customerdatabyid) {
      setlead(customerdatabyid?.customer);
    }
  }, [customerdatabyid]);

  const data = lead;

  const handleDelete = async () => {
    try {
      await Apicall(id);
      toast.success("Lead Deleted Successfully");
      navigate("/dashboard/customers", { state: { shouldRefresh: true } });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete lead. Please try again."
      );
    }
  };



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

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="bg-white border border-gray-50 shadow h-[300px] w-[80vw] ml-14">
          <div className="flex gap-3 justify-between p-3 ">
            {/* image and name */}
            <div className="flex ">
              {data?.images?.length > 0 ? (
                <img
                  className="w-[150px] h-[150px] rounded-full object-cover bg-gray-200 mt-8 ml-8"
                  src={data?.images[0]}
                  alt={data?.name}
                />
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-gray-200 mt-16 ml-8 flex items-center justify-center">
                  <p className="text-3xl font-serif  text-black">
                    {data?.name?.[0]?.toUpperCase()}
                  </p>
                </div>
              )}
              <div className="flex flex-col mt-8 ml-8">
                <p className="text-2xl font-semibold text-gray-600 ">
                  {data?.name}
                </p>
                <p className="text-gray-600 mt-1 flex gap-1 items-center">
                  <IoLocationOutline size={16} />
                  {data?.location?.state || "India"}
                </p>
                <p className="text-gray-600 mt-1 flex gap-1 items-center">
                  <MdOutlineSmartphone size={16} />
                  <span>+91</span>
                  {data?.phoneNumber}
                </p>

                <div className="flex gap-14">
                  <div className="flex flex-col">
                    <h3 className="text-gray-800 mt-5 text-md  font-semibold">
                      Lead Source
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {data?.infoSource || "Manually"}
                    </p>
                    <p className="text-black mt-1 text-sm">
                      <span className="text-gray-600 ">Lead Created on</span>{" "}
                      {new Date(data?.createdAt)
                        .toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", "")}
                    </p>
                  </div>
                  {/* line in middle small */}
                  <div className="w-[1px] h-[100px] bg-gray-300"></div>
                  <div className="flex flex-col ">
                    <h3 className="text-gray-800 mt-5 text-md  font-semibold">
                      Lead Stage
                    </h3>
                    <p className="text-gray-600 mt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          stageColors[data?.leadStage] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {data?.leadStage || "New Lead"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* buttons  */}
            <div className="flex gap-3 h-[50px] w-full]">
              <button onClick={()=>setOpenEdit(true)}
               className="px-3 py-2 flex gap-1  items-center cursor-pointer hover:opacity-80 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                <MdModeEditOutline size={20} /> <span>Edit</span>
              </button>

            {OpenEdit && (
            <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl overflow-y-auto p-6">
                <button
                  onClick={() => setOpenEdit(false)}
                  className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-red-500 text-xl"
                >
                  ✕
                </button>

                <CreateLeadForm closeedit={setOpenEdit} id={id} initialData={data}   onSuccessId={refetch} />
              </div>
            </div>
          )}

          {user.role ==="ADMIN" && (
            <button
                onClick={() => setopen(true)}
                className="px-3 cursor-pointer hover:opacity-80 py-2 flex gap-1 items-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold"
              >
                <MdDeleteOutline size={20} /> <span>Delete</span>
              </button>
          )}

              {open && (
                <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
                  <DeletePopup close={setopen} onSuccess={handleDelete} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDetailsPage;
