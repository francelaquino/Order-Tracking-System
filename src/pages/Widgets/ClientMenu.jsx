import React from "react";

const ClientMenu = () => {
  return (
    <div className="ui vertical menu inverted">
      <div className="item">
        <div className="header">Menu</div>
        <div className="menu">
          <a className="item" href="/client/dashboard">
            Home
          </a>
          <a className="item" href="/client/devices">
            Devices
          </a>
          <a className="item" href="/client/users">
            Users
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientMenu;
