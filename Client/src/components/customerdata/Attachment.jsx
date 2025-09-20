import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const AttachmentsSection = ({ attachments }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" rounded-lg shadow border border-gray-200  bg-white overflow-hidden mb-4">
      <button
        className="flex items-center justify-between cursor-pointer w-full px-5 py-4 font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {" "}
          <IoIosArrowForward
            size={20}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-90 text-orange-500" : "text-gray-500"
            }`}
          />
          Attachments ({attachments.length})
        </span>
      </button>

      <div
        className={`grid grid-cols-3 gap-x-10 gap-y-4 px-6 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "py-6 max-h-[500px]" : "max-h-0 py-0"
        }`}
      >
        <div className="col-span-2">
          {attachments.length > 0 ? (
            <ul className="space-y-3">
              {attachments.map((file, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <FaPaperclip className="text-gray-500" />
                    <a
                      href={file}
                      target="_blank"
                      rel="noreferrer"
                      className=""
                    >
                      <span className="flex items-center gap-2">
                        {" "}
                        <span className="text-gray-500 no-underline">
                          Attachment
                        </span>{" "}
                        {i + 1} <FaEye className="text-orange-500" size={26} />
                      </span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No attachments available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentsSection;
