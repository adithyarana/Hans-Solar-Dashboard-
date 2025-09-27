import React from "react";
import { PiSpinnerLight } from "react-icons/pi";
import { FiDownload } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const FolderdataById = ({ data, loadingId, close }) => {
  if (!data) {
    return (
      <div className="col-span-2 text-center text-sm text-gray-500">
        No Folder data !
      </div>
    );
  }

// Handle file download
const handleDownload = async (fileUrl, index) => {
    try {
      const response = await fetch(fileUrl, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `attachment-${index + 1}${getFileExtension(fileUrl)}`; // nice filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(url); // cleanup
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  
  // Helper to extract extension
  const getFileExtension = (url) => {
    const parts = url.split(".");
    return parts.length > 1 ? "." + parts.pop().split(/\#|\?/)[0] : "";
  };

  const getFileNameFromUrl = (url) => {
    return url.split("/").pop().split("?")[0].split("#")[0];
  };
  

  return (
    <div className="w-[520px] flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-orange-500 text-2xl font-bold">📂 Attachments</h2>
        <button
          onClick={() => close()}
          className="text-gray-500 cursor-pointer hover:text-gray-800 transition"
        >
          <RxCross2 size={24} />
        </button>
      </div>

      {/* Loading Spinner */}
      {loadingId ? (
        <div className="flex justify-center items-center py-8">
          <PiSpinnerLight size={32} className="animate-spin text-gray-600" />
        </div>
      ) : (
        <>
          {/* Folder Info */}
          <div className="bg-orange-50 flex flex-col gap-1 border border-orange-200 w-full p-4 rounded-lg">
            <p className="text-sm text-gray-500 font-medium">
              Folder Name:{" "}
              <span className="text-gray-700 font-semibold">
                {data?.folderName}
              </span>
            </p>
            <p className="text-sm text-gray-500 font-medium ">
              Description:{" "}
              <span className="text-gray-700">{data?.description}</span>
            </p>
             
             {/* make format like this  27 Sept 2025 12:42 am */}
             <p className=" text-sm text-gray-500 font-medium ">
                      Folder Created on :
                      <span className="text-gray-700">
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
                      </span>
                    </p>
            <p className="text-sm text-gray-500 font-medium ">
              Attachment count : {" "}
              <span className="text-gray-700">{data?.attachmentsCount}</span>
            </p>
          </div>

          {/* Attachments List */}
          <div className="flex flex-col gap-3">
            {data?.attachments?.length > 0 ? (
              data.attachments.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-md transition"
                >
                  {/* File Preview & Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <img
                        src={file || "/placeholder.png"}
                        alt="File preview"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 truncate w-40">
                      { `Attachment-${index + 1}`}
                    </p>
                  </div>

                  {/* Action button */}
                  <button
                    onClick={() =>
                      handleDownload(file, index)
                    }
                    className="p-2 cursor-pointer rounded-lg bg-orange-100 hover:bg-orange-200 transition"
                  >
                    <FiDownload className="text-orange-600" size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-gray-500">
                No attachments found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FolderdataById;
