import React from "react";
import ClientMenu from "../Widgets/ClientMenu";
import { Routes, Route } from "react-router-dom";
import ClientDevices from "../Devices/ClientDevices";
import ClientUser from "../Users/ClientUser";
import ClientDashboard from "../Dashboard/ClientDashboard";
import ClientAdminMenu from "./ClientAdminMenu";

const ClientAdminLayout = ({ children }) => {
  return (
    <div>
      <ClientAdminMenu>{children}</ClientAdminMenu>
    </div>
  );
};

export default ClientAdminLayout;
