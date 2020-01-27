import React from "react";
import { connect } from "react-redux";

import NavHeader from "component/NavHeader/NavHeader";
import { Route, withRouter, NavLink } from "react-router-dom";
import Menu from "../Menu/Menu";
import Comment from "../Comment/Comment";
import Restanurant from "../Restanurant/Restanurant";

import "component/common.scss";
import "./Main.scss";

const Main = ({ tabs, poiInfo, showChooseContent }) => {
  let poiName = poiInfo.poi_info ? poiInfo.poi_info.name : "";

  const renderTabs = () => {
    return tabs.map(item => {
      return (
        <NavLink
          activeClassName="active"
          replace={true}
          to={"/" + item.key}
          key={item.key}
          className="tab-item"
        >
          {item.name}
        </NavLink>
      );
    });
  };

  return (
    <div className="detail">
      <NavHeader title={poiName} />
      <div className="tab-bar">{renderTabs()}</div>

      <Route exact path="/menu" component={Menu} />
      <Route path="/comment" component={Comment} />
      <Route path="/restanurant" component={Restanurant} />
      {showChooseContent ? <div className="mask"></div> : null}
    </div>
  );
};

export default withRouter(
  connect(
    ({
      tabReducer: { tabs },
      menuReducer: { showChooseContent, poiInfo }
    }) => ({
      tabs: tabs,
      showChooseContent: showChooseContent,
      poiInfo: poiInfo
    })
  )(Main)
);
