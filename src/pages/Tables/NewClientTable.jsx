import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import { Toast } from "primereact/toast";

import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CreateNewTable } from "./TableHandler";
import $ from "jquery";
window.JQuery = $;

const NewClientTable = () => {
  const [formValue, setFormValue] = useState({
    Tablename: "",
    Tag: "",
    Description: "",
    Active: "Active",
  });

  const { user } = useContext(UserContext);

  const toast = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    formValue.Tag = $("#RfidTag").val();
    if (!formValue.Tablename || !formValue.Tag) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        const result = await CreateNewTable(formValue, user);

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
  };

  const onClear = () => {
    setFormValue({
      Tablename: "",
      Tag: "",
      Description: "",
      Active: "Active",
    });

    $("#RfidTag").val("");
  };

  useEffect(() => {}, [user]);
  return (
    <div>
      <PageBreadCrumb
        firstLevel={"Clients"}
        secondLevel="Tables"
        thirdLevel={"New Table"}
      />
      <ContainerFluidLayout fullWidth={false} header="Table Details">
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
              <button
                type="button"
                onClick={onClear}
                className="btn btn-secondary "
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </ContainerFluidLayout>

      <Toast ref={toast} />
    </div>
  );
};
export default NewClientTable;
