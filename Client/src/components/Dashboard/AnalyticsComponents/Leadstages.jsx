import React from "react";
import PriorityChart from "./PriorityChart";
import { useNavigate } from "react-router-dom";

const Leadstages = ({data,loading , prioritydata}) => {
  const navigate = useNavigate();
  // Example data (replace with your backend data)
  const{NEW_LEAD,IN_PROCESS,QUALIFIED,SITE_VISIT_SCHEDULE,SITE_VISIT_DONE,ESTIMATE_SENT,NEGOTIATION,LEAD_LOST,ON_HOLD,LEAD_WON} = data|| {};

  const leadstagesData = [
    { label: "New Lead", value: NEW_LEAD, color: "border-blue-500", key:"NEW_LEAD" },
    { label: "In Process", value: IN_PROCESS, color: "border-yellow-500", key:"IN_PROCESS" },
    { label: "Qualified", value: QUALIFIED, color: "border-green-500", key:"QUALIFIED" },
    { label: "Site Visit Scheduled", value: SITE_VISIT_SCHEDULE, color: "border-purple-500", key:"SITE_VISIT_SCHEDULE" },
    { label: "Site Visit Done", value: SITE_VISIT_DONE, color: "border-indigo-500", key:"SITE_VISIT_DONE" },
    { label: "Estimate Sent", value: ESTIMATE_SENT, color: "border-teal-500", key:"ESTIMATE_SENT" },
    { label: "Negotiation", value: NEGOTIATION, color: "border-orange-500", key:"NEGOTIATION" },
    { label: "Lead Lost", value: LEAD_LOST, color: "border-gray-500", key:"LEAD_LOST" },
    { label: "On Hold", value: ON_HOLD, color: "border-pink-500", key:"ON_HOLD" },
    { label: "Lead Won", value: LEAD_WON, color: "border-green-500", key:"LEAD_WON" },
  
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Lead Stages */}
      <div className=" z-30 w-full lg:w-1/2 shadow-xl rounded-lg p-4 h-[350px] overflow-y-auto">
        <h2 className="text-md font-semibold text-gray-600 mb-4">
          Lead Stages 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-2">
          {leadstagesData.map((item, idx) => (
            <div
              key={idx}
              className={`bg-gray-50 cursor-pointer flex flex-col justify-center items-center h-[100px] border-l-4 ${item.color} rounded-lg shadow`}
              onClick={()=>navigate(`/dashboard/customers?page=1&limit=15&leadStage=${item.key}`)}
            >
              <p className="text-gray-600 font-semibold text-md">{item.label}</p>
              <p className="text-blue-600 font-semibold text-lg">{loading ? (
                <span className="inline-block w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
              ) : (
                item.value || "0"
              )}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Chart */}
      <div className="w-full lg:w-1/2">
        <div className=" rounded-lg p-4 h-[350px] overflow-hidden">
          <PriorityChart data={prioritydata}/>
        </div>
      </div>
    </div>
    
  );
};

export default Leadstages;
