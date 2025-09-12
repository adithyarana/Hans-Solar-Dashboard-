import React, { useCallback, useState } from 'react'
import { GetCustomerData } from '../constants/Apiurls';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const usegetcustomerdata = (page , limit) => {
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterdata, setFilterData] = useState([]);
    const [totalpages , setTotalPages] = useState(1);
    const [totalcount , setTotalCount] = useState(0);
    const [searchpramas , setSearchpramas] = useSearchParams();

    const fetchCustomerData = useCallback(async () => {
        try { 
          setLoading(true);
          const response = await axios.get(GetCustomerData +`?page=${page}&limit=${limit}`, {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          });
          setCustomerData(response.data.customer);
          setFilterData(response.data.customer);
          setTotalPages(response.data.totalpages);
          setTotalCount(response.data.totalcount);
        } catch (error) {
          console.error("Error fetching customer data:", error);
        } finally {
          setLoading(false);
        }
      }, [page, limit]);

      return { customerData, loading, filterdata, setFilterData, fetchCustomerData , totalpages , totalcount };
}

export default usegetcustomerdata