import React from "react";
import { connect } from "react-redux";

import "./ListItem.scss";

const Product = data => {
  const { product_list } = data;

  let _list = JSON.parse(JSON.stringify(product_list));
  // 商品列表末尾标识项
  _list.push({ type: "end" });
  return _list.map((item, index) => {
    // 如果到达最后一项，则就算总价
    if (item.type === "end") {
      return TotalPrice(data, index);
    }
    return (
      <div className="product-item" key={index}>
        {item.product_name}
        <div className="p-count">x{item.product_count}</div>
      </div>
    );
  });
};

const TotalPrice = (data, idx) => {
  return (
    <div key={idx} className="product-item">
      <span>...</span>
      <div className="p-total-count">
        总计{data.product_count}份菜品，实付
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
  // TODO: feat：进入对应评价界面
  window.location.href = "./evaluation.html";
};

const goToDetail = () => {
  // TODO: feat：进入对应商家界面
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
