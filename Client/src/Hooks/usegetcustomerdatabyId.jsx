import React, { useCallback, useEffect, useState } from "react";
import { GetCustomerDataById } from "../constants/Apiurls";
import axios from "axios";
import { toast } from "react-toastify";

const useGetCustomerDataById = (id) => {
  const [customerdatabyid, setCustomerDataById] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchCustomerData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await axios.get(`${GetCustomerDataById}${id}`, {
        withCredentials: true,
      });
      setCustomerDataById(response.data);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  return { customerdatabyid, loading, refetch: fetchCustomerData };
};

export default useGetCustomerDataById;
