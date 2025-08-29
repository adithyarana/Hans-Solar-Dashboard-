import axios from 'axios'
import { PostEmployeeData } from '../../constants/Apiurls'

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
        console.error("Post API error:", error);
        throw error;
    }
}

return {Postemployeedata}
}

export default usePostemployeedata