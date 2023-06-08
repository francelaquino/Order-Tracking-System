import React from "react";
import { useEffect } from "react";
import "../Orders/Order.css";
import { useState } from "react";
import { GET, request } from "../../api/ApiAdapter";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import Loading from "../Widgets/Loading";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";

const ClientOrders = () => {
  const [Devices, setDevices] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [isReady, setIsReady] = useState(false);

  const { user } = useContext(UserContext);

  const loadData = async () => {
    try {
      setIsReady(false);
      const result = await request(
        "reader/getorders/" + user.Customerid + "/0/1000",
        GET
      );
      setDevices(result.content);
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
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

  const formatDateTime = (data) => {
    if (data !== null && data !== "")
      return moment(data).format("MMM DD, YYYY hh:mm:ss A");
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`order-badge status-${rowData.Status}`}>
        {formatDateTime(rowData.TimeOrdered)}
      </span>
    );
  };

  useEffect(() => {
    if (user.Customerid) {
      loadData();
    }
  }, [user]);

  return (
    <div>
      <Loading show={!isReady} />
      <PageBreadCrumb firstLevel={"Client"} secondLevel="Orders" />
      <ContainerFluidLayout fullWidth={true} header="Orders">
        <DataTable
          value={Devices}
          responsiveLayout="scroll"
          stripedRows
          showGridlines
          paginator
          paginatorTemplate={tableTemplate}
          first={first}
          rows={rows}
          onPage={onCustomPage}
          paginatorClassName="justify-content-end"
          selectionMode="single"
        >
          <Column field="Deviceid" header="Device No" sortable filter></Column>
          <Column header="Order No" field="Orderno" sortable filter></Column>
          <Column field="Tableno" header="Table No" sortable filter></Column>

          <Column
            header="TimeOrdered"
            sortable
            body={statusBodyTemplate}
          ></Column>
        </DataTable>
      </ContainerFluidLayout>
    </div>
  );
};

export default ClientOrders;
