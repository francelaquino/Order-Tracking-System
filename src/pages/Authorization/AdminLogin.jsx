import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { UserContext } from "../../context/UserContext";
import { AuthenticateAdmim } from "./AuthorizationHandler";

const AdminLogin = () => {
  const [formValue, setFormValue] = useState({
    Username: "",
    Password: "",
  });

  const { updateUser } = useContext(UserContext);
  const userNameRef = useRef(null);

  const toast = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const updateUserDetails = (result) => {
    let userDetail = {
      Role: result.Role,
      Userid: result.Userid,
      Username: result.Username,
      Currentprofile: result.Role,
      IsLogged: true,
    };

    updateUser(userDetail);

    localStorage.setItem("jwtToken", result.AccessToken);

    window.location.href = "/admin/clients";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.Username || !formValue.Password) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Invalid username or bad password",
      });
      setFormValue({ Username: "", Password: "" });
    } else {
      try {
        const result = await AuthenticateAdmim(formValue);

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
                        ref={userNameRef}
                        name="Username"
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

export default AdminLogin;
