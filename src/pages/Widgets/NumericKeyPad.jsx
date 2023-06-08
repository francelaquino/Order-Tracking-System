import React, { useState, useRef, useEffect } from "react";
import { ModalBody, ModalFooter } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import BarcodeScanner from "./BarcodeScanner";

const NumericKeyPad = ({
  showModal,
  setShowModal,
  updateOrder,
  cancelOrder,
  completeOrder,
  currentOrderno,
  orders,
  deviceid,
}) => {
  const [numericValue, setNumericValue] = useState("");

  const [camera, setCamera] = useState(false);

  const onDetected = (result) => {
    setNumericValue(result);
    setCamera(!camera);
  };

  const toast = useRef(null);

  const handleClear = () => {
    confirmDialog({
      message: "Are you sure you want to cancel the order?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        setShowModal(false);
        let x = cancelOrder(numericValue);
        setCamera(false);
      },
      reject,
    });
  };

  const handleComplete = () => {
    confirmDialog({
      message: "Are you sure you want to complete the order?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => {
        setCamera(false);
        let x = completeOrder(numericValue);

        setShowModal(false);
      },
      reject,
    });
  };

  const reject = () => {};

  const handleClose = () => {
    setCamera(false);
    setShowModal(false);
  };

  const changeOrder = (ordernumber) => {
    if (numericValue === "" && ordernumber === "0") {
      return;
    }
    setNumericValue(numericValue + ordernumber);
  };

  const deleteOrder = () => {
    if (numericValue !== "") {
      setNumericValue(numericValue.slice(0, -1));
    }
  };

  const sendOrderNo = () => {
    let orderIndex = orders.findIndex((o) => o.Orderno == numericValue);
    if (orderIndex >= 0) {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Order no. already used",
      });
    } else {
      setCamera(false);
      let x = updateOrder(numericValue);

      setShowModal(false);
    }
  };

  useEffect(() => {
    setNumericValue(currentOrderno);
  }, [showModal]);

  return (
    <div>
      {showModal === false ? null : (
        <Modal show={true} size="md" onHide={handleClose}>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Device No. {deviceid}
            </Modal.Title>
          </Modal.Header>
          <ModalBody>
            <div className="keypad">
              <div className="row">
                <div className="col-md-12">
                  <input
                    type="number"
                    readOnly
                    className="form-control numericValue"
                    placeholder="Enter Order No."
                    value={numericValue}
                  ></input>
                </div>
              </div>
              {!camera && currentOrderno === "" ? (
                <>
                  <div className="row">
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("7")}
                        className="btn btn-secondary btn-lg"
                      >
                        7
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("8")}
                        className="btn btn-secondary btn-lg"
                      >
                        8
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("9")}
                        className="btn btn-secondary btn-lg"
                      >
                        9
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={deleteOrder}
                        className="btn btn-secondary btn-lg"
                      >
                        Del
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("4")}
                        className="btn btn-secondary btn-lg "
                      >
                        4
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("5")}
                        className="btn btn-secondary btn-lg"
                      >
                        5
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("6")}
                        className="btn btn-secondary btn-lg"
                      >
                        6
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        disabled
                        className="btn btn-secondary btn-lg"
                      ></button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("3")}
                        className="btn btn-secondary btn-lg"
                      >
                        3
                      </button>
                    </div>

                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("2")}
                        className="btn btn-secondary btn-lg"
                      >
                        2
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("1")}
                        className="btn btn-secondary btn-lg"
                      >
                        1
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        disabled
                        className="btn btn-secondary btn-lg"
                      ></button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        disabled
                        className="btn btn-secondary btn-lg"
                      ></button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        onClick={() => changeOrder("0")}
                        className="btn btn-secondary btn-lg"
                      >
                        0
                      </button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        disabled
                        className="btn btn-secondary btn-lg"
                      ></button>
                    </div>
                    <div className="col-sm-3 text-center">
                      <button
                        type="button"
                        disabled
                        className="btn btn-secondary btn-lg"
                      ></button>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {camera && <BarcodeScanner onDetected={onDetected} />}
          </ModalBody>
          <ModalFooter>
            <div className="row">
              {currentOrderno !== "" ? (
                <>
                  <button
                    type="button"
                    className="col-md-12 btn  btn-secondary btn-primary"
                    onClick={() => {
                      handleComplete();
                    }}
                  >
                    Complete Order
                  </button>
                  <button
                    type="button"
                    className="col-md-12 btn btn-secondary btn-red"
                    onClick={() => {
                      handleClear();
                    }}
                  >
                    Cancel Order
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="col-md-12 btn  btn-secondary btn-primary"
                    onClick={() => setCamera(!camera)}
                  >
                    {camera ? "Stop Reading Barcode" : "Read Barcode"}
                  </button>
                  <button
                    type="button"
                    className="col-md-12 btn  btn-secondary btn-primary"
                    onClick={() => {
                      sendOrderNo();
                    }}
                  >
                    Create Order
                  </button>
                </>
              )}
              <button
                type="button"
                className="col-md-12 btn btn-secondary"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </button>
            </div>
          </ModalFooter>
        </Modal>
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
    </div>
  );
};

export default NumericKeyPad;
