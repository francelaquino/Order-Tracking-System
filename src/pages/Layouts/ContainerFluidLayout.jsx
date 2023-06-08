import React from "react";

const ContainerFluidLayout = ({ header, fullWidth, children }) => {
  return (
    <div>
      {" "}
      <div className="container-fluid">
        <div className={"row " + (fullWidth === true ? "" : "w-600")}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">{header}</div>
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerFluidLayout;
