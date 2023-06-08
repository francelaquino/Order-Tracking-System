import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import Loading from "../Widgets/Loading";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { GetTableUtilization } from "./ReportHandler";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import moment from "moment";

const TableUtilizationGraph = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [isReady, setIsReady] = useState(true);
  const { user } = useContext(UserContext);
  const [tablesUtilization, setTableUtilization] = useState([]);
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(1, "months").toDate()
  );
  const [dateTo, setDateTo] = useState(moment().toDate());

  let labels = [];
  let datas = [];
  const loadTables = async () => {
    setIsReady(false);
    const tables = await GetTableUtilization(user.Customerid, dateFrom, dateTo);
    setTableUtilization(tables);
  };
  const onSearch = () => {
    loadTables();
  };
  useEffect(() => {
    var i = 0;
    tablesUtilization.map((d) => {
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
          label: "Table Utilization",
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
            text: "Tables",
          },
        },
      },
      plugins: {
        legend: false,
        title: {
          display: true,
          text: [
            "Table Utilization",
            moment(dateFrom).format("DD-MMM-yyy") +
              " - " +
              moment(dateTo).format("DD-MMM-yyy"),
          ],
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, [tablesUtilization]);

  useEffect(() => {
    if (user.Currentprofile) {
      loadTables();
    }
  }, [user]);

  return (
    <>
      <Loading show={!isReady} />
      <PageBreadCrumb
        firstLevel={"Client"}
        secondLevel="Report"
        thirdLevel={"Table Utilization"}
      />

      <ContainerFluidLayout fullWidth={true} header={"Table Utilization"}>
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
              Refresh
            </Button>
          </div>
        </div>
        <Chart
          type="bar"
          data={chartData}
          options={chartOptions}
          className="p-chart-style"
        />
      </ContainerFluidLayout>
    </>
  );
};

export default TableUtilizationGraph;
