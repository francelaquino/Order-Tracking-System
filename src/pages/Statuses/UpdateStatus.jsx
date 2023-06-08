import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { PUT, GET, request } from "../../api/ApiAdapter";
import Loading from "../Widgets/Loading";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UpdateStatus = () => {
  const [formValue, setFormValue] = useState({
    Ontime_mins: "",
    Warning_mins: "",
    Delay_mins: "",
  });

  const toast = useRef(null);

  const { user } = useContext(UserContext);

  const [isReady, setIsReady] = useState(false);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const getStatus = async (e) => {
    try {
      const result = await request(`status/getstatus/${user.Customerid}`, GET);
      setFormValue({
        Id: result.Id,
        Ontime_mins: result.Ontime_mins,
        Warning_mins: result.Warning_mins,
        Delay_mins: result.Delay_mins,
      });
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    if (
      !formValue.Ontime_mins ||
      !formValue.Warning_mins ||
      formValue.Ontime_mins <= 0 ||
      formValue.Warning_mins <= 0
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        formValue.Delay_mins =
          Number(formValue.Warning_mins) + Number(formValue.Ontime_mins);
        const currentDate = moment().format();

        const result = await request("status/updatestatus", PUT, {
          Id: "",
          Ontime_mins: formValue.Ontime_mins,
          Warning_mins: formValue.Warning_mins,
          Delay_mins: formValue.Delay_mins,
          Datecreated: currentDate,
          Createdby: user.Userid,
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
    if (user.Currentprofile) {
      getStatus();
    }
  }, [user]);
  return (
    <div>
      <Loading show={!isReady} />
      <PageBreadCrumb
        firstLevel={"Client"}
        secondLevel="Settings"
        thirdLevel={"Status"}
      />

      <ContainerFluidLayout fullWidth={false} header="Status Details">
        <form>
          <div>
            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">
                Ontime <span className="required">*</span>
              </label>

              <div className="col-md-7 ">
                <input
                  name="Ontime_mins"
                  type="number"
                  className="form-control"
                  autoComplete="off"
                  value={formValue.Ontime_mins}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-md-1">
                <div className="ontime-status"></div>
              </div>
            </div>

            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">
                Warning <span className="required">*</span>
              </label>
              <div className="col-md-7 ">
                <input
                  name="Warning_mins"
                  type="number"
                  className="form-control"
                  autoComplete="off"
                  value={formValue.Warning_mins}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="col-md-1">
                <div className="warning-status"></div>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">
                Delay <span className="required">*</span>
              </label>
              <div className="col-md-7 ">
                <input
                  type="number"
                  name="Delay_mins"
                  className="form-control"
                  disabled
                  autoComplete="off"
                  value={
                    Number(formValue.Warning_mins) +
                    Number(formValue.Ontime_mins)
                  }
                />
              </div>
              <div className="col-md-1">
                <div className="delay-status"></div>
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
            </div>
          </div>
        </form>
      </ContainerFluidLayout>

      <Toast ref={toast} />
    </div>
  );
};

export default UpdateStatus;
