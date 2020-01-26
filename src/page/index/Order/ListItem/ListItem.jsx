import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import "./ListItem.scss";

const Product = data => {
  const { product_list } = data;

  let _list = JSON.parse(JSON.stringify(product_list));
  // push一个用来计算总计的{type：more}
  _list.push({ type: "more" });

  return _list.map((item, index) => {
    if (item.type === "more") {
      return TotalPrice(item, data, index);
    }
    return (
      <div className="product-item" key={index}>
        {item.product_name}
        <div className="p-count">x{item.product_count}</div>
      </div>
    );
  });
};

const TotalPrice = (item, data, idx) => {
  return (
    <div key={idx} className="product-item">
      <span>...</span>
      <div className="p-total-count">
        总计{item.product_count}个菜，实付
        <span className="total-price">¥{data.total}</span>
      </div>
    </div>
  );
};

const CommentItem = data => {
  const evaluation = !data.is_comment;
  if (evaluation) {
    return (
      <div className="evaluation clearfix">
        <div className="evaluation-btn" onClick={goToEvalution}>
          评价
        </div>
      </div>
    );
  }
  return null;
};

const goToEvalution = () => {
  window.location.href = "./evaluation.html";
};

const goToDetail = () => {
  window.location.href = "./detail.html";
};

const ListItem = ({ itemData: data }) => {
  return (
    <>
      <div className="order-item">
        <div className="order-item-inner">
          <img className="item-img" src={data.poi_pic} />
          <div className="item-right">
            <div className="item-top" onClick={goToDetail}>
              <p className="order-name one-line">{data.poi_name}</p>
              <div className="arrow"></div>
              <div className="order-state">{data.status_description}</div>
            </div>
            <div className="item-bottom">{Product(data)}</div>
          </div>
        </div>
        {CommentItem(data)}
      </div>
    </>
  );
};

export default connect()(ListItem);
