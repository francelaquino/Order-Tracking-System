import React, { useEffect } from "react";
import { useState, useRef } from "react";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { request, GET } from "../../api/ApiAdapter";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { useContext } from "react";
import Loading from "../Widgets/Loading";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ClientUserProfile = () => {
  const [formValue, setFormValue] = useState({
    Username: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Mobileno: "",
  });

  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);

  const [isBusy] = useState(false);

  const { user } = useContext(UserContext);

  const getUserDetails = async (e) => {
    try {
      const result = await request(
        `client/getuserdetails/${user.Customerid}/${user.Userid}`,
        GET
      );
      setFormValue({
        Username: result.Username,
        Firstname: result.Firstname,
        Email: result.Email,
        Mobileno: result.Mobileno,
        Lastname: result.Lastname,
      });
      setIsReady(true);
    } catch (e) {
      console.log(e);
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
      <PageBreadCrumb firstLevel="Client" secondLevel="Profile" />

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
                readOnly
              />
            </div>
          </div>
          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">First Name</label>
            <div className="col-md-8 ">
              <input
                name="Firstname"
                type="text"
                className="form-control"
                readOnly
                value={formValue.Firstname}
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">Last Name</label>
            <div className="col-md-8 ">
              <input
                name="Lastname"
                type="text"
                className="form-control"
                autoComplete="off"
                value={formValue.Lastname}
                readOnly
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">Email</label>
            <div className="col-md-8 ">
              <input
                name="Email"
                type="text"
                className="form-control"
                autoComplete="off"
                value={formValue.Email}
                readOnly
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">Mobile No.</label>
            <div className="col-md-8 ">
              <input
                name="Mobileno"
                type="text"
                className="form-control"
                autoComplete="off"
                value={formValue.Mobileno}
                readOnly
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              className="btn btn-primary  m-1"
              onClick={() => {
                navigate("/client/resetpassword");
              }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </ContainerFluidLayout>
    </div>
  );
};

export default ClientUserProfile;
