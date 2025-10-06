import { useState } from "react";
import axios from "axios";
import { LoginApi, LoginHansUrja } from "../constants/Apiurls";
import { useDispatch } from "react-redux";
import { LoggedInUser } from "../utils/UserSlice";

const useauth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const Apicall = async (name, email, password, option) => {
    try {
      const userdata = await axios.post(
        option === "HANSURJA" ? LoginHansUrja : LoginApi,
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

      return userdata.data;
    } catch (error) {
      throw error;
    }
  };

  return { Apicall, user };
};

export default useauth;
