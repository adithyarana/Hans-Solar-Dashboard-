import axios from "axios";
import React, { useState } from "react";
import { PostBulkUpload } from "../constants/Apiurls";
import { toast } from "react-toastify";


const useBulkupload = () => {
  const [file, setfile] = useState(null);
  const [loading, setloading] = useState(false);

  const handleFileChange = (e) => {
    setfile(e.target.files[0]);
  };

  const handlefileupload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return false;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      setloading(true);
      const response = await axios.post(PostBulkUpload, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        toast.success("File uploaded successfully");
        setfile(null);
        setloading(false);
        return true;
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message?.response?.data || "File uploaded failed");
      setloading(false);
      setfile(null);
      return false;
    }
  };
  return {
    file,
    setfile,
    handleFileChange,
    handlefileupload,
    loading,
  };
};

export default useBulkupload;
