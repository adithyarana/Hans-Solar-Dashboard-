import React, { useEffect, useState } from 'react'
import { GetCustomerData } from '../constants/Apiurls';
import axios from 'axios'

const usegetcustomerdata = () => {

    const [customerdata , setcustomerdata]=useState([]); // to store the data in state 
    const [loding , setloding] = useState(false)

    const Apicall = async()=>{
        try {
            setloding(true)
            const response = await axios.get(GetCustomerData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            })
            setcustomerdata(response.data)
            console.log("customerdata",response.data)
            setloding(false)
            
        } catch (error) {
            console.log(error)
            throw error
            
        }
    }

    useEffect(()=>{
        Apicall()
    },[])

    return {customerdata , loding}
}

export default usegetcustomerdata