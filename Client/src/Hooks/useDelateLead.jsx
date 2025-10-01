import axios from 'axios';
import { DeleteLead } from '../constants/Apiurls';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useDeleteLead = () => {

  const [loading, setLoading] = useState(false);
  const Apicall = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${DeleteLead}${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json" 
        }
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  return { Apicall, loading };
};

export default useDeleteLead;
