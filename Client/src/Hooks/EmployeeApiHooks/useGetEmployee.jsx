import { useCallback, useEffect, useState } from "react"
import { GetEmployeeData } from "../../constants/Apiurls"
import axios from "axios"
import { toast } from "react-toastify";

// In useGetEmployee.jsx
const useGetEmployee = () => {
    const [employeeData, setEmployeeData] = useState([])
    const [loading, setLoading] = useState(false)

    const getEmployeeData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get(GetEmployeeData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json" 
                }
            })
            
            setEmployeeData(response.data.employee || [])
            setLoading(false)            
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setEmployeeData([]) 
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getEmployeeData()
    }, [getEmployeeData])

    return { employeeData, loading, refetch: getEmployeeData }
}

export default useGetEmployee
