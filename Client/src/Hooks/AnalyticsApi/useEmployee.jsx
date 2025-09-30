import React, { useEffect, useState } from "react";
import axios from "axios";
import { EmployeeAnalytics } from "../../constants/Apiurls";
import { toast } from "react-toastify";

const useEmployeeAnalytics = (empid, enabled = true) => {
  const [EmployeeAnalyticsData, setEmployeeAnalyticsData] = useState([]);
  const [Eloading, EsetLoading] = useState(false);

  const EmployeeAnalyticsApi = async () => {
    EsetLoading(true);
    try {
      const response = await axios.get(`${EmployeeAnalytics}${empid}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEmployeeAnalyticsData(response.data);
    } catch (error) {
       toast.error(error?.response?.data?.message);
    
    } finally {
      EsetLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled || !empid) return;
    EmployeeAnalyticsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empid, enabled]);

  return {
    EmployeeAnalyticsData,
    Eloading,
  };
};

export default useEmployeeAnalytics;
