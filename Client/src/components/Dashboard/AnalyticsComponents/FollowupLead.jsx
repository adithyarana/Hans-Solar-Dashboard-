import React from "react";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { stageColors } from "../../../constants/Apiurls.jsx";
import { useNavigate } from "react-router-dom";

const TodayFollowUps = ({ data = [] }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-gray-50 rounded-2xl p-5">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Today’s Follow Ups ({data.length})
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          🎉 No follow-ups for today!
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4">
          <div className="hidden md:flex text-xs uppercase tracking-wide text-gray-500 px-5">
            <div className="w-3/12 text-md font-semibold">Name</div>
            <div className="w-4/12 text-md font-semibold">leadStage</div>
            <div className="w-3/12 text-md font-semibold">Created By</div>
            <div className="w-2/12 text-md font-semibold text-nowrap">Follow Up Dates</div>
          </div>

          {data.map((lead, idx) => (
            <div
              key={idx}
              onClick={()=>navigate(`/dashboard/customers/${lead.id}`)}
              className="flex  cursor-pointer flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 bg-gray-50 md:bg-transparent rounded-xl md:rounded-none p-4 md:p-0 border border-gray-100 md:border-0 hover:bg-orange-100 transition"
            >
              <div className="flex w-full md:w-3/12 items-center gap-2">
                <FaUser className="text-orange-500 shrink-0" />
                <div className="flex-1 text-gray-800 font-medium">{lead.name}</div>
              </div>

              
              <div className="flex w-full md:w-4/12 items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${stageColors[lead.leadStage] || "bg-gray-100 text-gray-700"}`}
                  title={lead.leadStage || "No leadStage"}
                >
                  {lead.leadStage || "No leadStage"}
                </span>
              </div>
              <div className="flex w-full md:w-3/12 items-center gap-2 text-gray-600">
                <span className="truncate" title={lead.createdByEmpId || "Admin"}>
                  {lead.createdByEmpId || "Admin"}
                </span>
              </div>

              <div className="flex w-full md:w-2/12 items-center gap-2 text-orange-600 font-semibold">
                <FaCalendarAlt className="text-orange-500 shrink-0" />
                <span className="text-nowrap">{new Date(lead.followUp).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                 
                })}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayFollowUps;
