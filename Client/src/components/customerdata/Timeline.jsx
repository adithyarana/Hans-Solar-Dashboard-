import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoCreateSharp } from "react-icons/io5";
import UpdatedData from "./UpdatedData";

const Timeline = ({ updatedTimeLine }) => {

  const [show , setshow] = useState(false)
  const [selectedUpdateIdx, setSelectedUpdateIdx] = useState(null);

  const OpenModal=(idx)=>{
    setSelectedUpdateIdx(idx)
    setshow(true)
  }

 
 
  return (
    <div className="shadow border border-gray-200 rounded w-full h-[450px] overflow-y-auto">
      <h2 className="text-xl font-semibold p-2 text-gray-600">Timeline</h2>
      <div className="flex flex-col p-3 relative">
        {/* timeline items */}
        { updatedTimeLine?.length===0 ? <p className=" flex justify-center items-center text-gray-600">No Timeline</p> : updatedTimeLine?.map((history, idx) => (
          <div key={idx} className="flex gap-4 relative">
            {/* left side with icon + line */}
            <div className="flex flex-col items-center">
              <div  className="bg-orange-200 p-2 rounded-full z-10">
               {history?.createdAt ? <IoCreateSharp size={20} className="cursor-pointer text-orange-500"/> : <MdModeEdit onClick={()=>OpenModal(idx)}  size={20} className="cursor-pointer text-orange-500"/>}
              </div>

       
              {/* line (only show if not last item) */}
              {idx !== updatedTimeLine.length - 1 && (
                <div className="w-[2px] bg-gray-300 flex-1 -mt-1"></div>
              )}
            </div>

            {/* right side content */}
            <div
              className={`flex flex-col gap-2 ${
                idx !== updatedTimeLine.length - 1 ? "pb-5" : ""
              }`}
            >
              <p className="text-gray-600 text-md font-semibold">
                {new Date(history?.createdAt || history?.updatedAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-gray-500 font-sans text-xs font-normal">
                  {history?.createdAt ? "Lead Created" : "Lead Updated"}
                </p>
                <p className="text-gray-400  gap-1 font-sans text-xs font-normal">
                 <div className="flex items-center gap-1">
                 <span><CgProfile size={12}/></span>
                 <span> {"by" + " " + history?.empId}</span>
                 </div>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
     
     {/* changes modale  */}
      {show && selectedUpdateIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <UpdatedData
            changes={updatedTimeLine[selectedUpdateIdx]?.changes}
            close={() => setshow(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Timeline;
