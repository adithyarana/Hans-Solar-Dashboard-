import React from "react";
import { RxCross2 } from "react-icons/rx";
import { data } from "react-router-dom";

const FormateDate = (datestring) => {
  if (!datestring) return "";
  try {
    return new Date(datestring).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return datestring; // fallback if invalid date
  }
};

const UpdatedData = ({ changes, close }) => {
  if (
    !changes ||
    typeof changes !== "object" ||
    Object.keys(changes).length === 0
  ) {
    return (
      <div className="p-6 bg-white rounded-xl shadow max-w-md mx-auto text-center">
        <span className="text-gray-400 text-lg font-semibold">
          No updates available
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 rounded-xl h-[400px] overflow-y-scroll styled-scrollbar shadow-lg max-w-md mx-auto font-sans">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl mb-6 text-gray-500 tracking-wide">
          Recent Changes
        </h2>
        <RxCross2
          className="cursor-pointer hover:text-orange-400"
          onClick={() => close(false)}
          size={20}
        />
      </div>

      {Object.entries(changes)
        .map(([field, { old, new: newVal }]) => {
          if (field === "notes") {
            return (
              <div
                key={field}
                className="mb-5 p-4 rounded-lg bg-gray-50 shadow-sm "
              >
                <div className="text-base font-semibold text-gray-700 capitalize">
                  Notes
                </div>
                <div className="mt-3">
                  <span className="text-blue-700 font-semibold flex justify-center items-center w-[300px] bg-blue-50 px-2 py-1 rounded-md text-sm">
                    Notes updated
                  </span>
                </div>
              </div>
            );
          }
          const formattedOld =
            field === "birthday" || field === "startDate" || field === "followUp"
              ? FormateDate(old)
              : old || "New Created";

          const formattedNew =
            field === "birthday" || field === "startDate" || field === "followUp"
              ? FormateDate(newVal)
              : newVal;

          return (
            <div
              key={field}
              className="mb-5 p-4 rounded-lg bg-gray-50 shadow-sm "
            >
              <div className="text-base font-semibold text-gray-700 capitalize">
                {field}
              </div>
              <div className="flex items-center mt-3">
                <span className="text-red-600 font-semibold bg-red-50 px-2 py-1 rounded-md text-sm min-w-[100px] text-center">
                  {formattedOld}
                </span>
                <span className="mx-4 text-blue-400 font-bold text-lg">→</span>
                <span className="text-green-700 font-semibold bg-green-50 px-2 py-1 rounded-md text-sm min-w-[100px] text-center">
                  {formattedNew}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UpdatedData;
