import axios from "axios";
import { PostCustomerData } from "../constants/Apiurls";

const usePostcustomerData = () => {
  const Apicall = async (customerData) => {
    try {
      const response = await axios.post(PostCustomerData, customerData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return { Apicall };
};

export default usePostcustomerData;
