import axios from 'axios'
import { DeleteEmployeeData } from '../../constants/Apiurls'

const useDeleteEmploye = () => {
    const Apicall = async (id) => {
      try {
        const response = await axios.delete(`${DeleteEmployeeData}${id}`, {
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

export default useDeleteEmploye
