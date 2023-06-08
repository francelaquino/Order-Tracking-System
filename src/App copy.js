import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import logo from './logo.svg';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './App.css';
import Orders from './pages/Orders/Orders';
import React, {  useState } from 'react';
import { UserContextProvider } from './context/UserContext';
import ClientDevices from './pages/Devices/ClientDevices';
import ClientLogin from './pages/Authorization/ClientLogin';
import ClientOrders from './pages/Orders/ClientOrders';
import ClientUser from './pages/Users/ClientUser';
import NewClientUser from './pages/Users/NewClientUser';
import EditClientUser from './pages/Users/EditClientUser';
import ClientDashboard from './pages/Dashboard/ClientDashboard';
import ClientAdminUser from './pages/Users/ClientAdminUser';
import MenuLayout from './pages/Layouts/MenuLayout';
import NewClient from './pages/Clients/NewClient';
import Clients from './pages/Clients/Clients';
import EditClient from './pages/Clients/EditClient';
import NewClientDevice from './pages/Devices/NewClientDevice';
import EditClientDevice from './pages/Devices/EditClientDevice';
import ClientTables from './pages/Tables/ClientTables';
import NewClientTable from './pages/Tables/NewClientTable';
import EditClientTable from './pages/Tables/EditClientTable';
import AdminLogin from './pages/Authorization/AdminLogin';
import ClientUserProfile from './pages/Users/ClientUserPofile';
import ClientPasswordReset from './pages/Users/ClientPasswordReset';
import UpdateStatus from './pages/Statuses/UpdateStatus';
import DeviceUtilization from './pages/Reports/DeviceUtilization';
import DeviceHeartbit from './pages/Reports/DeviceHeartbit';
import { ProtectedRoute } from './routes/ProtectedRoute';


function App() {


  const [user, setUser] = useState([])

  return (
    <div>
      <UserContextProvider value={{user, setUser}}>
      
      <MenuLayout>
      <Routes>
          <Route path="/client/login" element={<ClientLogin />} />
          <Route path='/login' element={<AdminLogin/>}/>
          <Route element={<ProtectedRoute/>}>
                  <Route path="/client/dashboard" element={<ClientDashboard/>}/>
                  <Route path="/client/tables" element={<ClientTables />} />
                  <Route path="/client/tables/newtable" element={<NewClientTable />} />
                  <Route path="/client/tables/:id" element={<EditClientTable />} />
                  <Route path="/client/devices/:id" element={<EditClientDevice />} />
                  <Route path="/client/devices" element={<ClientDevices />} />
                  <Route path="/client/devices/newdevice" element={<NewClientDevice />} />
                  <Route path="/client/orders" element={<ClientOrders />} />
                  
                  <Route path="/client/users" element={<ClientUser />} />
                  <Route path="/client/users/:id" element={<EditClientUser />} />
                  <Route path="/client/newuser" element={<NewClientUser />} />
                  <Route path="/clientorders" element={<Orders/>} />
                  <Route path="/client/profile" element={<ClientUserProfile/>} />
                  <Route path="/client/resetpassword" element={<ClientPasswordReset/>} />

                  <Route path='/users' element={<ClientAdminUser/>}/>
                  <Route path='/admin/client/newclient' element={<NewClient/>}/>
                  <Route path='/admin/clients'  element={<Clients/>}/>
                  <Route path='/admin/client/editclient/:id' element={<EditClient/>}/>
                  <Route path='/admin/users'  element={<ClientAdminUser/>}/>
                  <Route path='/admin/users/newuser'  element={<Clients/>}/>
                  <Route path='/admin/users/:id'  element={<Clients/>}/>

                  

                  <Route path='/client/report/deviceutilization'  element={<DeviceUtilization/>}/>
                  <Route path='/client/report/deviceheartbit'  element={<DeviceHeartbit/>}/>
                  <Route path="client/status" element={<UpdateStatus/>}/>

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
