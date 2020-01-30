import React, { useEffect } from "react";
import Loading from "component/Loading/Loading.jsx";
import { connect } from "react-redux";

import "./ScrollView.scss";

const ScrollView = ({ isend, readyToLoad, loadCallback, children }) => {
  useEffect(() => {
    window.addEventListener("scroll", onLoadPage);
    return () => window.removeEventListener("scroll", onLoadPage);
  }, []);

  const onLoadPage = () => {
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.body.scrollHeight;
    let scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    let proLoadDis = 30;

    if (scrollTop + clientHeight >= scrollHeight - proLoadDis) {
      if (!isend) {
        if (!readyToLoad) {
          return;
        }
        loadCallback && loadCallback();
      }
    }
  };

  return (
    <div className="scrollview">
      {children}
      <Loading isend={isend} />
    </div>
  );
};

export default connect(({ scrollViewReducer: { readyToLoad } }) => ({
  readyToLoad
}))(ScrollView);
