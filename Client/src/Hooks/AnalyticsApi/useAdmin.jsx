import React, { useEffect, useState } from "react";
import axios from "axios";
import { AdminAnalytics } from "../../constants/Apiurls";
import { toast } from "react-toastify";

const useAdminAnalytics = (enabled = true) => {
  const [analyticsdata, setAnalyticsdata] = useState([]);
  const [loading, setLoading] = useState(false);

  const Adminanalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(AdminAnalytics, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAnalyticsdata(response.data?.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    Adminanalytics();
  }, [enabled]);

  return { analyticsdata, loading };
};

export default useAdminAnalytics;
