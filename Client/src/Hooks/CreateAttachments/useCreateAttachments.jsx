import axios from "axios";
import React from "react";
import { CreateAttachment } from "../../constants/Apiurls";
import { toast } from "react-toastify";

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
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  return { CreateFolder };
};

export default useCreateAttachments;
