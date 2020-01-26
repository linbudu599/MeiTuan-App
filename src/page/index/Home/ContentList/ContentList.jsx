import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import ListItem from "component/ListItem/ListItem.jsx";
import ScrollView from "component/ScrollView/ScrollView.jsx";

import { getListData } from "../../actions/contentListAction";

import "./ContentList.scss";

const ContentList = ({ list, dispatch }) => {
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    fetchData(0);
    return () => {};
  }, []);

  const fetchData = page => {
    dispatch(getListData(page));
  };

  const onLoadPage = () => {
    setPage(page => page + 1);
    if (page > 3) {
      setIsEnd(true);
    } else {
      fetchData(page);
    }
  };

  return (
    <>
      <div className="list-content">
        <h4 className="list-title">
          <span className="title-line"></span>
          <span>附近商家</span>
          <span className="title-line"></span>
        </h4>
        <ScrollView dis="content" loadCallback={onLoadPage} isend={isEnd}>
          {list.map((item, index) => {
            return <ListItem key={index} itemData={item}></ListItem>;
          })}
        </ScrollView>
      </div>
    </>
  );
};

export default connect(state => ({
  list: state.contentListReducer.list
}))(ContentList);
