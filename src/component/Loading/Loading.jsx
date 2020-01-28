import React from "react";

import "./Loading.scss";

const Loading = ({ isend }) => {
  let str = "加载中";
  if (isend) {
    str = "已完成";
  }

  return <div className="loading">{str}</div>;
};

export default Loading;
