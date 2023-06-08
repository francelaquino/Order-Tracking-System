import { createBrowserHistory } from "@remix-run/router";
import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import HeaderLayout from "./HeaderLayout";
import SideBarLayout from "./SideBarLayout";

const MenuLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  const history = createBrowserHistory();

  const showMenu = () => {
    const pathName = history.location.pathname;
    if (
      pathName.indexOf("login") > 0 ||
      pathName.indexOf("unauthorized") > 0 ||
      pathName.indexOf("forgotpassword") > 0 ||
      pathName.indexOf("passwordreset") > 0 ||
      pathName === "/"
    ) {
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
        className={user.Currentprofile === "ClientUser" ? "mini-sidebar" : ""}
      >
        {showMenu() ? (
          <div>
            <HeaderLayout /> <SideBarLayout />
          </div>
        ) : null}

        <div className={"page-wrapper " + (showMenu() ? "" : "no-margin-left")}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
