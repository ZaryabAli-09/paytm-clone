import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoutes = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/signin" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
