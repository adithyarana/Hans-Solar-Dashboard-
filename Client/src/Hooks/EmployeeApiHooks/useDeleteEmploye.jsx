import axios from 'axios'
import { DeleteEmployeeData } from '../../constants/Apiurls'
import { toast } from 'react-toastify';

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
        toast.error(error?.response?.data?.message);
        throw error;
      }
    };
  
    return { Apicall };
};

export default useDeleteEmploye
