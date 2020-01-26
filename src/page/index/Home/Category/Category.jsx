import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { getHeaderData } from "../../actions/categoryAction";
import "./Category.scss";

const Category = ({ items, dispatch }) => {
  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = useCallback(() => {
    dispatch(getHeaderData());
  });

  const goToCategory = () => {
    // TODO:前往不同页面
    window.location.href = "./category.html";
  };

  return (
    <>
      <div className="category-content clearfix">
        {items.splice(0, 8).map((item, index) => {
          return (
            <div key={index} className="category-item" onClick={goToCategory}>
              <img className="item-icon" src={item.url} />
              <p className="item-name">{item.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default connect(state => ({
  items: state.categoryReducer.items
}))(Category);
