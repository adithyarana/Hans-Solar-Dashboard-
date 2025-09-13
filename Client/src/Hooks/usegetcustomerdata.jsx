import React, { useCallback, useState } from "react";
import { GetCustomerData } from "../constants/Apiurls";
import axios from "axios";
import qs from "qs";

const usegetcustomerdata = (page, limit, filter) => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalpages, setTotalPages] = useState(1);
  const [totalcount, setTotalCount] = useState(0);

  const fetchCustomerData = useCallback(async () => {
    try {

      const query = {
        page:page.toString(),
        limit:limit.toString(),
        ...(filter || {}),
      };
    
      const querystring = qs.stringify(query,{encodeValuesOnly: true , allowDots:true});


      setLoading(true);
      const response = await axios.get(
        GetCustomerData + `?${querystring}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setCustomerData(response.data.customer || []);
      setTotalPages(response.data.totalpages || 1);
      setTotalCount(response.data.totalcount || 0);
    } catch (error) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filter]);

  return { customerData, loading, fetchCustomerData, totalpages, totalcount };
};

export default usegetcustomerdata;
