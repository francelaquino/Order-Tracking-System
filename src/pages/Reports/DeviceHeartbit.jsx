import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import Loading from "../Widgets/Loading";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import { FetchDeviceHeartbit } from "./ReportHandler";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { ProgressBar } from "primereact/progressbar";
import "./Report.css";

const DeviceHeartbit = () => {
  const { user } = useContext(UserContext);
  const [isReady, setIsReady] = useState(false);
  const [devicesUtilization, setDeviceUtilization] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const loadDevices = async () => {
    setIsReady(false);
    const devices = await FetchDeviceHeartbit(user.Customerid);
    setDeviceUtilization(devices);

    setIsReady(true);
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
      loadDevices();
    }
  }, [user]);
  return (
    <>
      <Loading show={!isReady} />
      <PageBreadCrumb
        firstLevel={"Client"}
        secondLevel="Report"
        thirdLevel={"Device Heartbeat"}
      />

      <ContainerFluidLayout fullWidth={true} header={"Device Heartbeat"}>
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

          <Column
            field="Utilization"
            header="Device Heartbeat"
            body={utilizationBodyTemplate}
          ></Column>
        </DataTable>
      </ContainerFluidLayout>
    </>
  );
};

export default DeviceHeartbit;
