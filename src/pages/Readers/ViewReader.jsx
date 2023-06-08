import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { GET, request } from "../../api/ApiAdapter";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Loading from "../Widgets/Loading";
import moment from "moment";

const ViewReader = () => {
  const [readers, setReaders] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  const actionTemplate = (row, column) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-sm p-button-rounded p-button-outlined table-button"
          onClick={() => {
            navigate("/reader/" + row.Id);
          }}
        ></Button>
      </div>
    );
  };

  const loadData = async () => {
    try {
      setIsReady(false);
      const result = await request("reader/getall", GET);
      setReaders(result);
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

  const formatDate = (value) => {
    return moment(value).format("LL");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Loading show={!isReady} />
      <div className="ui breadcrumb">
        <div className="section">Reader</div>
        <div className="divider"> / </div>
        <div className="active section">View Reader</div>
      </div>
      <div className="row fill-parent">
        <div className="col-md-12">
          <div className="card mt-5">
            <div className="card-header">List of Readers</div>
            <div className="card-body">
              <DataTable
                value={readers}
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
                <Column
                  field="Deviceid"
                  header="Device No"
                  sortable
                  filter
                ></Column>
                <Column
                  field="Description"
                  header="Description"
                  sortable
                  filter
                ></Column>
                <Column field="Active" header="Active" sortable filter></Column>
                <Column
                  field="Datecreated"
                  header="Date Created"
                  sortable
                  body={formatDate}
                  filter
                ></Column>
                <Column
                  field="Dateupdated"
                  header="Date Updated"
                  sortable
                  filter
                  body={formatDate}
                >
                  {" "}
                </Column>
                <Column
                  body={actionTemplate}
                  header="Actions"
                  style={{ textAlign: "center", width: "1em" }}
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReader;
