import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
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
import LeadInformation from "../../components/customerdata/LeadInformation";
import Attachment from "../../components/customerdata/Attachment";
import { stageColors } from "../../constants/Apiurls";
import Timeline from "../../components/customerdata/Timeline";



const CustomerDetailsPage = () => {
  const [lead, setlead] = useState([]);
  const [open, setopen] = useState(false);
  const [OpenEdit , setOpenEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userdata?.user);
  const location = useLocation();
  const currentpage = location.state?.page;
  const currentSearch = location.state?.search || "";


  const { customerdatabyid, loading, refetch } = useGetCustomerDataById(id);
  const { Apicall , loading:deleteloading } = useDeleteLead();
  

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
      if (currentSearch) {
        navigate(`/dashboard/customers${currentSearch}`, { state: { shouldRefresh: true } });
      } else {
        navigate(`/dashboard/customers?page=${currentpage || 1}`, { state: { shouldRefresh: true } });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete lead. Please try again."
      );
    }
  };




  return (
     <div className="overflow-y-scroll h-screen styled-scrollbar">
    
      <div className="flex items-center gap-2  ml-14 mt-5">
        <NavLink to={`/dashboard/customers${currentSearch}`}
        >
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
        <div className="flex   items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        // upper section
        <div className="bg-white border mt-5 border-gray-200 rounded shadow  h-[300px] w-[80vw] ml-14">
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
                  {data?.state || "India"}
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
             {user.role != "RECEPTIONIST" &&(
              <button onClick={()=>setOpenEdit(true)}
               className="px-3 py-2 flex gap-1  items-center cursor-pointer hover:opacity-80 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                <MdModeEditOutline size={20} /> <span>Edit</span>
              </button>
             )}

            {OpenEdit && (
            <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="relative bg-gray-50 w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl overflow-y-auto p-6">
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
                  <DeletePopup close={setopen} onSuccess={handleDelete} loading={deleteloading} />
                </div>
              )}
            </div>
          </div>
        </div>

      )}

<div className="flex ml-14 mt-5 gap-6">
  
  <div className="w-1/4">
    <Timeline updatedTimeLine={lead?.updateHistory} createdAt={lead?.createdAt} />
  </div>

  <div className="flex-1 w-[60vw] flex flex-col gap-6">
    <LeadInformation lead={data} />
    <Attachment attachments={data?.attachments || []} />
  </div>
</div>

    </div>
  );
};

export default CustomerDetailsPage;
