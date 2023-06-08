import React, { useState, useRef, useEffect } from "react";
import { PUT, GET, request, DELETE } from "../api/ApiAdapter";
import moment from "moment";
const CustomerOrder1 = ({}) => {
  const [order1, setOrder1] = useState({
    Orderno: "",
    Tableno: "",
    Lastupdate: "",
  });
  const [order2, setOrder2] = useState({
    Orderno: "",
    Tableno: "",
    Lastupdate: "",
  });
  const [order3, setOrder3] = useState({
    Orderno: "",
    Tableno: "",
    Lastupdate: "",
  });
  const [order4, setOrder4] = useState({
    Orderno: "",
    Tableno: "",
    Lastupdate: "",
  });
  const [order5, setOrder5] = useState({
    Orderno: "",
    Tableno: "",
    Lastupdate: "",
  });
  const [order6, setOrder6] = useState({
    Orderno: "",
    Tableno: "",
    Lastupdate: "",
  });

  const onChange = (e) => {
    setOrder1({ ...order1, [e.target.name]: e.target.value });
  };

  const setOrder = async (divice) => {
    try {
      const result = await request("order/updateorderno", PUT, {
        Orderno: order1.Orderno,
        Deviceid: divice,
      });
      if (result.StatusCode === 200) {
        loadData();
        //toast.current.show({ severity: 'success', summary: 'Success Message', detail: result.Message });
      } else {
        //toast.current.show({ severity: 'error', summary: 'Error Message', detail: result.Message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async () => {
    try {
      const result = await request(`order/getall`, GET);

      var or1 = result.filter((res) => {
        if (res.Deviceid === "01") {
          return true;
        }
        return false;
      });
      setOrder1({
        Orderno: or1[0].Orderno,
        Tableno: or1[0].Tableno,
        Lastupdate: moment(or1[0].Lastupdate).format("LT"),
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="m-2">
        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input
              name="Orderno"
              className="form-control"
              value={order1.Orderno}
              onChange={(e) => onChange(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setOrder("01");
                }
              }}
            ></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # {order1.Tableno}</span>
            <span className="time">{order1.Lastupdate}</span>
          </div>
        </div>

        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>

        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>
        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>

        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>

        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>

        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>

        <div className="col-sm-3 orders">
          <div className="col-sm-4 ordernnumber">
            <span>Order</span>
            <input className="form-control" value="1"></input>
          </div>
          <div className="col-sm-8 tablenumber">
            <span className="no">Table # 1</span>
            <span className="time">3:03pm</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrder1;
