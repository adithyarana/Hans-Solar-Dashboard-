import React, { useEffect, useState } from 'react'
import { GetFolderdatabyId } from '../../constants/Apiurls'
import axios from 'axios'
import { toast } from 'react-toastify';

const usegetmediabyid = (id) => {
    
    const[getfolderdata,setgetfolderdata] = useState([])
    const [loadingId,setloadingId] = useState(false)
  
    const getfolderbyId = async()=>{
        try {
            // If no valid id, don't call the API and reset local state
            if (!id) {
                setgetfolderdata([])
                return
            }
            setloadingId(true)
            const response = await axios.get(`${GetFolderdatabyId}${id}`, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            })
            setgetfolderdata(response.data?.folder)
        } catch (error) {
            toast.error(error?.response?.data?.message)
            throw error
        }
        finally{
            setloadingId(false)
        }
    }

    useEffect(() => {
        // Avoid firing when id is empty/null/undefined
        if (!id) {
            setgetfolderdata([])
            return
        }
        getfolderbyId()
    }, [id])

    return {
        getfolderdata,
        loadingId,
    }
}

export default usegetmediabyid