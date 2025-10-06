import React, { useEffect, useState } from "react";
import axios from "axios";
import { HansUrjaAnalytics } from "../../constants/Apiurls";
import { toast } from "react-toastify";

const useHansurjaAnalytics = (hansurjaId, enabled = true) => {
  const [HansurjaAnalyticsData, setHansurjaAnalyticsData] = useState([]);
  const [Hloading, HsetLoading] = useState(false);

  const HansurjaAnalyticsApi = async () => {
    HsetLoading(true);
    try {
      const response = await axios.get(`${HansUrjaAnalytics}${hansurjaId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setHansurjaAnalyticsData(response.data?.data);
    } catch (error) {
       toast.error(error?.response?.data?.message);
    
    } finally {
      HsetLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled || !hansurjaId) return;
    HansurjaAnalyticsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hansurjaId, enabled]);

  return {
    HansurjaAnalyticsData,
    Hloading,
  };
};

export default useHansurjaAnalytics;
