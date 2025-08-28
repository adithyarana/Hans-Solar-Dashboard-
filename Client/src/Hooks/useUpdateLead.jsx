import axios from 'axios'
import { UpdateLead } from '../constants/Apiurls';

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
            console.error("Update API error:", error);
            throw error;
        }
    }

    return { UpdateApicall }
}

export default useUpdateLead