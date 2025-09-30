import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Checkauth } from "./Checkauth.jsx";

const Protectedroutes = ({children} ) => {
  const token = useSelector((state) => state.userdata?.token);

  return Checkauth(token) ? children : <Navigate to="/" />;
};

export default Protectedroutes;
