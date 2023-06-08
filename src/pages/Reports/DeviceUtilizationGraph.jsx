import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import Loading from "../Widgets/Loading";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { GetDeviceUtilization } from "./ReportHandler";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import moment from "moment";
import { Link } from "react-router-dom";
import DeviceUtilizationGraphDetails from "./DeviceUtilizationGraphDetails";

const DeviceUtilizationGraph = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [isReady, setIsReady] = useState(true);
  const { user } = useContext(UserContext);
  const [devicesUtilization, setDeviceUtilization] = useState([]);
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(1, "months").toDate()
  );
  const [selectedDevice, setSelectedDevice] = useState("");
  const [dateTo, setDateTo] = useState(moment().toDate());
  const [screen, setScreen] = useState("Device");

  let labels = [];
  let datas = [];
  const loadDevices = async () => {
    setIsReady(false);
    const devices = await GetDeviceUtilization(
      user.Customerid,
      dateFrom,
      dateTo
    );
    setDeviceUtilization(devices);
  };
  const onSearch = () => {
    loadDevices();
  };
  useEffect(() => {
    var i = 0;
    devicesUtilization.map((d) => {
      if (d.Count > 0) {
        labels.push(d.Deviceid);
        datas.push(d.Count);
      }
    });

    setIsReady(true);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "Device Utilization",
          data: datas,
          borderWidth: 0.5,
          maxBarThickness: 30,
          minBarThickness: 10,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          grace: "5%",
          beginAtZero: true,
          ticks: {
            stepSize: 1,
          },

          title: {
            display: true,
            text: "No of orders",
          },
        },
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 60,
            minRotation: 60,
            crossAlign: "right",
            borderColor: "#FF6384",
          },
          title: {
            display: true,
            text: "Devices",
          },
        },
      },
      plugins: {
        legend: false,
        title: {
          display: true,
          text: [
            "Device Utilization",
            moment(dateFrom).format("DD-MMM-yyy") +
              " - " +
              moment(dateTo).format("DD-MMM-yyy"),
          ],
        },
      },
      onClick: function (evt, element) {
        if (element.length > 0) {
          setSelectedDevice(data.labels[element[0].index]);
          //console.log(data.labels[element[0].index]);
          setScreen("Order");
        }
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, [devicesUtilization]);

  useEffect(() => {
    if (user.Currentprofile) {
      loadDevices();
    }
  }, [user]);

  return (
    <>
      <Loading show={!isReady} />
      <PageBreadCrumb
        firstLevel={"Client"}
        secondLevel="Report"
        thirdLevel={"Device Utilization"}
      />

      <ContainerFluidLayout fullWidth={true} header={"Device Utilization"}>
        {screen === "Device" ? (
          <div>
            <div className="row">
              <div className="col-md-2">
                <div>Date From &nbsp;&nbsp;</div>
                <Calendar
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.value)}
                  showIcon
                  showButtonBar
                />
              </div>
              <div className="col-md-2">
                <div>Date From </div>
                <Calendar
                  value={dateTo}
                  onChange={(e) => setDateTo(e.value)}
                  showIcon
                  showButtonBar
                />
              </div>
              <div className="col-md-2">
                <br></br>
                <Button
                  type="button"
                  className="p-button-sm "
                  onClick={() => {
                    onSearch();
                  }}
                >
                  View
                </Button>
              </div>
            </div>
            <Chart
              type="bar"
              data={chartData}
              options={chartOptions}
              className="p-chart-style"
            />
          </div>
        ) : (
          <div>
            <div className="row text-right">
              <div className="col-md-12">
                <br></br>
                <Button
                  type="button"
                  className="p-button-sm "
                  onClick={() => {
                    setScreen("Device");
                  }}
                >
                  Back
                </Button>
              </div>
            </div>

            <DeviceUtilizationGraphDetails
              dateFrom={dateFrom}
              dateTo={dateTo}
              selectedDevice={selectedDevice}
            />
          </div>
        )}
      </ContainerFluidLayout>
    </>
  );
};

export default DeviceUtilizationGraph;
