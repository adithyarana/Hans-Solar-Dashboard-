import axios from "axios";
import React from "react";
import { DeleteFolderApi } from "../../constants/Apiurls";
import { toast } from "react-toastify";


const usedelete = () => {
  const DeleteFolder = async (id) => {
    try {
      const response = await axios.delete(`${DeleteFolderApi}${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  return {
    DeleteFolder,
  };
};

export default usedelete;
