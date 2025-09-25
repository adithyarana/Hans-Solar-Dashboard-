import axios from "axios";
import React from "react";
import { CreateAttachment } from "../../constants/Apiurls";

const useCreateAttachments = (id) => {
  const CreateFolder = async (formData) => {
    try {
      const Response = await axios.post(
        `${CreateAttachment}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // send auth cookies (token)
        }
      );
      return Response;
    } catch (error) {
      console.error("Post API error:", error);
      throw error;
    }
  };
  return { CreateFolder };
};

export default useCreateAttachments;
