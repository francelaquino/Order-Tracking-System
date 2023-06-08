import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { POST, request, GET } from "../../api/ApiAdapter";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { useContext } from "react";
import Loading from "../Widgets/Loading";
import { UserContext } from "../../context/UserContext";

const ClientPasswordReset = () => {
  const [formValue, setFormValue] = useState({
    Username: "",
    Currentpassword: "",
    Newpassword: "",
    Retypepassword: "",
  });

  const toast = useRef(null);

  const [isReady, setIsReady] = useState(false);

  const [isBusy] = useState(false);

  const { user } = useContext(UserContext);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const getUserDetails = async (e) => {
    try {
      const result = await request(
        `client/getuserdetails/${user.Customerid}/${user.Userid}`,
        GET
      );
      setFormValue({
        Username: result.Username,
        Currentpassword: "",
        Newpassword: "",
        Retypepassword: "",
      });
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    if (
      !formValue.Username ||
      !formValue.Currentpassword ||
      !formValue.Newpassword ||
      !formValue.Retypepassword
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      if (formValue.Newpassword !== formValue.Retypepassword) {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Password mismatch",
        });
      } else {
        try {
          const result = await request("client/resetpassword", POST, {
            Id: user.Userid,
            Customerid: user.Customerid,
            Currentpassword: formValue.Currentpassword,
            Newpassword: formValue.Newpassword,
          });
          if (result.StatusCode === 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: result.Message,
            });

            setFormValue({
              Username: user.Username,
              Currentpassword: "",
              Newpassword: "",
              Retypepassword: "",
            });
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
    }
  };

  useEffect(() => {
    if (user.Currentprofile) {
      getUserDetails();
    }
  }, [user]);
  return (
    <div>
      <Loading show={isBusy || !isReady} />
      <PageBreadCrumb
        firstLevel="Client"
        secondLevel="Profile"
        thirdLevel="Reset Password"
      />

      <ContainerFluidLayout header={"Profile Details"} fullWidth={false}>
        <form>
          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">Username</label>
            <div className="col-md-8 ">
              <input
                name="Username"
                type="text"
                className="form-control"
                autoComplete="off"
                value={formValue.Username}
                onChange={(e) => onChange(e)}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Current Password <span className="required">*</span>
            </label>
            <div className="col-md-8 ">
              <input
                name="Currentpassword"
                type="password"
                className="form-control"
                autoComplete="off"
                value={formValue.Currentpassword}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              New Password <span className="required">*</span>
            </label>
            <div className="col-md-8 ">
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
            <label className="col-md-4 col-form-label">Re-type Password</label>
            <div className="col-md-8 ">
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

          <div className="text-right">
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-primary  m-1"
            >
              Submit
            </button>
          </div>
        </form>
      </ContainerFluidLayout>

      <Toast ref={toast} />
    </div>
  );
};

export default ClientPasswordReset;
