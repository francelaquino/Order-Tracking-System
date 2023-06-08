import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { POST, request, GET } from "../../api/ApiAdapter";
import { useParams } from "react-router-dom";
import moment from "moment";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { useContext } from "react";
import Loading from "../Widgets/Loading";
import { UserContext } from "../../context/UserContext";

const EditClientUser = () => {
  const [formValue, setFormValue] = useState({
    Username: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Mobileno: "",
    Active: "Active",
  });

  const toast = useRef(null);

  const [isReady, setIsReady] = useState(false);

  const [isBusy, setIsBusy] = useState(false);

  const { user } = useContext(UserContext);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  let { id } = useParams();

  const getUserDetails = async (e) => {
    try {
      const result = await request(
        `client/getuserdetails/${user.Customerid}/${id}`,
        GET
      );
      setFormValue({
        Id: result.Id,
        Username: result.Username,
        Firstname: result.Firstname,
        Email: result.Email,
        Mobileno: result.Mobileno,
        Lastname: result.Lastname,
        Active: result.Active,
      });
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    if (
      !formValue.Username ||
      !formValue.Firstname ||
      !formValue.Lastname ||
      !formValue.Active
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        const currentDate = moment().format();
        const result = await request("client/updateuser", POST, {
          Id: id,
          Username: formValue.Username,
          Firstname: formValue.Firstname,
          Lastname: formValue.Lastname,
          Email: formValue.Email,
          Mobileno: formValue.Mobileno,
          Active: formValue.Active,
          Datecreated: currentDate,
          Createdby: user.Userid,
          Dateupdated: currentDate,
          Updatedby: user.Userid,
        });
        if (result.StatusCode === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: result.Message,
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
  };

  useEffect(() => {
    if (user.Customerid) {
      getUserDetails();
    }
  }, [user]);
  return (
    <div>
      <Loading show={isBusy || !isReady} />
      <PageBreadCrumb
        firstLevel="Home"
        secondLevel="Users"
        thirdLevel="Edit User"
      />

      <ContainerFluidLayout header={"User Details"} fullWidth={false}>
        <form>
          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Username <span className="required">*</span>
            </label>
            <div className="col-md-8 ">
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
            <label className="col-md-4 col-form-label">
              First Name <span className="required">*</span>
            </label>
            <div className="col-md-8 ">
              <input
                name="Firstname"
                type="text"
                className="form-control"
                autoComplete="off"
                value={formValue.Firstname}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Last Name <span className="required">*</span>
            </label>
            <div className="col-md-8 ">
              <input
                name="Lastname"
                type="text"
                className="form-control"
                autoComplete="off"
                value={formValue.Lastname}
                onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
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
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Active<span className="required">*</span>
            </label>
            <div className="col-md-8 ">
              <select
                className="form-control form-control"
                autoComplete="off"
                name="Active"
                value={formValue.Active}
                onChange={(e) => onChange(e)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-primary  m-1"
            >
              Update
            </button>
          </div>
        </form>
      </ContainerFluidLayout>

      <Toast ref={toast} />
    </div>
  );
};

export default EditClientUser;
