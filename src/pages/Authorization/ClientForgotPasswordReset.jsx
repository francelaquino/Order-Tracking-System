import React, { useContext, useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ClientResetPasswordRequest,
  ClientCheckPassworResetRequest,
} from "./AuthorizationHandler";

const ClientForgotPasswordReset = () => {
  const [formValue, setFormValue] = useState({
    Newpassword: "",
    Retypepassword: "",
    Customerid: "",
    Id: "",
    Token: "",
  });

  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [invalidtMessage, setInvalidMessage] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const toast = useRef(null);

  const params = useParams();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const checkRequest = async () => {
    formValue.Customerid = params.cid;
    formValue.Id = params.id;
    formValue.Token = searchParams.get("key");
    const result = await ClientCheckPassworResetRequest(formValue);

    if (result.StatusCode === 200) {
      setInvalidMessage("");
    } else {
      setInvalidMessage(result.Message);
    }

    setIsReady(true);
  };
  const onSubmit = async (e) => {
    if (!formValue.Newpassword || !formValue.Retypepassword) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      formValue.Customerid = params.cid;
      formValue.Id = params.id;
      formValue.Token = searchParams.get("key");

      const result = await ClientResetPasswordRequest(formValue);

      if (result.StatusCode === 200) {
        setFormValue({
          Newpassword: "",
          Retypepassword: "",
          Customerid: "",
          Id: "",
          Token: "",
        });

        setIsDone(true);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: result.Message,
        });
      }
    }
  };

  useEffect(() => {
    checkRequest();
  });

  return (
    <div className="login-form">
      {isReady ? (
        <div>
          <div className="col-md-12">
            <div className="card mt-5 pad-20">
              <div className="card-body ">
                <div>
                  <div className="text-center">
                    <img src="/images/nvs_logo.jpeg" />
                  </div>

                  {isDone ? (
                    <div>
                      <label className="col-md-12 col-form-label mb-1 text-center mb-3 mt-3">
                        <h3>Password Changed</h3>
                      </label>
                      <div className=" mb-3 font-13 fore-color-green center">
                        Please log in with the new password
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-primary col-md-12 mt-3"
                          onClick={() => {
                            navigate("/client/login");
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="col-md-12 col-form-label mb-1 text-center mb-3 mt-3">
                        <h3>Password Reset</h3>
                      </label>
                      {invalidtMessage !== "" ? (
                        <div className=" mb-3 font-13 fore-color-green center">
                          {invalidtMessage}
                        </div>
                      ) : (
                        <div>
                          <div className="form-group row mb-3">
                            <label className="col-md-12 mb-1">
                              New password
                            </label>

                            <div className="col-md-12 ">
                              <input
                                name="Newpassword"
                                type="password"
                                className="form-control"
                                autoComplete="off"
                                value={formValue.Newpassword}
                                onChange={(e) => onChange(e)}
                              />
                            </div>
                          </div>

                          <div className="form-group row mb-3">
                            <label className="col-md-12 mb-1">
                              Re-type password
                            </label>

                            <div className="col-md-12 ">
                              <input
                                name="Retypepassword"
                                type="password"
                                className="form-control"
                                autoComplete="off"
                                value={formValue.Retypepassword}
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
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Toast ref={toast} />
    </div>
  );
};

export default ClientForgotPasswordReset;
