import { createBrowserHistory } from "@remix-run/router";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import ClientHeader from "./HeaderLayout";
import ClientLeftSideBar from "./SideBarLayout";

const ClientAdminMenu = ({ children }) => {
  const { pathName } = useContext(UserContext);

  const history = createBrowserHistory();

  const showMenu = () => {
    const pathName = history.location.pathname;

    if (pathName === "/client/login") {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div>
      <div
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin5"
        data-sidebartype="full"
        data-sidebar-position="absolute"
        data-header-position="absolute"
        data-boxed-layout="full"
      >
        {showMenu() ? (
          <div>
            <ClientHeader /> <ClientLeftSideBar />
          </div>
        ) : null}

        <div className={"page-wrapper " + (showMenu() ? "" : "no-margin-left")}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClientAdminMenu;
