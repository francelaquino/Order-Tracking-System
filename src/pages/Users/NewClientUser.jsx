import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { POST, request } from "../../api/ApiAdapter";
import moment from "moment";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useAsyncError } from "react-router-dom";

const NewClientUser = () => {
  const [formValue, setFormValue] = useState({
    Username: "",
    Firstname: "",
    Lastname: "",
    Email: "",
    Mobileno: "",
    Password: "",
    Retypepassword: "",
    Active: "Active",
    Role: "ClientAdmin",
  });

  const toast = useRef(null);

  const { user } = useContext(UserContext);
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log(formValue);
    if (
      !formValue.Username ||
      !formValue.Firstname ||
      !formValue.Lastname ||
      !formValue.Password ||
      !formValue.Retypepassword ||
      !formValue.Role ||
      !formValue.Active
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      if (formValue.Password !== formValue.Retypepassword) {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Password mismatch",
        });
      } else {
        try {
          const currentDate = moment().format();
          const result = await request("client/adduser", POST, {
            Id: "",
            Username: formValue.Username,
            Firstname: formValue.Firstname,
            Lastname: formValue.Lastname,
            Email: formValue.Email,
            Mobileno: formValue.Mobileno,
            Active: formValue.Active,
            Datecreated: currentDate,
            Password: formValue.Password,
            Role: formValue.Role,
            Customerid: user.Customerid,
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
            onClear();
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

  const onClear = () => {
    setFormValue({
      Username: "",
      Lastname: "",
      Firstname: "",
      Email: "",
      Mobileno: "",
      Password: "",
      Retypepassword: "",
      Role: "",
      Active: "Active",
    });
  };

  useEffect(() => {}, [user]);
  return (
    <div>
      <PageBreadCrumb
        firstLevel="Client"
        secondLevel="Users"
        thirdLevel="New User"
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
              Password <span className="required">*</span>
            </label>
            <div className="col-md-8 ">
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

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Re-type Password <span className="required">*</span>
            </label>
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

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Authorization<span className="required">*</span>
            </label>
            <div className="col-md-8 ">
              <select
                className="form-control form-control"
                name="Role"
                value={formValue.Role}
                onChange={(e) => onChange(e)}
              >
                <option value="ClientAdmin">Admin</option>
                <option value="ClientUser">Client</option>
              </select>
            </div>
          </div>

          <div className="form-group row mb-3">
            <label className="col-md-4 col-form-label">
              Active<span className="required">*</span>
            </label>
            <div className="col-md-8 ">
              <select
                className="form-control form-control"
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
              Save
            </button>
            <button
              type="button"
              onClick={onClear}
              className="btn btn-secondary "
            >
              Clear
            </button>
          </div>
        </form>
      </ContainerFluidLayout>

      <Toast ref={toast} />
    </div>
  );
};

export default NewClientUser;
