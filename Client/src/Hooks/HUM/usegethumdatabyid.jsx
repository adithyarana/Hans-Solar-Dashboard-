import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GetHumDataById } from "../../constants/Apiurls";

const usegethumdatabyid = (id) => {
  const [humdatabyid, setHumDataById] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchHumData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await axios.get(`${GetHumDataById}${id}`, {
        withCredentials: true,
      });
      setHumDataById(response.data?.hunsurja);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHumData();
  }, [fetchHumData]);

  return { humdatabyid, loading, refetch: fetchHumData };
};

export default usegethumdatabyid;
