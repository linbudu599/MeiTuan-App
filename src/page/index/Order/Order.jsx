import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import ScrollView from "component/ScrollView/ScrollView.jsx";
import ListItem from "./ListItem/ListItem";

import { getOrderData } from "../actions/orderAction";

import "./Order.scss";

const Order = ({ list, dispatch }) => {
  const [page, setPage] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = useCallback(() => {
    dispatch(getOrderData());
  });

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
      <div className="order">
        <div className="header">订单</div>
        <ScrollView dis="order" loadCallback={onLoadPage} isend={isEnd}>
          <div className="order-list">
            {list.map((item, index) => {
              return <ListItem itemData={item} key={index}></ListItem>;
            })}
          </div>
        </ScrollView>
      </div>
    </>
  );
};

export default connect(state => ({
  list: state.orderReducer.list
}))(Order);
