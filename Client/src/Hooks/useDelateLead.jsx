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
      console.error("Delete API error:", error);
      throw error;
    }
  };

  return { Apicall };
};

export default useDeleteLead;
