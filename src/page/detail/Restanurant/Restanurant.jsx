import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getRestanurantData } from "../actions/restanurantAction";

import "./Restanurant.scss";

const Restanurant = ({ dispatch, resData: data }) => {
  useEffect(() => {
    dispatch(getRestanurantData());
    return () => {};
  });

  const renderPayType = types => {
    let array = types || [];
    return array.map((item, index) => {
      return (
        <p key={index} className="restanurant-pay-type res-section">
          <img className="icon" src={item.icon_url} />
          {item.info}
        </p>
      );
    });
  };

  return (
    <div className="restanurant-content">
      <div className="restanurant-basic">
        <div className="restanurant-tel res-section">{data.call_center}</div>
        <div className="restanurant-addr res-section">
          <div className="addr-wrap">
            <div className="addr-name">商家地址：</div>
            <div className="addr-text">{data.address}</div>
          </div>
        </div>
      </div>
      <div className="restanurant-basic">
        <p className="restanurant-send-time res-section">
          配送时间：{data.shipping_time}
        </p>
        <p className="restanurant-send-type res-section">
          配送服务：
          {data.delivery_type === 1 ? (
            <span>
              <span className="meituan-send">美团专送</span>提供高质量配送服务
            </span>
          ) : (
            "商家配送"
          )}
        </p>
      </div>
      <div className="restanurant-basic">{renderPayType(data.discounts2)}</div>
    </div>
  );
};

export default connect(({ restanurantReducer: { resData } }) => ({
  resData
}))(Restanurant);
