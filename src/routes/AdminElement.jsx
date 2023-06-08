import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminElement = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (user.Role == "Admin") {
    return <Outlet />;
  } else {
    return <Navigate to={"/unauthorized"} />;
  }
};
