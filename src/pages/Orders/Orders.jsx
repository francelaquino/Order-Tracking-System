import React, { useState, useRef, useEffect } from "react";
import { POST, GET, request } from "../../api/ApiAdapter";
import moment from "moment";
import NumericKeyPad from "../Widgets/NumericKeyPad";
import "./Order.css";
import { Toast } from "primereact/toast";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { LoadOrders, UpdateOrder } from "./OrderHandlers";
import $ from "jquery";

var offset = 0;
var stompClient = null;

const Orders = ({}) => {
  const [pagesize, setPagesize] = useState(15);
  const [isFirstpage, setIsFirstpage] = useState(true);
  const [isLastpage, setIsLastpage] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showKeypad, setShowKeypad] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [deviceid, setDeviceid] = useState("");
  const [currentOrderno, setCurrentOrderno] = useState("");

  const { user } = useContext(UserContext);

  const toast = useRef(null);

  const lastSync = useRef("");

  const connect = () => {
    let Sock = new SockJS(process.env.REACT_APP_WS_ENDPOINT);
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/order/sync", onSync);
  };

  const onSync = (payload) => {
    const msg = JSON.parse(payload.body);
    if (msg.type === "TRIGGER" && showKeypad === false) {
      $("#o2" + msg.message).trigger("click");
    } else {
      loadOrders();
    }
  };

  const onError = (err) => {
    console.log("Connection error");
    setTimeout(() => {
      connect();
    }, 2000);
  };

  const updateOrder = async (neworderno) => {
    try {
      let orderIndex = orders.findIndex((o) => o.Orderno == neworderno);
      if (orderIndex >= 0) {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Order no. already used",
        });
      } else {
        const result = await UpdateOrder(neworderno, deviceid, user.Customerid);

        if (result.StatusCode === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Order no has been updated",
          });
          loadOrders();
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: result.Message,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const completeOrder = async (neworderno) => {
    try {
      const result = await request("reader/completeorder", POST, {
        Orderno: neworderno,
        Deviceid: deviceid,
        Customerid: user.Customerid,
      });

      if (result.StatusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Order no has been updated",
        });
        loadOrders();
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
  const cancelOrder = async (neworderno) => {
    try {
      const result = await request("reader/cancelorder", POST, {
        Orderno: neworderno,
        Deviceid: deviceid,
        Customerid: user.Customerid,
      });

      if (result.StatusCode === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Order no has been updated",
        });
        loadOrders();
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

  const nextPage = () => {
    offset = offset + 1;
    loadOrders();
  };

  const prevPage = () => {
    offset = offset - 1;
    loadOrders();
  };

  const syncData = async () => {
    try {
      if (lastSync.current == null || lastSync.current == "") {
        lastSync.current = moment().format();
      }

      const result = await request(
        `sync/refreshdashboard/` + lastSync.current,
        GET
      );

      if (result.isdashboardrefresh === true) {
        lastSync.current = result.dashboardlastupdate;
        loadOrders();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadOrders = async () => {
    var bodyElement = document.body;

    var pageSize = Math.trunc(bodyElement.offsetHeight / 174) - 1;
    pageSize = pageSize * 5;
    try {
      const result = await LoadOrders(user.Customerid, offset, pageSize);
      if (result !== undefined) {
        setIsFirstpage(result.first);
        setIsLastpage(result.last);
        setOrders(result.content);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const prepareOrder = (deviceid, order) => {
    if (showKeypad === false) {
      setShowKeypad(true);
      setDeviceid(deviceid);
      setCurrentOrderno(order);
    }
  };

  const updatePagesize = (pagesize) => {
    setPagesize(pagesize);
  };

  useEffect(() => {
    if (user.Customerid) {
      connect();
      loadOrders();

      const interval = setInterval(() => {
        loadOrders();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const [camera, setCamera] = useState(false);
  const [result, setResult] = useState(null);

  const onDetected = (result) => {
    setResult(result);
  };

  return (
    <div className="order-dashboard">
      <NumericKeyPad
        showModal={showKeypad}
        updateOrder={updateOrder}
        setShowModal={setShowKeypad}
        currentOrderno={currentOrderno}
        cancelOrder={cancelOrder}
        completeOrder={completeOrder}
        orders={orders}
        deviceid={deviceid}
      />
      <Toast ref={toast} />

      <div className="pad-10">
        {orders.map((order, i) => {
          return (
            <div
              key={"d" + order.Deviceid}
              className={"col-md-2 order-container status" + order.Status}
            >
              <div
                className="col-md-12 order-header"
                key={"o" + order.deviceid}
              >
                <div className="col-md-6 text-left" key={"o1" + order.Deviceid}>
                  {order.Orderno === "" ? "" : order.Orderno}
                </div>
                <div
                  className="col-md-6 text-right"
                  key={"o2" + order.Deviceid}
                  id={"o2" + order.Deviceid}
                  onClick={() => prepareOrder(order.Deviceid, order.Orderno)}
                >
                  <img src="../images/edit.png" className="edit-image" />
                </div>
              </div>

              <div className="col-md-12 order-content">
                <div className="col-md-12 text-center pt-1 bold">
                  &nbsp; Table No.
                </div>

                <div className="col-md-12 text-center table-info">
                  <span> {order.Tableno} </span>
                </div>
                <div className="col-md-11 margin-auto">
                  <div className="row ">
                    <div className="col-md-6 ">
                      <span className="deviceno"> {order.Deviceid} </span>
                    </div>
                    <div className="col-md-6 text-right ">
                      {" "}
                      <span className="dateordered">
                        {moment(order.TimeOrdered).isValid() === false ||
                        order.Orderno === ""
                          ? ""
                          : moment(order.TimeOrdered).format("LT")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="order-footer">
        <div className="row">
          <div className="col-md-12 text-right footer-info">
            {isFirstpage || (isFirstpage == true && isLastpage === true) ? (
              <img className="disabled-image" src="../images/left.png" />
            ) : (
              <img src="../images/left.png" onClick={prevPage} />
            )}
            &nbsp;&nbsp;&nbsp;
            {isLastpage || (isFirstpage == true && isLastpage === true) ? (
              <img className="disabled-image" src="../images/right.png" />
            ) : (
              <img src="../images/right.png" onClick={nextPage} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
