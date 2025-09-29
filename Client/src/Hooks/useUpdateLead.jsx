import axios from 'axios'
import { UpdateLead } from '../constants/Apiurls';
import { toast } from 'react-toastify';

const useUpdateLead = () => {

    const UpdateApicall = async (id,updatedata) => {
        try {

            const response = await axios.put(`${UpdateLead}${id}`, updatedata,{
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json" 
                },
            })
            return response.data
            
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }

    return { UpdateApicall }
}

export default useUpdateLead