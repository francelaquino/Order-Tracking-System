import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { POST, request } from "../../api/ApiAdapter";
import moment from "moment";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [formValue, setFormValue] = useState({
    Domain: "",
    Username: "",
    Password: "",
  });

  const navigate = useNavigate();
  const [count, setCount] = useState("");
  let userDetail = {
    Customerid: "",
    Userid: "",
    Username: "",
    Customer: "",
    Role: "",
  };

  const { updateUser } = useContext(UserContext);
  const toast = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const saveUser = () => {
    updateUser(userDetail);
    //   Customerid: userDetail.Customerid,
    //   Userid: userDetail.Userid,
    //   Username: userDetail.Username,
    //   Customer: userDetail.Customer,
    //   Authorization: userDetail.Authorization,
    // });

    navigate("/orders");
  };
  const onSubmit = async (e) => {
    if (!formValue.Domain || !formValue.Username || !formValue.Password) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        const currentDate = moment().format();
        const result = await request("customer/verifycredential", POST, {
          Username: formValue.Username,
          Domain: formValue.Domain,
          Password: formValue.Password,
        });
        if (result.StatusCode === 200) {
          userDetail.Role = result.Role;
          userDetail.Customerid = result.Customerid;
          userDetail.Userid = result.Userid;
          userDetail.Username = result.Username;
          userDetail.Customer = result.Customer;

          saveUser();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: result.Message,
          });
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
            <div className="card-body ">
              <div>
                <label className="col-md-12 col-form-label mb-1 text-center mb-3 mt-3">
                  <h3>Login</h3>
                </label>
                <div className="form-group row mb-3">
                  <label className="col-md-12 col-form-label mb-1">
                    Customer Id
                  </label>

                  <div className="col-md-12">
                    <input
                      name="Domain"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={formValue.Domain}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <div className="form-group row mb-3">
                  <label className="col-md-12 col-form-label mb-1">
                    Username
                  </label>

                  <div className="col-md-12">
                    <input
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
                    type="button"
                    onClick={onSubmit}
                    className="btn btn-primary col-md-12 mt-3"
                  >
                    Login
                  </button>
                </div>
                <label className="col-md-12 col-form-label mb-1 mb-3 mt-3">
                  Forgot password?
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default Login;
