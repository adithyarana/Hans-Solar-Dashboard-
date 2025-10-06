import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import NotesViwer from "../../components/customerdata/NotesViwer";
import CreateHumForm from "../../components/Hum/CreateHumform";
import { useParams } from "react-router-dom";
import usegethumdatabyid from "../../Hooks/HUM/usegethumdatabyid";
import useDeleteHum from "../../Hooks/HUM/usedelete";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DeletePopup from "../../components/Employee/DeletePopup";


const HumDetailsPage = () => {
  const [OpenEdit, setOpenEdit] = useState(false);
  const [Opendelete , setOpendelete] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { humdatabyid, loading, refetch } = usegethumdatabyid(id);
  const { Apicall , loading:deleteloading }= useDeleteHum()

  const Humdata = humdatabyid;

  const handleDelete = async () => {
    try {
      await Apicall(id);
      toast.success("Hum deleted successfully");
      navigate("/dashboard/hum"); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete Hum");
    }
  };

  // Readonly Data
  const data = [
    {
      lable: "Full Name",
      value: Humdata?.name || "N/A",
      type: "text",
    },
    {
      lable: "Phone Number",
      value: Humdata?.phoneNumber || "N/A",
      type: "text",
    },
    {
      lable: "WhatsApp Number",
      value: Humdata?.whatsappNumber || "N/A",
      type: "text",
    },
    {
      lable: "DOB",
      value: Humdata?.birthday ? new Date(Humdata.birthday).toISOString().split("T")[0] : "N/A",
      type: "date",
    },
    {
      lable:"Lead Source",
      value:Humdata?.infoSource || "N/A",
      type:"text"
    },
    {
      lable:"Work Category",
      value:Humdata?.workCategory || "N/A",
      type:"text"
    },
    {
      lable:"Follow Up",
      value: Humdata?.followUp ? new Date(Humdata.followUp).toISOString().split("T")[0] : "N/A",
      type:"date"
    },
    {
      lable:"State",
      value:Humdata?.state || "N/A",
      type:"text"
    },
    {
      lable:"District",
      value:Humdata?.district || "N/A",
      type:"text"
    },
    {
      lable:"Tehsil",
      value:Humdata?.tehsil || "N/A",
      type:"text"
    },
    {
      lable:"Village",
      value:Humdata?.village || "N/A",
      type:"text"
    },
    {
      lable:"Aadhaar Number",
      value:Humdata?.aadhaarNumber || "N/A",
      type:"text"
    },
    {
      lable:"Pan Number",
      value:Humdata?.panNumber || "N/A",
      type:"text"
    },
  ];

  if(loading){
    return(
      <div>
        <div className="flex   items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }
  

  return (
    <div className=" flex flex-col items-center py-8 overflow-y-scroll styled-scrollbar">
      <div className="w-full max-w-7xl  bg-gray-50 rounded-2xl shadow-md border border-gray-200 p-8">
        {/* Profile Header */}
        <div className="flex w-full items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <CgProfile className="text-orange-500" size={80} />
            <div>
              <h2 className="text-2xl font-semibold">{Humdata?.name || "N/A"}</h2>
              <p className="text-gray-500 text-md">{Humdata?.email || "N/A"}</p>
            </div>
          </div>

          {/* buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setOpenEdit(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer hover:opacity-80 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Edit
            </button>
            <button onClick={()=>setOpendelete(true)} className="bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer hover:opacity-80 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Delete
            </button>

            {Opendelete && (
              <DeletePopup close={()=>setOpendelete(false)} onDelete={handleDelete} loading={deleteloading}/>
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

                  <CreateHumForm onSuccessId={refetch} closeedit={setOpenEdit} id={id} initialData={Humdata} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Readonly Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
        {data.map((item,index)=>(
          <div key={index}>
            <label className="block text-gray-600 mb-1">{item.lable}</label>
            <input
              type={item.type}
              value={item.value}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>
        ))}  
        </div>

      </div>
      <div className="mt-2  w-full px-18 py-5">
        <NotesViwer notesdata={Humdata || {}} />
      </div>
    </div>
  );
};

export default HumDetailsPage;
