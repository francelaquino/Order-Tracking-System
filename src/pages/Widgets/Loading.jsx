import React from "react";

const Loading = ({ show }) => {
  return (
    <>
      {show ? (
        <div className="loading-container">
          <div className="loading-body">
            <img alt="spinner" src="/images/spinner.gif" />
            <div>Please wait...</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
