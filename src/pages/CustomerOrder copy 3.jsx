import React, { useState, useRef, useEffect } from "react";
import { PUT, GET, request } from "../api/ApiAdapter";
import moment from "moment";
import NumericKeyPad from "./Widgets/NumericKeyPad";
import { Toast } from "primereact/toast";
var offset = 0;
const CustomerOrder = ({}) => {
  //const [offset, setOffset] = useState(0);
  const [pagesize, setPagesize] = useState(15);
  const [isFirstpage, setIsFirstpage] = useState(true);
  const [isLastpage, setIsLastpage] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showKeypad, setShowKeypad] = useState(false);
  const [deviceid, setDeviceid] = useState("");
  const [currentOrderno, setCurrentOrderno] = useState("");

  const toast = useRef(null);

  const updateOrder = async (neworderno) => {
    try {
      const result = await request("order/updateorderno", PUT, {
        Orderno: neworderno,
        Deviceid: deviceid,
      });

      if (result.StatusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Order no has been updated",
        });
        loadData();
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
  };

  const clearAlert = async () => {
    try {
      const result = await request("order/clearalert", PUT, {
        Deviceid: deviceid,
      });

      if (result.StatusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Notification has been cleared",
        });
        loadData();
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
  };

  // const updateOrder = async (divice, orderno) => {
  //   try {
  //     const result = await request("order/updateorderno", PUT, {
  //       Orderno: orderno,
  //       Deviceid: divice,
  //     });
  //     if (result.StatusCode === 200) {
  //       loadData();
  //       //toast.current.show({ severity: 'success', summary: 'Success Message', detail: result.Message });
  //     } else {
  //       //toast.current.show({ severity: 'error', summary: 'Error Message', detail: result.Message });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const onUpdate = (orderno) => {
    loadData();
  };

  const nextPage = () => {
    offset = offset + 1;
    loadData();
  };

  const prevPage = () => {
    offset = offset - 1;
    loadData();
  };
  const loadData = async () => {
    try {
      const result = await request(
        `order/getorders/` + offset + `/` + pagesize,
        GET
      );
      setIsFirstpage(result.first);
      setIsLastpage(result.last);
      setOrders(result.content);
    } catch (e) {
      console.log(e);
    }
  };

  const prepareOrder = (deviceid, order) => {
    setShowKeypad(true);
    setDeviceid(deviceid);
    setCurrentOrderno(order);
  };

  const updateState = (index) => (e) => {
    const newArray = orders.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      } else {
        return item;
      }
    });
    setOrders(newArray);
  };
  const refresh = () => {
    loadData();
    setInterval(() => {
      loadData();
    }, 3000);
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <NumericKeyPad
        showModal={showKeypad}
        updateOrder={updateOrder}
        setShowModal={setShowKeypad}
        currentOrderno={currentOrderno}
        clearAlert={clearAlert}
      />
      <div className="m-2">
        <div className="body">
          {orders.map((order, i) => {
            return (
              <span key={order.deviceid}>
                <div className={"col-md-4 orders status" + order.Status}>
                  <div className="col-sm-4 ordernnumber">
                    <span>Order</span>

                    <span
                      className="number"
                      onClick={() =>
                        prepareOrder(order.Deviceid, order.Orderno)
                      }
                    >
                      {order.Orderno}
                    </span>
                  </div>
                  <div className="col-sm-8 tablenumber">
                    <span className="no">Table # {order.Tableno}</span>
                    {order.IsAlerted === true ? (
                      <span className="alarm-image">
                        <img src="../images/alarm.png" />
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="deviceno">Device : {order.Deviceid}</span>
                    <span className="time">
                      {moment(order.Lastupdate).isValid() === false ||
                      order.Orderno === ""
                        ? ""
                        : moment(order.Lastupdate).format("LT")}
                    </span>
                  </div>
                </div>
              </span>
            );
          })}
        </div>
        <Toast ref={toast} />
        <div className="header">
          <div className="row">
            <div className="col-md-9"></div>
            <div className="col-md-3 p-4 text-right">
              <button
                onClick={prevPage}
                className="btn btn-primary"
                disabled={
                  isFirstpage || (isFirstpage == true && isLastpage === true)
                }
              >
                Previous
              </button>
              &nbsp;
              <button
                onClick={nextPage}
                className="btn btn-primary"
                disabled={
                  isLastpage || (isFirstpage == true && isLastpage === true)
                }
              >
                Next
              </button>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrder;
