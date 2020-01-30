import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import ListItem from "component/ListItem/ListItem.jsx";
import ScrollView from "component/ScrollView/ScrollView.jsx";

import { getListData } from "../actions/contentListAction";

import "./ContentList.scss";

const ContentList = ({ list, page, dispatch, isend }) => {
  useEffect(() => {
    console.log("init");
    fetchData();
    console.log(page);
    return () => {};
  }, []);
  console.log("out" + page);

  const onLoadPage = p => {
    if (p <= 3) {
      console.log(p);
      fetchData();
    }
  };

  const fetchData = () => {
    dispatch(getListData({}));
  };

  return (
    <div className="list-content">
      <ScrollView loadCallback={onLoadPage(page)} isend={isend}>
        {list.map((item, index) => {
          return <ListItem key={index} itemData={item}></ListItem>;
        })}
      </ScrollView>
    </div>
  );
};

export default connect(({ contentListReducer: { list, page, isend } }) => ({
  list,
  page,
  isend
}))(ContentList);
