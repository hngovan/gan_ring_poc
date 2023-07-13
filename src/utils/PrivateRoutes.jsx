import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: false };
  const authLogin = localStorage.getItem("auth");
  if (authLogin) {
    auth.token = true;
  }

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
