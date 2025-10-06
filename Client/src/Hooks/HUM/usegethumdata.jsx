import React, { useCallback, useEffect, useState } from 'react'
import { Getallhumdata } from '../../constants/Apiurls'
import axios from 'axios'
import { toast } from 'react-toastify'

const usegethumdata = () => {

    const [loading, setLoading] = useState(false)
    const [humdata, setHumdata] = useState([])

    const getHumData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get(Getallhumdata, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json" 
                }
            })
            
            setHumdata(response.data?.hunsurja || [])
            setLoading(false)            
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setHumdata([]) 
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getHumData()
    }, [getHumData])

    return {loading, humdata, refetch: getHumData}

}

export default usegethumdata