import React from "react";
import { IoMdCloudDownload } from "react-icons/io";
import usegetcustomerdata from "../../Hooks/usegetcustomerdata";
import { useNavigate } from "react-router-dom";

const stageColors = {
  "New": "bg-blue-100 text-blue-700",
  "In Progress": "bg-yellow-100 text-yellow-700",
  "Follow Up": "bg-purple-100 text-purple-700",
  "Closed": "bg-green-100 text-green-700",
  "Lost": "bg-red-100 text-red-700",
};

const Dataheading = () => {
  const navigate = useNavigate();
  const { customerdata , loading} = usegetcustomerdata();
  console.log("customerdata", customerdata);




  return (
    <div className="rounded-lg overflow-x-auto ml-7 h-screen styled-scrollbar">
      <table className="min-w-max bg-orange-50 rounded-2xl text-md border-separate border-spacing-x-10 border-spacing-y-3 w-full">
        {/* Table Head */}
        <thead className=" sticky  top-0 z-10 ">
          <tr className="text-gray-800 font-medium ">
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Customer ID</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Name</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Phone Number</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">WhatsApp Number</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Interest Areas</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Address</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">DOB</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Info Source</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Notes</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Follow Up</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Work Category</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Start Date</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Lead Stage</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Priority</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Progress Board</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">State</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">District</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Tehsil</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Village</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Images</th>
            <th className="px-4 py-2 sticky top-0 bg-orange-200 rounded-2xl z-10 text-left">Attachments</th>
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
          ) : customerdata?.customer?.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-white transition border-b cursor-pointer border-gray-300"
              onClick={() => navigate(`/dashboard/customers/${item.id}`)}
            >
              <td className="px-4 py-2">{item.customerId ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.name ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.phoneNumber ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.whatsappNumber ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.interestAreas ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2 break-words truncate">{item.address ||<span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">
                {item.birthday ? item.birthday.split("T")[0] : <span className="text-gray-500 text-2xl text-center">-</span>}
              </td>
              <td className="px-4 py-2">{item.infoSource || "-"}</td>
              <td className="px-4 py-2">{item.notes || "-"}</td>
              <td className="px-4 py-2">
                {item.followUp ? item.followUp.split("T")[0] : <span className="text-gray-500 text-2xl text-center">-</span>}
              </td>
              <td className="px-4 py-2">{item.workCategory || "-"}</td>
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

              <td className="px-4 py-2">{item.priority || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.progressBoard || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.state || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.district || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.tehsil || <span className="text-gray-500 text-2xl text-center">-</span>}</td>
              <td className="px-4 py-2">{item.village || <span className="text-gray-500 text-2xl text-center">-</span>}</td>

              {/* Images with download button */}
              <td className="px-4 py-2">
                {item.images ? (
                  <a
                    href={item.images}
                    download
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  >
                    <IoMdCloudDownload size={16} />
                    <span>Download</span>
                  </a>
                ) : (
                  <span className="text-gray-500 text-2xl text-center">-</span>
                )}
              </td>

              {/* Attachments with download button */}
              <td className="px-4 py-2">
                {item.attachments ? (
                  <a
                    href={item.attachments}
                    download
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                  >
                    <IoMdCloudDownload size={16} />
                    <span>Download</span>
                  </a>
                ) : (
                  <span className="text-gray-500 text-2xl text-center">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dataheading;
