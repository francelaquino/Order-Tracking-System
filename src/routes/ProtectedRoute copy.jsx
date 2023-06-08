import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const IsAuthenticated = userData.IsLogged;

  return IsAuthenticated != true ? <Navigate to="login" /> : <Outlet />;
};
