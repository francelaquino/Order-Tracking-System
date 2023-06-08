import { localeData } from "moment";
import React, { useState, useRef, useEffect } from "react";
import { ModalBody } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const Settings = ({ showModal, setShowModal, updatePagesize }) => {
  const [formValue, setFormValue] = useState({
    Orderperpage: "",
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    updatePagesize(formValue.Orderperpage);
    setShowModal(false);
    localeData();
  };

  return (
    <div>
      {showModal == false ? null : (
        <Modal show={true} size="md" onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Settings
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            <form>
              <div>
                <div className="form-group  mb-3">
                  <label className="col-sm-12 col-form-label">
                    No. of orders per page <span className="required">*</span>
                  </label>
                  <div className="col-sm-12 ">
                    <input
                      name="Orderperpage"
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      value={formValue.Orderperpage}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </ModalBody>
          <Modal.Footer>
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-primary btn-sm  m-1"
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Settings;
