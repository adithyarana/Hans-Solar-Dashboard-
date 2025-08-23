import { useState } from "react";
import axios from "axios";
import { LoginApi } from "../constants/Apiurls";
import { useDispatch } from "react-redux";
import { LoggedInUser } from "../utils/UserSlice";

const useauth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const Apicall = async (name, email, password) => {
    try {
      const userdata = await axios.post(
        LoginApi,
        { name, email, password },
        { withCredentials: true }
      );
      setUser(userdata.data);
      
      dispatch(
        LoggedInUser({
          user: userdata?.data?.user,
          token: userdata?.data?.token,
        })
      );
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
