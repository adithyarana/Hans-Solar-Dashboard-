import React, { useEffect, useState } from "react";
import { GetCustomerDataById } from "../constants/Apiurls";
import axios from "axios";

const usegetcustomerdatabyId = (id) => {
  const [customerdatabyid, setcustomerdatabyid] = useState([]); // to store the data in state
  const [loding, setloding] = useState(false);

  const Apicall = async () => {
    try {
      setloding(true);
      const response = await axios.get(GetCustomerDataById + id);
      setcustomerdatabyid(response.data);
      console.log("response", response);
      setloding(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    Apicall();
  }, []);

  return { customerdatabyid, loding };
};

export default usegetcustomerdatabyId;
