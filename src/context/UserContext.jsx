import React, { useState } from "react";
import { useEffect } from "react";
import { json } from "react-router-dom";

const UserContext = React.createContext();

const initialState = {
  Customerid: "",
  Userid: "",
  Username: "",
  Name: "",
  Customer: "",
  Role: "",
  Currentprofile: "",
  IsLogged: false,
};

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const clearUser = () => {
    setUser(initialState);
    localStorage.setItem("userData", "");
  };

  const updateUser = (user) => {
    setUser(user);
  };

  const updateProfile = (Customer, Customerid, Profile) => {
    setUser({
      ...user,
      Customer: Customer,
      Customerid: Customerid,
      Currentprofile: Profile,
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, updateUser, updateProfile, clearUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
