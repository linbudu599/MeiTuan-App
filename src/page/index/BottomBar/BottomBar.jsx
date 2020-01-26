import "./BottomBar.scss";

import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const BottomBar = ({ history, tabs }) => {
  const changeTab = ({ key }) => {
    history.push(key);
  };

  return (
    <div className="bottom-bar">
      {tabs.map((item, idx) => {
        return (
          <NavLink
            key={idx}
            className={`${item.key} btn-item`}
            replace={true}
            to={"/" + item.key}
            activeClassName="active"
            onClick={() => changeTab(item)}
          >
            <div className="tab-icon"></div>
            <div className="btn-name">{item.name}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default withRouter(
  connect(state => ({
    tabs: state.tabReducer.tabs,
    activeKey: state.tabReducer.activeKey
  }))(BottomBar)
);
