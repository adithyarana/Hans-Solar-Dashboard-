import axios from 'axios'
import { PostEmployeeData } from '../../constants/Apiurls'
import { toast } from 'react-toastify';

const usePostemployeedata = () => {
const Postemployeedata = async (employeeData) => {
    try {
        const response = await axios.post(PostEmployeeData, employeeData, {
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
}

return {Postemployeedata}
}

export default usePostemployeedata