import {
  BrowserRouter as Router,
  Route,
  Routes,
  useRoutes,
  AppRouter,
} from "react-router-dom";

import logo from "./logo.svg";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./App.css";
import Orders from "./pages/Orders/Orders";
import React, { useState } from "react";
import { UserContextProvider } from "./context/UserContext";
import ClientDevices from "./pages/Devices/ClientDevices";
import ClientLogin from "./pages/Authorization/ClientLogin";
import ClientOrders from "./pages/Orders/ClientOrders";
import ClientUser from "./pages/Users/ClientUser";
import NewClientUser from "./pages/Users/NewClientUser";
import EditClientUser from "./pages/Users/EditClientUser";
import ClientDashboard from "./pages/Dashboard/ClientDashboard";
import ClientAdminUser from "./pages/Users/ClientAdminUser";
import MenuLayout from "./pages/Layouts/MenuLayout";
import NewClient from "./pages/Clients/NewClient";
import Clients from "./pages/Clients/Clients";
import EditClient from "./pages/Clients/EditClient";
import NewClientDevice from "./pages/Devices/NewClientDevice";
import EditClientDevice from "./pages/Devices/EditClientDevice";
import ClientTables from "./pages/Tables/ClientTables";
import NewClientTable from "./pages/Tables/NewClientTable";
import EditClientTable from "./pages/Tables/EditClientTable";
import AdminLogin from "./pages/Authorization/AdminLogin";
import ClientUserProfile from "./pages/Users/ClientUserPofile";
import ClientPasswordReset from "./pages/Users/ClientPasswordReset";
import UpdateStatus from "./pages/Statuses/UpdateStatus";
import DeviceUtilization from "./pages/Reports/DeviceUtilization";
import DeviceHeartbit from "./pages/Reports/DeviceHeartbit";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Unauthorized from "./routes/Unauthorized";
import { ClientAdminElement } from "./routes/ClientAdminElement";
import { AdminElement } from "./routes/AdminElement";
import TableUtilization from "./pages/Reports/TableUtilization";
import TableUtilizationGraph from "./pages/Reports/TableUtilizationGraph";
import ClientForgotPassword from "./pages/Authorization/ClientForgotPassword";
import ClientForgotPasswordReset from "./pages/Authorization/ClientForgotPasswordReset";
import DeviceUtilizationGraph from "./pages/Reports/DeviceUtilizationGraph";

function App() {
  const [user, setUser] = useState([]);

  // const routes = useRoutes([routes]);

  return (
    <div>
      <UserContextProvider value={{ user, setUser }}>
        <MenuLayout>
          <Routes>
            <Route path="/client/login" element={<ClientLogin />} />

            <Route path="/" element={<ClientLogin />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route
              path="/client/forgotpassword"
              element={<ClientForgotPassword />}
            />
            <Route
              path="/client/passwordreset/:cid/:id"
              element={<ClientForgotPasswordReset />}
            />
            <Route path="/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/clientorders" element={<Orders />} />

              <Route
                path="/client/resetpassword"
                element={<ClientPasswordReset />}
              />
              <Route path="/client/profile" element={<ClientUserProfile />} />
              <Route path="/client" element={<ClientAdminElement />}>
                <Route path="tables/newtable" element={<NewClientTable />} />
                <Route path="tables" element={<ClientTables />} />
                <Route path="dashboard" element={<ClientDashboard />} />

                <Route path="tables/:id" element={<EditClientTable />} />
                <Route path="devices/:id" element={<EditClientDevice />} />
                <Route path="devices" element={<ClientDevices />} />
                <Route path="devices/newdevice" element={<NewClientDevice />} />
                <Route path="orders" element={<ClientOrders />} />

                <Route path="users" element={<ClientUser />} />
                <Route path="users/:id" element={<EditClientUser />} />
                <Route path="newuser" element={<NewClientUser />} />

                <Route
                  path="report/deviceutilizationlist"
                  element={<DeviceUtilization />}
                />
                <Route
                  path="report/tableutilizationlist"
                  element={<TableUtilization />}
                />
                <Route
                  path="report/deviceutilization"
                  element={<DeviceUtilizationGraph />}
                />
                <Route
                  path="report/deviceheartbit"
                  element={<DeviceHeartbit />}
                />
                <Route
                  path="report/tableutilization"
                  element={<TableUtilizationGraph />}
                />
                <Route path="status" element={<UpdateStatus />} />
              </Route>

              <Route path="/admin" element={<AdminElement />}>
                <Route path="client/newclient" element={<NewClient />} />

                <Route path="clients" element={<Clients />} />
                <Route path="client/editclient/:id" element={<EditClient />} />
                <Route path="users" element={<ClientAdminUser />} />
                <Route path="users/newuser" element={<Clients />} />
                <Route path="users/:id" element={<Clients />} />
              </Route>

              <Route path="/users" element={<ClientAdminUser />} />
            </Route>
          </Routes>
        </MenuLayout>
      </UserContextProvider>
      {/* <UserContextProvider value={{user, setUser}}>
          <Routes>
          <Route path="/orders" element={<Orders/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<ClientLayout/>}/>
          <Route path="*" element={<Layout/>}/>
          </Routes>

      </UserContextProvider> */}
    </div>
  );
}

export default App;
