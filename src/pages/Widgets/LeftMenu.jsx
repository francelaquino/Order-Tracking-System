import React from "react";

const LeftMenu = () => {
  return (
    <div className="ui vertical menu inverted">
      <div className="item">
        <div className="header">Reader</div>
        <div className="menu">
          <a className="item" href="/reader/newreader">
            New Reader
          </a>
          <a className="item" href="/reader">
            View Reader
          </a>
        </div>
      </div>
      <div className="item">
        <div className="header">Tables</div>
        <div className="menu">
          <a className="item" href="/table/newtable">
            New Table
          </a>
          <a className="item" href="/table">
            View Table
          </a>
        </div>
      </div>
      <div className="item">
        <div className="header">Hosting</div>
        <div className="menu">
          <a className="item">Shared</a>
          <a className="item">Dedicated</a>
        </div>
      </div>
      <div className="item">
        <div className="header">Support</div>
        <div className="menu">
          <a className="item">E-mail Support</a>
          <a className="item">FAQs</a>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
