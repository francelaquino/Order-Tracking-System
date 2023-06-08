import React from "react";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import { POST, GET, request } from "../../api/ApiAdapter";
import Modal from "react-bootstrap/Modal";
import { ConfirmDialog } from "primereact/confirmdialog";
import moment from "moment";
import Loading from "../Widgets/Loading";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ResetDeviceSettings = ({ showModal, setShowModal, Id, Customerid }) => {
  const [formValue, setFormValue] = useState({
    Wifi: "",
    Wifipassword: "",
    Heartbittimeout: "",
    Apiendpoint: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(UserContext);

  const toast = useRef(null);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const loadData = async () => {
    try {
      if (!showModal) {
      } else {
        const result = await request(
          `reader/getdevicedetails/${Customerid}/${Id}`,
          GET
        );

        setFormValue({
          Wifi: result.Wifi,
          Wifipassword: result.Wifipassword,
          Heartbittimeout: result.Heartbittimeout,
          Apiendpoint: result.Apiendpoint,
        });

        setIsLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (e) => {
    if (
      !formValue.Wifi ||
      !formValue.Wifipassword ||
      !formValue.Heartbittimeout ||
      !formValue.Apiendpoint
    ) {
      toast.current.show({
        severity: "error",
        summary: "Erro Message",
        detail: "Please fill required field(s)",
      });
    } else {
      try {
        const currentDate = moment().format();
        const result = await request("reader/updateconfig", POST, {
          Id: Id,
          Wifi: formValue.Wifi,
          Wifipassword: formValue.Wifipassword,
          Heartbittimeout: formValue.Heartbittimeout,
          Apiendpoint: formValue.Apiendpoint,
          Dateupdated: currentDate,
          Updatedby: user.Userid,
          Customerid: Customerid,
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

  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    loadData();
  }, [showModal]);

  return (
    <div>
      {!showModal ? null : (
        <div>
          <Loading show={isLoading} />
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>Device Details</Modal.Header>
            <Modal.Body>
              <Toast ref={toast} />

              <form>
                <div className="card-body">
                  <div className="form-group row mb-3">
                    <label className="col-sm-4 col-form-label">
                      Wifi Name <span className="required">*</span>
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        name="Wifi"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        value={formValue.Wifi}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-sm-4 col-form-label">
                      Wifi Password <span className="required">*</span>
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        name="Wifipassword"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        value={formValue.Wifipassword}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-sm-4 col-form-label">
                      Hearbit Timeout <span className="required">*</span>
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        name="Heartbittimeout"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        value={formValue.Heartbittimeout}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>

                  <div className="form-group row mb-3">
                    <label className="col-sm-4 col-form-label">
                      Api Endpoint <span className="required">*</span>
                    </label>
                    <div className="col-sm-8 ">
                      <input
                        name="Apiendpoint"
                        type="text"
                        className="form-control"
                        autoComplete="off"
                        value={formValue.Apiendpoint}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <div className="row col-md-12">
                <div className="text-left col-sm-6">
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="btn btn-primary  m-1 "
                  >
                    Save
                  </button>
                </div>
                <div className="text-right col-sm-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn btn-primary  m-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      )}
      <ConfirmDialog />
    </div>
  );
};

export default ResetDeviceSettings;
