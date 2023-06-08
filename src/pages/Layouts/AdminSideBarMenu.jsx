import React from "react";
import { Link } from "react-router-dom";

const AdminSideBarMenu = () => {
  return (
    <>
      <li className="sidebar-item">
        {" "}
        <Link
          className="sidebar-link waves-effect waves-dark sidebar-link"
          to="/admin/clients"
          aria-expanded="false"
        >
          <i className="mdi mdi-store"></i>
          <span className="hide-menu">Clients</span>
        </Link>
      </li>
    </>
  );
};

export default AdminSideBarMenu;
