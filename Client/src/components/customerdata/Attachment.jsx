import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaPaperclip } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { TiAttachmentOutline } from "react-icons/ti";
import UploadAttachments from "./UploadAttachments";
import { useParams } from "react-router-dom";
import useCreateAttachments from "../../Hooks/CreateAttachments/useCreateAttachments.jsx";

const AttachmentsSection = ({ attachments }) => {

  const {id} = useParams();
  console.log("id",id)
  const [isOpen, setIsOpen] = useState(false);
  const [Openfolder , setOpenFolder] = useState(false);
  const {CreateFolder} = useCreateAttachments(id);

  return (
<>
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
          Attachments
        </span>
      </button>

      <div
        className={` ${
          isOpen ? "py-6 max-h-[500px]" : "max-h-0 py-0"
        }`}
      >
        <div className="flex justify-end px-5">
        <button onClick={() => setOpenFolder(true)} className=" cursor-pointer bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded">
          <span className="font-semibold flex items-center gap-1"><span><TiAttachmentOutline size={20} className="mr-2" /></span>Upload Attachments</span>
        </button>

        {Openfolder && (
          <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/40 backdrop-blur-sm">
            <UploadAttachments close={setOpenFolder} CreateFolder={CreateFolder}/>
          </div>
        )}
        </div>

        {/* // folder structure in the 2 grop wise when admin create the folder it shows here  */}
       
      </div>

    </div>

</>
  );
};

export default AttachmentsSection;
