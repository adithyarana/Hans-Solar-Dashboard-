import axios from 'axios'
import { toast } from 'react-toastify';
import { UpdateHumData } from '../../constants/Apiurls';

const useUpdateHum = () => {

    const UpdateApicall = async (id,updatedata) => {
        try {

            const response = await axios.patch(`${UpdateHumData}${id}`, updatedata,{
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

export default useUpdateHum