import axios from "axios";
import React from "react";
import { DeleteFolderApi } from "../../constants/Apiurls";


const usedelete = () => {
  const DeleteFolder = async (id) => {
    try {
      const response = await axios.delete(`${DeleteFolderApi}${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    } catch (error) {
      console.error("Delete API error:", error);
      throw error;
    }
  };

  return {
    DeleteFolder,
  };
};

export default usedelete;
