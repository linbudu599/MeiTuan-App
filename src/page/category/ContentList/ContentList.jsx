import React, { useEffect } from "react";
import { connect } from "react-redux";

import ListItem from "component/ListItem/ListItem.jsx";
import ScrollView from "component/ScrollView/ScrollView.jsx";

import { getListData } from "../actions/contentListAction";

import "./ContentList.scss";

const ContentList = ({ list, page, dispatch, isend }) => {
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const onLoadPage = () => {
    if (page <= 3) {
      fetchData();
    }
  };

  const fetchData = () => {
    dispatch(getListData({}));
  };

  return (
    <div className="list-content">
      <ScrollView loadCallback={onLoadPage} isend={isend}>
        {list.map((item, index) => {
          return <ListItem key={index} itemData={item}></ListItem>;
        })}
      </ScrollView>
    </div>
  );
};

export default connect(({ contentListReducer: { list, page, isend } }) => ({
  list: list,
  page: page,
  isend: isend
}))(ContentList);
