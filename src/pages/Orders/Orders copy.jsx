import React, { useState, useRef, useEffect } from "react";
import { POST, GET, request } from "../../api/ApiAdapter";
import moment from "moment";
import NumericKeyPad from "../Widgets/NumericKeyPad";
import { Toast } from "primereact/toast";
import Settings from "../Widgets/Settings";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

var offset = 0;
var stompClient = null;

const Orders = ({}) => {
  const [pagesize, setPagesize] = useState(10);
  const [isFirstpage, setIsFirstpage] = useState(true);
  const [isLastpage, setIsLastpage] = useState(true);
  const [orders, setOrders] = useState([]);
  const [showKeypad, setShowKeypad] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [deviceid, setDeviceid] = useState("");
  const [currentOrderno, setCurrentOrderno] = useState("");
  const [totalOrder, setTotalOrder] = useState("");

  const { user } = useContext(UserContext);

  const toast = useRef(null);
  const lastSync = useRef("");

  const connect = () => {
    let Sock = new SockJS("http://francels-mbp:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    stompClient.subscribe("/order/sync", onSync);
  };

  const onSync = (payload) => {
    loadData();
    console.log(payload);
  };

  const onError = (err) => {
    console.log(err);
  };

  const updateOrder = async (neworderno) => {
    try {
      const result = await request("reader/updateorderno", POST, {
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

  const nextPage = () => {
    offset = offset + 1;
    loadData();
  };

  const prevPage = () => {
    offset = offset - 1;
    loadData();
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
      console.log(result);
      if (result.isdashboardrefresh === true) {
        lastSync.current = result.dashboardlastupdate;
        loadData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async () => {
    console.log(user);
    try {
      const result = await request(
        `reader/getorders/` + user.Customerid + `/` + offset + `/` + pagesize,
        GET
      );

      setIsFirstpage(result.first);
      setIsLastpage(result.last);
      setOrders(result.content);
      var totalorders = result.content.filter(
        (order) => order.Orderno != ""
      ).length;
      setTotalOrder(totalorders);
    } catch (e) {
      console.log(e);
    }
  };

  const prepareOrder = (deviceid, order) => {
    setShowKeypad(true);
    setDeviceid(deviceid);
    setCurrentOrderno(order);
  };

  const showSettingsWindow = () => {
    setShowSettings(true);
  };

  const updatePagesize = (pagesize) => {
    setPagesize(pagesize);
  };

  useEffect(() => {
    connect();
    if (user.Customerid) {
      loadData();
    }
  }, [user]);

  return (
    <>
      <NumericKeyPad
        showModal={showKeypad}
        updateOrder={updateOrder}
        setShowModal={setShowKeypad}
        currentOrderno={currentOrderno}
      />

      <Settings
        showModal={showSettings}
        setShowModal={setShowSettings}
        updatePagesize={updatePagesize}
      />
      <div className="m-2">
        <div className="body">
          {orders.map((order, i) => {
            return (
              <div
                key={order.deviceid}
                className={"col-md-2 order-container status" + order.Status}
              >
                <div
                  className="col-md-12 order-header"
                  key={order.deviceid + order.Orderno}
                >
                  <div className="col-md-6 text-left">
                    {order.Orderno === "" ? "" : "Order No. " + order.Orderno}
                  </div>
                  <div
                    className="col-md-6 text-right"
                    onClick={() => prepareOrder(order.Deviceid, order.Orderno)}
                  >
                    <img src="../images/edit.png" className="edit-image" />
                  </div>
                </div>
                <div className="col-md-12 order-content">
                  {order.IsAlerted === true ? (
                    <span className="alarm-image">
                      <img src="../images/alarm.png" />
                    </span>
                  ) : (
                    ""
                  )}
                  <div className="col-md-12 text-center pt-1">
                    &nbsp; {order.Orderno === "" ? " " : "Table No."}
                  </div>

                  <div className="col-md-12 text-center table-info">
                    <span> {order.Tableno}</span>
                  </div>
                  <div className="col-md-11 margin-auto">
                    <div className="row ">
                      <div className="col-md-6 ">
                        <span className="deviceno"> {order.Deviceid}</span>
                      </div>
                      <div className="col-md-6 text-right ">
                        {moment(order.TimeOrdered).isValid() === false ||
                        order.Orderno === ""
                          ? ""
                          : moment(order.TimeOrdered).format("LT")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Toast ref={toast} />
        <div className="footer">
          <div className="row">
            <div className="col-md-4 text-left footer-info">
              &nbsp;&nbsp;&nbsp; {totalOrder} Orders
            </div>
            <div className="col-md-4 text-center footer-info">
              <img
                src="../images/settings.png"
                onClick={() => showSettingsWindow()}
              />
              &nbsp;&nbsp;&nbsp;
              <img src="../images/refresh.png" onClick={() => loadData()} />
              &nbsp;&nbsp;&nbsp;
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
            <div className="col-md-4 text-right footer-info">
              Welcome : {user.Username}
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
