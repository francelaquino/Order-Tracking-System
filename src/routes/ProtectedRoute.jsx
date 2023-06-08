import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const IsAuthenticated = userData.IsLogged;

  return IsAuthenticated != true ? <Navigate to="login" /> : <Outlet />;
};
