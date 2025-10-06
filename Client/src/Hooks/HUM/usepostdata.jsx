import axios from 'axios'
import { PostHumData } from '../../constants/Apiurls'
import { toast } from 'react-toastify'

const usepostdata = () => {
    const postHumdata = async(humdata) => {
        try {
            const response = await axios.post(PostHumData,humdata,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })
            return response.data
        } catch (error) {
            toast.error(error?.response?.data?.message)
            throw error
        }
    }
    return {postHumdata}
}

export default usepostdata