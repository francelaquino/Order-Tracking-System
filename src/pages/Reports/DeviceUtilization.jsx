import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import Loading from "../Widgets/Loading";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
import { GetDeviceUtilization } from "./ReportHandler";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Report.css";

const DeviceUtilization = () => {
  const { user } = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);
  const [devicesUtilization, setDeviceUtilization] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const loadDevices = async () => {
    setIsReady(false);
    const devices = await GetDeviceUtilization(
      user.Customerid,
      dateFrom,
      dateTo
    );
    setDeviceUtilization(devices);

    setIsReady(true);
  };
  const onSearch = () => {
    loadDevices();
  };

  const tableTemplate = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: 50, value: 100 },
        { label: 50, value: 200 },
      ];

      return (
        <>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Items per page:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const utilizationBodyTemplate = (rowData) => {
    return <ProgressBar value={parseInt(rowData.Utilization)}></ProgressBar>;
  };

  useEffect(() => {
    if (user.Currentprofile) {
      setDateFrom(moment().subtract(1, "months").toDate());
      setDateTo(moment().toDate());
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
            &nbsp;
            <Link to="/client/report/deviceutilization">
              <Button type="button" className="p-button-sm ">
                View as Graph
              </Button>
            </Link>
          </div>
        </div>
        <br></br>
        <DataTable
          value={devicesUtilization}
          showGridlines
          responsiveLayout="scroll"
          stripedRows
          paginator
          paginatorTemplate={tableTemplate}
          first={first}
          rows={rows}
          onPage={onCustomPage}
          paginatorClassName="justify-content-end"
          selectionMode="single"
        >
          <Column field="Deviceid" header="Device No" filter></Column>

          <Column field="Count" header="Usage Count"></Column>

          <Column
            field="Utilization"
            header="Device Utilization"
            body={utilizationBodyTemplate}
          ></Column>
        </DataTable>
      </ContainerFluidLayout>
    </>
  );
};

export default DeviceUtilization;
