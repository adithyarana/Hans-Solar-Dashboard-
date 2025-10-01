import axios from 'axios'
import { DeleteEmployeeData } from '../../constants/Apiurls'
import { toast } from 'react-toastify';
import { useState } from 'react';

const useDeleteEmploye = () => {
    const [loading, setLoading] = useState(false);
    const Apicall = async (id) => {
      try {
        setLoading(true);
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
      }finally{
        setLoading(false);
      }
    };
  
    return { Apicall, loading };
};

export default useDeleteEmploye
