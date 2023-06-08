import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { POST, GET, request } from "../../api/ApiAdapter";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import Loading from "../Widgets/Loading";
import { FormatCreationDateTime } from "../../utilities/Formating";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { Button } from "primereact/button";
import { IsVisible } from "../../utilities/AllowUser";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import ResetDeviceSettings from "./ResetDeviceSettings";
import "./Devices.css";

const ClientDevices = () => {
  const [Devices, setDevices] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [id, setId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const { user } = useContext(UserContext);
  const toast = useRef(null);

  const confirmReset = async (Deviceid) => {
    confirmDialog({
      message:
        "This will reset the device configuration. Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const result = await request("reader/resetconfig", POST, {
            Deviceid: Deviceid,
            Customerid: user.Customerid,
          });
          if (result.StatusCode === 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: result.Message,
            });
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
      },
    });
  };

  const downloadConfiguration = async (Id) => {
    try {
      const result = await request(
        `reader/downloadConfiguration/${user.Customerid}/${Id}`,
        GET
      );

      if (result.Token !== "") {
        const fileData =
          result.Wifi +
          "\n" +
          result.Wifipassword +
          "\n" +
          result.Heartbittimeout +
          "\n" +
          result.Apiendpoint +
          "\n" +
          result.Token;

        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "config.py";
        link.href = url;
        link.click();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const prepareEdit = (id, customerId) => {
    setId(id);
    setCustomerId(customerId);
    setShowResetModal(true);
  };

  const actionTemplate = (row, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-cloud-download"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            downloadConfiguration(row.Id);
          }}
        ></Button>
        &nbsp;&nbsp;
        <Button
          type="button"
          icon="pi pi-refresh"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            prepareEdit(row.Id, row.Customerid);
          }}
        ></Button>
        &nbsp;&nbsp;
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            navigate("/client/devices/" + row.Id);
          }}
        ></Button>
      </div>
    );
  };

  const loadData = async () => {
    try {
      setIsReady(false);
      const result = await request(
        "reader/getclientdevices/" + user.Customerid,
        GET
      );

      console.log(result);
      setDevices(result);
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

  const formatDate = (row, column) => {
    return FormatCreationDateTime(row, column);
  };

  useEffect(() => {
    if (user.Currentprofile) {
      loadData();
    }
  }, [user]);

  return (
    <div>
      <Loading show={!isReady} />
      <PageBreadCrumb firstLevel="Client" secondLevel="Devices" />
      <ContainerFluidLayout fullWidth={true} header="Devices">
        <div className="row mb-2 text-right">
          <div className={"col-md-12 " + IsVisible()}>
            <Button
              type="button"
              className="p-button-sm "
              onClick={() => {
                navigate("/client/devices/newdevice");
              }}
            >
              Add New Device
            </Button>
          </div>
        </div>
        <DataTable
          value={Devices}
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
          sortField="Lastread"
          sortOrder={-1}
        >
          <Column field="Deviceid" header="Device No" sortable filter></Column>
          <Column
            field="Description"
            header="Description"
            sortable
            filter
          ></Column>

          <Column
            field="Lastheartbit"
            header="Last Heartbeat"
            sortable
            body={formatDate}
          ></Column>
          <Column
            field="Lastread"
            header="Last Read"
            sortable
            body={formatDate}
          ></Column>
          <Column
            field="Updatedby"
            header="Updated By"
            sortable
            filter
            className={IsVisible()}
          ></Column>
          <Column
            field="Dateupdated"
            header="Date Updated"
            sortable
            body={formatDate}
            className={IsVisible()}
          >
            {" "}
          </Column>
          <Column
            body={actionTemplate}
            header="Actions"
            className={IsVisible()}
            style={{ textAlign: "center", width: "160px" }}
          />
        </DataTable>
      </ContainerFluidLayout>
      <ConfirmDialog />
      <Toast ref={toast} />
      <ResetDeviceSettings
        showModal={showResetModal}
        setShowModal={setShowResetModal}
        Id={id}
        Customerid={customerId}
      />
    </div>
  );
};

export default ClientDevices;
