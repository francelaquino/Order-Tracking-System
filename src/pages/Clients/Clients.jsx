import React from "react";
import { useEffect } from "react";
import "../Orders/Order.css";
import { useState } from "react";
import { GET, request } from "../../api/ApiAdapter";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import Loading from "../Widgets/Loading";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";

const Clients = () => {
  const [Users, setUsers] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const { user, updateProfile } = useContext(UserContext);

  console.log(localStorage.getItem("jwtToken"));
  const setProfile = (Customer, Customerid) => {
    updateProfile(Customer, Customerid, "ClientAdmin");

    navigate("/client/devices");
  };

  const actionTemplate = (row, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-id-card"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            setProfile(row.Name, row.Id);
          }}
        ></Button>
        &nbsp;&nbsp;
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            navigate("/admin/client/editclient/" + row.Id);
          }}
        ></Button>
      </div>
    );
  };

  const loadData = async () => {
    try {
      setIsReady(false);
      const result = await request("client/getclients", GET);
      setUsers(result);
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

  const formatDateTime = (row, column) => {
    if (column.field === "Dateupdated")
      if (row["Dateupdated"] !== null && row["Dateupdated"] !== "")
        return moment(row["Dateupdated"]).format("MMM DD, YYYY hh:mm:ss A");
  };

  useEffect(() => {
    if (user.Currentprofile) {
      loadData();
    }
  }, [user]);

  return (
    <div>
      <Loading show={!isReady} />
      <PageBreadCrumb firstLevel="Home" secondLevel="Clients" />
      <ContainerFluidLayout fullWidth={true} header="Clients">
        <div className="row mb-2 text-right">
          <div className="col-md-12">
            <Button
              type="button"
              className="p-button-sm "
              onClick={() => {
                navigate("/admin/client/newclient");
              }}
            >
              Add New Client
            </Button>
          </div>
        </div>
        <DataTable
          value={Users}
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
          <Column field="Name" header="Name" sortable filter></Column>
          <Column header="Domain" field="Domain" sortable filter></Column>

          <Column field="Active" header="Active" sortable filter></Column>
          <Column header="Updated By" field="Updatedby" sortable></Column>
          <Column
            field="Dateupdated"
            header="Date Updated"
            sortable
            filter
            body={formatDateTime}
          ></Column>
          <Column
            body={actionTemplate}
            header="Actions"
            style={{ textAlign: "center", width: "120px" }}
          />
        </DataTable>
      </ContainerFluidLayout>
    </div>
  );
};

export default Clients;
