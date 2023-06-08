import { createBrowserHistory } from "@remix-run/router";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const IsVisible = () => {
  const history = createBrowserHistory();

  const pathName = history.location.pathname;

  const { user } = useContext(UserContext);
  if (
    (user.Role === "ClientAdmin" && pathName === "/client/users") ||
    user.Role === "Admin"
  ) {
    return "";
  } else {
    return "hide";
  }
};

export { IsVisible };
