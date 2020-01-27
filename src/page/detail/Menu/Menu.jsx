import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getListData, itemClick } from "../actions/menuAction";

import MenuItem from "./MenuItem/MenuItem";
import ShopBar from "./ShopBar/ShopBar";

import "./Menu.scss";

const Menu = ({ dispatch, currentLeftIndex, listData }) => {
  useEffect(() => {
    dispatch(getListData());
    return () => {};
  }, [listData]);

  const renderRightList = array => {
    let _array = array || [];
    return _array.map((item, index) => {
      if (!item.chooseCount) {
        item.chooseCount = 0;
      }
      return <MenuItem key={index} data={item} _index={index}></MenuItem>;
    });
  };

  const handleItemClick = index => {
    dispatch(
      itemClick({
        currentLeftIndex: index
      })
    );
  };

  const renderRight = () => {
    let index = currentLeftIndex;
    let array = listData.food_spu_tags || [];
    let currentItem = array[index];

    if (currentItem) {
      let title = (
        <p key={1} className="right-title">
          {currentItem.name}
        </p>
      );
      return [
        title,
        <div key={2} className="right-list">
          <div className="right-list-inner">
            {renderRightList(currentItem.spus)}
          </div>
        </div>
      ];
    } else {
      return null;
    }
  };

  const renderLeft = () => {
    let list = listData.food_spu_tags || [];

    return list.map((item, index) => {
      let cls = currentLeftIndex === index ? "left-item active" : "left-item";
      return (
        <div onClick={() => handleItemClick(index)} key={index} className={cls}>
          <div className="item-text">
            {item.icon ? <img className="item-icon" src={item.icon} /> : null}
            {item.name}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="menu-inner">
      <div className="left-bar">
        <div className="left-bar-inner">{renderLeft()}</div>
      </div>
      <div className="right-content">{renderRight()}</div>
      <ShopBar />
    </div>
  );
};

export default connect(({ menuReducer: { listData, currentLeftIndex } }) => ({
  listData,
  currentLeftIndex
}))(Menu);
