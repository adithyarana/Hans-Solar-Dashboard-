import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protectedroutes = ({children} ) => {
  const token = useSelector((state) => state.userdata?.token);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protectedroutes;
