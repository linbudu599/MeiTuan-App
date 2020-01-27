import React from "react";
import { connect } from "react-redux";

import {
  addSelectItemAction,
  minusSelectItemAction
} from "../../actions/menuAction";

import "./MenuItem.scss";

const MenuItem = ({ data: item, dispatch, _index }) => {
  const addSelectItem = () => {
    dispatch(
      addSelectItemAction({
        index: _index
      })
    );
  };

  const minusSelectItem = () => {
    dispatch(
      minusSelectItemAction({
        index: _index
      })
    );
  };

  return (
    <div className="menu-item">
      <img className="img" src={item.picture} />
      <div className="menu-item-right">
        <p className="item-title">{item.name}</p>
        <p className="item-desc two-line">{item.description}</p>
        <p className="item-zan">{item.praise_content}</p>
        <p className="item-price">
          ¥{item.min_price}
          <span className="unit">/{item.unit}</span>
        </p>
      </div>
      <div className="select-content">
        {item.chooseCount > 0 ? (
          <div onClick={() => minusSelectItem()} className="minus"></div>
        ) : null}
        {item.chooseCount > 0 ? (
          <div className="count">{item.chooseCount}</div>
        ) : null}
        <div onClick={() => addSelectItem()} className="plus"></div>
      </div>
    </div>
  );
};

export default connect()(MenuItem);
