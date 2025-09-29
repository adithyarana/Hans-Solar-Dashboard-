import axios from "axios";
import { PostCustomerData } from "../constants/Apiurls";
import { toast } from "react-toastify";

const usePostcustomerData = () => {
  const Apicall = async (customerData) => {
    try {
      const response = await axios.post(PostCustomerData, customerData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };
  return { Apicall };
};

export default usePostcustomerData;
