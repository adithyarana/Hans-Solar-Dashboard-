import React, { useCallback, useState } from 'react'
import { GetCustomerData } from '../constants/Apiurls';
import axios from 'axios';

const usegetcustomerdata = () => {
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterdata, setFilterData] = useState([]);

    const fetchCustomerData = useCallback(async () => {
        try { 
          setLoading(true);
          const response = await axios.get(GetCustomerData, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          });
          setCustomerData(response.data.customer);
          setFilterData(response.data.customer);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        } finally {
          setLoading(false);
        }
      }, []);

      return { customerData, loading, filterdata, setFilterData, fetchCustomerData };
}

export default usegetcustomerdata