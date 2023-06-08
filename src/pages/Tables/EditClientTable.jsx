import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { POST, GET, request } from "../../api/ApiAdapter";
import moment from "moment";
import { useParams } from "react-router-dom";
import Loading from "../Widgets/Loading";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import $ from "jquery";
window.JQuery = $;
const EditClientTable = () => {
  const [formValue, setFormValue] = useState({
    Tablename: "",
    Tag: "",
    Description: "",
    Customerid: "",
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

  const getDetails = async (e) => {
    try {
      const result = await request(
        `table/getDetails/${user.Customerid}/${id}`,
        GET
      );
      setFormValue({
        Id: result.Id,
        Tablename: result.Tablename,
        Tag: result.Tag,
        Description: result.Description,
        Active: result.Active,
      });

      $("#RfidTag").val(result.Tag);
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onSubmit = async (e) => {
    formValue.Tag = $("#RfidTag").val();
    if (!formValue.Tag || !formValue.Tablename) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        const currentDate = moment().format();
        const result = await request("table/update", POST, {
          Id: formValue.Id,
          Tablename: formValue.Tablename,
          Tag: formValue.Tag,
          Description: formValue.Description,
          Active: formValue.Active,
          Password: formValue.Password,
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
      getDetails();
    }
  }, [user]);
  return (
    <div>
      <Loading show={isBusy || !isReady} />
      <PageBreadCrumb
        firstLevel={"Client"}
        secondLevel="Tables"
        thirdLevel={"Edit Table"}
      />
      <ContainerFluidLayout header={"Table Details"}>
        <form>
          <div>
            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">
                Tag<span className="required">*</span>
              </label>
              <div className="col-md-8 ">
                <div className="input-group">
                  <input
                    name="Tag"
                    id="RfidTag"
                    type="text"
                    className="form-control"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-md-4 col-form-label">
                Table No.<span className="required">*</span>
              </label>
              <div className="col-md-8 ">
                <input
                  name="Tablename"
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  value={formValue.Tablename}
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
                  value={formValue.Description}
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

export default EditClientTable;
