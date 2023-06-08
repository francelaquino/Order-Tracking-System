import React from "react";

const Unauthorized = () => {
  return (
    <div>
      <div
        className="w3-display-middle text-center"
        style={{ marginTop: "10%" }}
      >
        <h1 className="w3-jumbo w3-animate-top w3-center">
          <code>Access Denied</code>
        </h1>

        <h3 className="w3-center w3-animate-right">
          You dont have permission to view this site.
        </h3>
      </div>
    </div>
  );
};

export default Unauthorized;
