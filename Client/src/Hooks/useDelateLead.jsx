import axios from 'axios';
import { DeleteLead } from '../constants/Apiurls';

const useDeleteLead = () => {
  const Apicall = async (id) => {
    try {
      const response = await axios.delete(`${DeleteLead}${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json" 
        }
      });
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  return { Apicall };
};

export default useDeleteLead;
