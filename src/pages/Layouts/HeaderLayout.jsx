import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);

  const onLogout = () => {
    localStorage.clear();
    if (user.Role == "Admin") {
      navigate("/login");
    } else {
      navigate("/client/login");
    }

    clearUser();
  };

  const onProfileView = () => {
    if (user.Role == "Admin") {
      navigate("/profile");
    } else {
      navigate("/profile");
    }
  };

  return (
    <>
      <header className="topbar" data-navbarbg="skin5">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header" data-logobg="skin5">
            <div className="navbar-brand">
              <img
                src="/images/nvs_logo.jpeg"
                alt="homepage"
                className="light-logo"
              />
            </div>

            <Link
              className="nav-toggler waves-effect waves-light d-block d-md-none"
              href="#"
            >
              <i className="ti-menu ti-close"></i>
            </Link>
          </div>
          <div
            className="navbar-collapse collapse"
            id="navbarSupportedContent"
            data-navbarbg="skin5"
          >
            <ul className="navbar-nav float-start me-auto">
              <li className="nav-item d-none d-lg-block">
                <Link
                  className="nav-link sidebartoggler waves-effect waves-light"
                  href="#"
                  data-sidebartype="mini-sidebar"
                >
                  <i className="mdi mdi-menu font-24"></i>
                </Link>
              </li>
              <li>
                {" "}
                <div className="client-name">{user.Customer}</div>
              </li>
            </ul>

            <ul className="navbar-nav float-end">
              <div className="client-username">{user.Name}</div>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="/assets/images/users/1.jpg"
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  ></img>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end user-dd animated"
                  aria-labelledby="navbarDropdown"
                >
                  {user.Role !== "Admin" ? (
                    <>
                      <Link className="dropdown-item" to="/client/profile">
                        <i className="ti-user me-1 ms-1"></i> Profile
                      </Link>
                      <div className="dropdown-divider"></div>
                    </>
                  ) : (
                    ""
                  )}

                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => {
                      onLogout();
                    }}
                  >
                    <i className="fa fa-power-off me-1 ms-1"></i> Logout
                  </a>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default HeaderLayout;
