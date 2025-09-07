import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { stageColors } from "../../constants/Apiurls";


const LeadInformation = ({ lead }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl shadow w-[80vw] bg-white overflow-hidden transition-all duration-300">
      {/* Header with dropdown toggle */}
      <button
        className="flex items-center justify-between cursor-pointer  px-5 py-4 w-[80vw] font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Lead Information</span>
        <IoIosArrowForward
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90 text-orange-500" : "text-gray-500"
          }`}
        />
      </button>

      {/* Expandable Content */}
      <div
        className={`grid grid-cols-3 gap-x-10 gap-y-4 px-6 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "py-6 max-h-[500px]" : "max-h-0 py-0"
        }`}
      >
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-gray-800 font-medium">{lead.name || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lead Stage</p>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded ${
              stageColors[lead.leadStage] || "bg-gray-100 text-gray-700"
            }`}
          >
            {lead.leadStage || "New Lead"}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone no</p>
          <p className="text-gray-800 font-medium">{lead.phoneNumber || "-"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Whatsapp no</p>
          <p className="text-gray-800 font-medium">
            {lead.whatsappNumber || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Source</p>
          <p className="text-gray-800 font-medium">{lead.infoSource || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Notes</p>
          <p className="text-gray-800 font-medium">{lead.notes || "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Follow Up</p>
          <p className="text-gray-800 font-medium">{lead.followUp ? lead.followUp.split("T")[0] : "-"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Work Category</p>
          <p className="text-gray-800 font-medium">{lead.workCategory || "-"}</p>
        </div>

       <div>
        <p className="text-sm text-gray-500">Progress Board</p>
        <p className="text-gray-800 font-medium">{lead.progressBoard || "-"}</p>
       </div>

       <div>
        <p className="text-sm text-gray-500">State </p>
        <p className="text-gray-800 font-medium">{lead.location?.state || "-"}</p>
       </div>

       <div>
        <p className="text-sm text-gray-500">District </p>
        <p className="text-gray-800 font-medium">{lead.location?.district || "-"}</p>
       </div>
       <div>
        <p className="text-sm text-gray-500">Tehsil </p>
        <p className="text-gray-800 font-medium">{lead.location?.tehsil || "-"}</p>
       </div>
       <div>
        <p className="text-sm text-gray-500">Village </p>
        <p className="text-gray-800 font-medium">{lead.location?.village || "-"}</p>
       </div>
       
        
      </div>
    </div>
  );
};

export default LeadInformation;
