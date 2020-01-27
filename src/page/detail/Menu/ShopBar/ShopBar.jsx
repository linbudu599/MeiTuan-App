import React, { useState } from "react";
import { connect } from "react-redux";

import {
  showChoose,
  addSelectItem,
  minusSelectItem,
  clearCar
} from "../../actions/menuAction";

import "./ShopBar.scss";

const ShopBar = ({ dispatch, listData, showChooseContent }) => {
  const getTotalPrice = listData => {
    let data = listData.food_spu_tags || [];
    let totalPrice = 0;
    let dotNum = 0;
    let chooseList = [];

    for (let i = 0; i < data.length; i++) {
      let spus = data[i].spus || [];
      for (let j = 0; j < spus.length; j++) {
        let chooseCount = spus[j].chooseCount;
        if (chooseCount > 0) {
          dotNum += chooseCount;
          spus[j]._index = j;
          spus[j]._outIndex = i;
          chooseList.push(spus[j]);
          totalPrice += spus[j].min_price * chooseCount;
        }
      }
    }

    return {
      dotNum,
      totalPrice,
      chooseList
    };
  };
  const addSelectItem = item => {
    dispatch(
      addSelectItem({
        index: item._index,
        outIndex: item._outIndex
      })
    );
  };
  const minusSelectItem = item => {
    dispatch(
      minusSelectItem({
        index: item._index,
        outIndex: item._outIndex
      })
    );
  };
  const renderChooseItem = data => {
    let array = data.chooseList || [];
    return array.map((item, index) => {
      return (
        <div key={index} className="choose-item">
          <div className="item-name">{item.name}</div>
          <div className="price">¥{item.min_price * item.chooseCount}</div>
          <div className="select-content">
            <div onClick={() => minusSelectItem(item)} className="minus"></div>
            <div className="count">{item.chooseCount}</div>
            <div onClick={() => addSelectItem(item)} className="plus"></div>
          </div>
        </div>
      );
    });
  };

  const openChooseContent = () => {
    let flag = showChooseContent;
    dispatch(
      showChoose({
        flag: !flag
      })
    );
  };
  const clearCar = () => {
    dispatch(clearCar());
    dispatch(
      showChoose({
        flag: false
      })
    );
  };

  let shipping_fee = listData.poi_info ? listData.poi_info.shipping_fee : 0;
  let data = getTotalPrice(listData);

  return (
    <div className="shop-bar">
      {showChooseContent ? (
        <div className="choose-content">
          <div className="content-top">
            <div onClick={() => clearCar()} className="clear-car">
              清空购物车
            </div>
          </div>
          {renderChooseItem(data)}
        </div>
      ) : null}
      <div className="bottom-content">
        <div onClick={() => openChooseContent()} className="shop-icon">
          {data.dotNum > 0 ? (
            <div className="dot-num">{data.dotNum}</div>
          ) : null}
        </div>
        <div className="price-content">
          <p className="total-price">¥{data.totalPrice}</p>
          <p className="other-price">另需配送&nbsp;¥{shipping_fee}</p>
        </div>
        <div className="submit-btn">去结算</div>
      </div>
    </div>
  );
};

export default connect(({ menuReducer: { listData, showChooseContent } }) => ({
  listData,
  showChooseContent
}))(ShopBar);
