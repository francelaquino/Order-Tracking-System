import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { AuthenticateClient } from "./AuthorizationHandler";
import BarcodeScanner from "../Widgets/BarcodeScanner";

const ClientLogin = () => {
  const [formValue, setFormValue] = useState({
    Username: "",
    Password: "",
  });

  const navigate = useNavigate();

  const updateUserDetails = (result) => {
    let userDetail = {
      Role: result.Role,
      Userid: result.Userid,
      Username: result.Username,
      Currentprofile: result.Role,
      IsLogged: true,
      Customerid: result.Customerid,
      Customer: result.Customer,
    };
    updateUser(userDetail);
    localStorage.setItem("jwtToken", result.AccessToken);

    if (userDetail.Role === "ClientAdmin") {
      window.location.href = "/client/devices";
    } else {
      window.location.href = "/clientorders";
    }
  };

  const { updateUser } = useContext(UserContext);

  const toast = useRef(null);

  const userNameRef = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.Username || !formValue.Password) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
      setFormValue({ Username: "", Password: "" });
    } else {
      try {
        const result = await AuthenticateClient(formValue);
        if (result.StatusCode == 200) {
          updateUserDetails(result);
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: result.Message,
          });
          setFormValue({ Username: "", Password: "" });
          userNameRef.current.focus();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="login-form">
      <div>
        <div className="col-md-12">
          <div className="card mt-5 pad-20">
            <form onSubmit={onSubmit}>
              <div className="card-body ">
                <div>
                  <div className="text-center">
                    <img src="/images/nvs_logo.jpeg" />
                  </div>
                  <label className="col-md-12 col-form-label mb-1 text-center mb-3 mt-3">
                    <h3>Login</h3>
                  </label>

                  <div className="form-group row mb-3">
                    <label className="col-md-12 col-form-label mb-1">
                      Username
                    </label>

                    <div className="col-md-12">
                      <input
                        name="Username"
                        ref={userNameRef}
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        value={formValue.Username}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                  <div className="form-group row mb-3">
                    <label className="col-md-12 mb-1">Password</label>

                    <div className="col-md-12 ">
                      <input
                        name="Password"
                        type="password"
                        className="form-control"
                        autoComplete="off"
                        value={formValue.Password}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>

                  <div className="">
                    <button
                      type="submit"
                      className="btn btn-primary col-md-12 mt-3"
                    >
                      Login
                    </button>
                  </div>
                  <label className="col-md-12 col-form-label mb-1 mb-3 mt-3">
                    <Link to={"/client/forgotpassword"}>Forgot password?</Link>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default ClientLogin;
