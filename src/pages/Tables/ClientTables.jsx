import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GET, request } from "../../api/ApiAdapter";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Loading from "../Widgets/Loading";
import PageBreadCrumb from "../Widgets/PageBreadCrumb";
import ContainerFluidLayout from "../Layouts/ContainerFluidLayout";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { FormatCreationDateTime } from "../../utilities/Formating";
import { IsVisible } from "../../utilities/AllowUser";

const ClientTables = () => {
  const [tables, setTables] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const { user } = useContext(UserContext);

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const actionTemplate = (row, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            navigate("/client/tables/" + row.Id);
          }}
        ></Button>
      </div>
    );
  };

  const loadData = async () => {
    try {
      setIsReady(false);
      const result = await request("table/getall/" + user.Customerid, GET);
      setTables(result);
      setIsReady(true);
    } catch (e) {
      console.log(e);
    }
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
    if (user.Customerid) {
      loadData();
    }
  }, [user]);

  return (
    <div>
      <Loading show={!isReady} />
      <PageBreadCrumb firstLevel={"Client"} secondLevel="Tables" />
      <ContainerFluidLayout fullWidth={true} header="Tables">
        <div className="row mb-2 text-right">
          <div className={"col-md-12 " + IsVisible()}>
            <Button
              type="button"
              className="p-button-sm "
              onClick={() => {
                navigate("/client/tables/newtable");
              }}
            >
              Add New Table
            </Button>
          </div>
        </div>
        <DataTable
          value={tables}
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
          <Column field="Tag" header="Tag" sortable filter></Column>
          <Column field="Tablename" header="Table No." sortable filter></Column>
          <Column
            field="Active"
            header="Active"
            sortable
            filter
            className={IsVisible()}
          ></Column>

          <Column
            field="Updatedby"
            header="Updated By"
            sortable
            className={IsVisible()}
            filter
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
            style={{ textAlign: "center", width: "1em" }}
          />
        </DataTable>
      </ContainerFluidLayout>
    </div>
  );
};

export default ClientTables;
