import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import Loading from "../Widgets/Loading";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { GetDeviceUtilizationDetails } from "./ReportHandler";
import moment from "moment";

const DeviceUtilizationGraphDetails = ({
  dateFrom,
  dateTo,
  selectedDevice,
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [isReady, setIsReady] = useState(true);
  const { user } = useContext(UserContext);
  const [devicesUtilization, setDeviceUtilization] = useState([]);

  let labels = [];
  let datas = [];

  const getUtilizations = async () => {
    setIsReady(false);
    const devices = await GetDeviceUtilizationDetails(
      user.Customerid,
      dateFrom,
      dateTo,
      selectedDevice
    );

    setDeviceUtilization(devices);
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
            text: "Number of minutes stayed",
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
            text: "Orders",
          },
        },
      },
      plugins: {
        legend: false,
        title: {
          display: true,
          text: [
            "Device Utilization",
            "(Order Count)",
            moment(dateFrom).format("DD-MMM-yyy") +
              " - " +
              moment(dateTo).format("DD-MMM-yyy"),
          ],
        },
      },
      onClick: function (evt, element) {
        if (element.length > 0) {
          console.log(element);
          // you can also get dataset of your selected element
          console.log(data.datasets[element[0].datasetIndex]);
          console.log(data.labels[element[0].datasetIndex]);
        }
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, [devicesUtilization]);

  useEffect(() => {
    if (user.Currentprofile) {
      getUtilizations();
    }
  }, [user]);

  return (
    <>
      <Loading show={!isReady} />

      <Chart
        type="bar"
        data={chartData}
        options={chartOptions}
        className="p-chart-style"
      />
    </>
  );
};

export default DeviceUtilizationGraphDetails;
