import { useState } from "react";
import axios from "axios";
import { LoginApi } from "../constants/Apiurls";

const useauth = () => {
  const [user, setUser] = useState(null);

  const Apicall = async (name, email, password) => {
    try {
      const userdata = await axios.post(
        LoginApi,
        { name, email, password },
        { withCredentials: true }
      );
      setUser(userdata.data);
      console.log("Login success:", userdata.data);

      return userdata.data;  
    } catch (error) {
      console.error("Login error:", error);
       throw error;
    }
  };

  return { Apicall, user };
};

export default useauth;
