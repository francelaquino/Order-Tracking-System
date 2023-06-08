import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Loading from "../Widgets/Loading";

import { ClientResetPassword } from "./AuthorizationHandler";

const ClientForgotPassword = () => {
  const [isReady, setIsReady] = useState(true);
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [formValue, setFormValue] = useState({
    Email: "",
  });

  const toast = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    if (!formValue.Email) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Invalid email address",
      });
    } else {
      setIsReady(false);
      const result = await ClientResetPassword(formValue);

      if (result.StatusCode === 200) {
        setFormValue({ Email: "" });

        setIsLinkSent(true);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: result.Message,
        });
      }

      setIsReady(true);
    }
  };

  return (
    <>
      <Loading show={!isReady} />
      <div className="login-form">
        <div>
          <div className="col-md-12">
            <div className="card mt-5 pad-20">
              <div className="card-body ">
                <div>
                  <div className="text-center">
                    <img src="/images/nvs_logo.jpeg" />
                  </div>
                  <label className="col-md-12 col-form-label mb-1 text-center mb-3 mt-3">
                    <h3>Forgot Password</h3>
                  </label>
                  {isLinkSent ? (
                    <div>
                      <div className=" mb-3 font-13 fore-color-green center">
                        We have sent the password reset instruction to your
                        email
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-primary col-md-12 mt-3"
                          onClick={() => {
                            setIsLinkSent(false);
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className=" mb-3 font-13">
                        Enter the email address associated with your account and
                        we'll send you a link to reset your password.
                      </div>

                      <div className="form-group row mb-3">
                        <label className="col-md-12 col-form-label mb-1">
                          Email Address
                        </label>

                        <div className="col-md-12">
                          <input
                            name="Email"
                            type="email"
                            className="form-control"
                            autoComplete="off"
                            value={formValue.Email}
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
                          Reset Password
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toast ref={toast} />
      </div>
    </>
  );
};

export default ClientForgotPassword;
