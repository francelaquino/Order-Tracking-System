import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AdminSideBarMenu from "./AdminSideBarMenu";
import ClientSideBarMenu from "./ClientSideBarMenu";

const SideBarLayout = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {}, [user]);
  return (
    <>
      <aside className="left-sidebar" data-sidebarbg="skin5">
        <div className="scroll-sidebar">
          <nav className="sidebar-nav">
            <ul id="sidebarnav" className="pt-4">
              {user.Currentprofile === "Admin" ? (
                <AdminSideBarMenu />
              ) : (
                <ClientSideBarMenu />
              )}
              {/* <li className="sidebar-item selected">
                {" "}
                <a
                  className="sidebar-link has-arrow waves-effect waves-dark "
                  href="#"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-receipt"></i>
                  <span className="hide-menu">Forms </span>
                </a>
                <ul aria-expanded="false" className="collapse  first-level">
                  <li
                    className="sidebar-item active
                                      "
                  >
                    <a href="form-basic.html" className="sidebar-link active">
                      <i className="mdi mdi-note-outline"></i>
                      <span className="hide-menu "> Form Basic</span>
                    </a>
                  </li>
                  <li className="sidebar-item">
                    <a href="form-wizard.html" className="sidebar-link">
                      <i className="mdi mdi-note-plus"></i>
                      <span className="hide-menu"> Form Wizard</span>
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBarLayout;
