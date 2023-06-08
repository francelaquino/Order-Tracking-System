import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { PUT, GET, request } from "../../api/ApiAdapter";
import moment from "moment";
import { useParams } from "react-router-dom";
import Loading from "../Widgets/Loading";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";

const EditClientDevice = () => {
  const [formValue, setFormValue] = useState({
    Id: "",
    Deviceid: "",
    Description: "",
    Active: "Active",
  });

  const { user } = useContext(UserContext);

  const [isReady, setIsReady] = useState(false);

  const [isBusy, setIsBusy] = useState(false);

  let { id } = useParams();
  const toast = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const getReaderDetails = async (e) => {
    try {
      const result = await request(
        `reader/getDetails/${user.Customerid}/${id}`,
        GET
      );
      setFormValue({
        Id: result.Id,
        Deviceid: result.Deviceid,
        Description: result.Description,
        Active: result.Active,
      });
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (e) => {
    if (!formValue.Deviceid) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        const currentDate = moment().format();
        const result = await request("reader/update", PUT, {
          Id: formValue.Id,
          Deviceid: formValue.Deviceid,
          Description: formValue.Description,
          Active: formValue.Active,
          Dateupdated: currentDate,
          Updatedby: user.Userid,
          Customerid: user.Customerid,
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
      getReaderDetails();
    }
  }, [user]);
  return (
    <div>
      <Loading show={isBusy || !isReady} />
      <PageBreadCrumb
        firstLevel={"Client"}
        secondLevel="Devices"
        thirdLevel={"Edit Device"}
      />
      <ContainerFluidLayout header={"Device Details"}>
        <form>
          <div>
            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">
                Device No. <span className="required">*</span>
              </label>
              <div className="col-md-8 ">
                <input
                  name="Deviceid"
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  value={formValue.Deviceid}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">Description </label>
              <div className="col-md-8 ">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  name="Description"
                  value={formValue.Description || ""}
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
          </div>
        </form>
      </ContainerFluidLayout>

      <Toast ref={toast} />
    </div>
  );
};

export default EditClientDevice;
