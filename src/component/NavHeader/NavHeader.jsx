import React from "react";

import "./NavHeader.scss";

const NavHeader = ({ title }) => {
  return (
    <div className="nav">
      <div
        onClick={() => {
          window.history.back();
        }}
        className="back-icon"
      ></div>
      <h4 className="title">{title}</h4>
    </div>
  );
};

export default NavHeader;
