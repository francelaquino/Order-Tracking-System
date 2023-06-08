import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ClientAdminElement = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (user.Role === "Admin" || user.Role === "ClientAdmin") {
    return <Outlet />;
  } else {
    return <Navigate to={"/unauthorized"} />;
  }
};
