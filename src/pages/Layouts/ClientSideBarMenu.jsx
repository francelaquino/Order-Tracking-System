import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ClientSideBarMenu = () => {
  const { user, updateProfile } = useContext(UserContext);

  const clearClientAccount = () => {
    updateProfile("", "", "Admin");
  };
  return (
    <>
      {user.Role === "Admin" ? (
        <li className="sidebar-item ">
          {" "}
          <Link
            className="sidebar-link waves-effect waves-dark sidebar-link "
            to="/admin/clients"
            onClick={() => {
              clearClientAccount();
            }}
            aria-expanded="false"
          >
            <i className="mdi mdi-home "></i>
            <span className="hide-menu">Home</span>
          </Link>
        </li>
      ) : (
        ""
      )}
      {user.Currentprofile === "ClientAdmin" ||
      user.Currentprofile === "Admin" ? (
        <div>
          <li className="sidebar-item">
            {" "}
            <Link
              className="sidebar-link waves-effect waves-dark sidebar-link"
              to="/client/devices"
              aria-expanded="false"
            >
              <i className="mdi mdi-nfc-variant"></i>
              <span className="hide-menu">Devices</span>
            </Link>
          </li>
          <li className="sidebar-item">
            {" "}
            <Link
              className="sidebar-link waves-effect waves-dark sidebar-link"
              to="/client/tables"
              aria-expanded="false"
            >
              <i className="mdi mdi-view-dashboard"></i>
              <span className="hide-menu">Tables</span>
            </Link>
          </li>
          <li className="sidebar-item ">
            {" "}
            <Link
              className="sidebar-link waves-effect waves-dark sidebar-link "
              to="/client/orders"
              aria-expanded="false"
            >
              <i className="mdi mdi-monitor-multiple "></i>
              <span className="hide-menu">Orders</span>
            </Link>
          </li>

          <li className="sidebar-item ">
            <Link
              className="sidebar-link has-arrow waves-effect waves-dark active"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-newspaper"></i>
              <span className="hide-menu">Reports </span>
            </Link>
            <ul aria-expanded="false" className="collapse first-level in">
              <li className="sidebar-item ">
                <Link
                  href="index2.html"
                  className="sidebar-link "
                  to="/client/report/deviceutilization"
                >
                  <i className="mdi mdi-chart-histogram"></i>
                  <span className="hide-menu">Device Utilization </span>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  href="pages-calendar.html"
                  className="sidebar-link"
                  to="/client/report/tableutilization"
                >
                  <i className="mdi mdi-chart-histogram"></i>
                  <span className="hide-menu"> Table Utilization </span>
                </Link>
              </li>
              {user.Role === "Admin" ? (
                <li className="sidebar-item">
                  <Link
                    href="pages-gallery.html"
                    className="sidebar-link"
                    to="/client/report/deviceheartbit"
                  >
                    <i className="mdi mdi-chart-histogram"></i>
                    <span className="hide-menu"> Device Beacon </span>
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </li>
          <li className="sidebar-item ">
            <Link
              className="sidebar-link has-arrow waves-effect waves-dark active"
              href="javascript:void(0)"
              aria-expanded="false"
            >
              <i className="mdi mdi-settings"></i>
              <span className="hide-menu">Settings </span>
            </Link>
            <ul aria-expanded="false" className="collapse first-level in">
              <li className="sidebar-item">
                <Link
                  className="sidebar-link waves-effect waves-dark sidebar-link "
                  to="/client/users"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-account "></i>
                  <span className="hide-menu">Users</span>
                </Link>
              </li>
              <li className="sidebar-item ">
                <Link
                  className="sidebar-link waves-effect waves-dark sidebar-link "
                  to="/client/status"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-format-list-numbers "></i>
                  <span className="hide-menu">Status</span>
                </Link>
              </li>
            </ul>
          </li>
        </div>
      ) : (
        <div>
          {" "}
          <li className="sidebar-item">
            {" "}
            <Link
              className="sidebar-link waves-effect waves-dark sidebar-link"
              to="/clientorders"
              aria-expanded="false"
            >
              <i className="mdi mdi-view-dashboard"></i>
              <span className="hide-menu">Orders</span>
            </Link>
          </li>
          {/* <li className="sidebar-item">
            {" "}
            <Link
              className="sidebar-link waves-effect waves-dark sidebar-link"
              to="/clientorders"
              aria-expanded="false"
            >
              <i className="mdi mdi-information-outline"></i>
              <span className="hide-menu">Summary</span>
            </Link>
          </li> */}
        </div>
      )}
    </>
  );
};

export default ClientSideBarMenu;
