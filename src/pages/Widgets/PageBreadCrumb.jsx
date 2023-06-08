import React from "react";

const PageBreadCrumb = ({ firstLevel, secondLevel, thirdLevel }) => {
  return (
    <div>
      <div className="page-breadcrumb ">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active">{firstLevel}</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {secondLevel}
                  </li>
                  {thirdLevel === "" || thirdLevel === null ? (
                    ""
                  ) : (
                    <li className="breadcrumb-item active" aria-current="page">
                      {thirdLevel}
                    </li>
                  )}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBreadCrumb;
