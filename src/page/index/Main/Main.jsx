import React from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";

import Loadable from "react-loadable";
import BottomBar from "../BottomBar/BottomBar";
import Home from "../Home/Home";

import Loading from "./Loading";

import "component/common.scss";

const Order = Loadable({
  loader: () => import(/* webpackChunkName: "order" */ "../Order/Order"),
  loading: Loading
});

const My = Loadable({
  loader: () => import(/* webpackChunkName: "my" */ "../My/My"),
  loading: Loading
});

const Main = () => (
  <>
    <Route exact path="/home" component={Home} />
    <Route path="/order" component={Order} />
    <Route path="/my" component={My} />
    <BottomBar />
  </>
);

export default withRouter(connect()(Main));
