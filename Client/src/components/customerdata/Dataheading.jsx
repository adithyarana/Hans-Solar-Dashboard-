import React from "react";
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";

const stageColors = {
  "NEW_LEAD": "bg-blue-100 text-blue-700",
  "IN_PROCESS": "bg-yellow-100 text-yellow-700",
  "QUALIFIED": "bg-green-100 text-green-700",
  "SITE_VISIT_SCHEDULE": "bg-red-100 text-red-700",
  "SITE_VISIT_DONE": "bg-red-100 text-red-700",
  "ESTIMATE_SENT": "bg-red-100 text-red-700",
  "NEGOTIATION": "bg-red-100 text-red-700",
  "LEAD_LOST": "bg-red-100 text-red-700",
  "ON_HOLD": "bg-red-100 text-red-700",
  "LEAD_WON": "bg-red-100 text-red-700",

};

 const Prioritycolor ={
  "LOW": "bg-red-100 text-red-700",
  "MEDIUM": "bg-yellow-100 text-yellow-700",
  "HIGH": "bg-green-100 text-green-700",
 }

const Dataheading = ({ customerData, loading }) => {
  const navigate = useNavigate();

  if(!customerData || customerData.length === 0){
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600  text-2xl">No data available</p>
      </div>
    )
  }

  return (
    <>
    <div className="rounded-lg overflow-x-auto ml-7 h-screen styled-scrollbar">
      <table className="min-w-max  shadow  rounded-2xl text-md border-separate border-spacing-x-10 border-spacing-y-3 w-full">
        {/* Table Head */}
        <thead className=" sticky  top-0 z-10 ">
          <tr className="text-gray-800 font-medium ">
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Customer ID</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Name</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Phone Number</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">WhatsApp Number</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Interest Areas</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Address</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">DOB</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Lead Source</th>
            {/* <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Notes</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Follow Up</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Work Category</th> */}
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Start Date</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Lead Stage</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Priority</th>
            {/* <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Progress Board</th> */}
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">State</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">District</th>
            {/* <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Tehsil</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Block</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Village</th> */}
            <th className="px-4 py-2 sticky top-0 bg-orange-500 text-white rounded-2xl z-10 text-left">Lead Photo</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={20} className="text-center py-5">
                <div className="animate-spin  rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </td>
            </tr>
          ) : customerData?.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-orange-100 transition border-b cursor-pointer border-gray-300"
              onClick={() => navigate(`/dashboard/customers/${item.id}`)}
            >
              <td className="px-4 py-2 font-semibold">{item.customerId ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.name ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.phoneNumber ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.whatsappNumber ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.interestAreas ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2 break-words truncate">{item.address ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">
                {item.birthday ? item.birthday.split("T")[0] : <span className="text-gray-500 text-2xl text-center">-</span>}
              </td>
              <td className="px-4 py-2">{item.infoSource || "-"}</td>
              {/* <td className="px-4 py-2">{item.notes || "-"}</td>
              <td className="px-4 py-2">
                {item.followUp ? item.followUp.split("T")[0] : <span className="text-gray-500 text-2xl text-center">-</span>}
              </td>
              <td className="px-4 py-2">{item.workCategory || "-"}</td> */}
              <td className="px-4 py-2">
                {item.startDate ? item.startDate.split("T")[0] : <span className="text-gray-500 text-2xl text-center">-</span>}
              </td>

              {/* Lead stage with badge */}
              <td className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    stageColors[item.leadStage] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.leadStage}
                </span>
              </td>

              <td className="px-4 py-2">
                <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${Prioritycolor[item.priority] || "bg-gray-100 text-gray-700"}`}>
                  {item.priority}
                </span>
              </td>

              {/* <td className="px-4 py-2">{item.progressBoard || <span className="text-gray-500 text-2xl text-center">-</span>}</td> */}
              <td className="px-4 py-2">{item.location?.state || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.location?.district || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              {/* <td className="px-4 py-2">{item.location?.tehsil || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.location?.block || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.location?.village || <span className="text-gray-500 text-2xl text-center">-</span>}</td> */}

              {/* Images with View button */}
              <td className="px-4 py-2 flex gap-3">
                {item.images ? (
                  <a
                    href={item.images}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <IoEyeSharp size={16} />
                    <span>View</span>
                  </a>
                
                ) : (
                  <span className="text-gray-500 text-2xl text-center">-</span>
                )}
              </td>

              {/* Attachments with View button */}
              {/* <td className="px-4 py-2">
                {item.attachments ? (
                  <a
                    href={item.attachments}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    <IoEyeSharp size={16} />
                    <span>View</span>
                  </a>
                ) : (
                  <span className="text-gray-500 text-2xl text-center">-</span>
                )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      {/* Bottom wave flipped */}
      <div className="absolute bottom-0 left-0 mb-1 w-full overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-20 transform rotate-180"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current text-orange-500/20"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default Dataheading;
