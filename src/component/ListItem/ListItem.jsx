import React from "react";
import { connect } from "react-redux";
import StarScore from "component/StarScore/StarScore";

import "./ListItem.scss";

const ListItem = ({ itemData: data }) => {
  const renderBrand = ({ brand_type }) => {
    if (brand_type) {
      return <div className="brand brand-pin">品牌</div>;
    } else {
      return <div className="brand brand-xin">新到</div>;
    }
  };

  const renderMonthNum = ({ month_sale_num: num }) => {
    // 大于999采用999+
    if (num > 999) {
      return "999+";
    }
    return num;
  };

  const renderMeituanFlag = ({ delivery_type }) => {
    if (delivery_type) {
      return <div className="item-meituan-flag">美团专送</div>;
    }

    return null;
  };

  const renderOthers = ({ discounts2: array }) => {
    return array.map((item, index) => {
      return (
        <div key={index} className="other-info">
          <img src={item.icon_url} className="other-tag" />
          <div className="other-content">{item.info}</div>
        </div>
      );
    });
  };

  const goDetail = ({ id }) => {
    window.location.href = "./detail.html?id=" + id;
  };
  return (
    <div onClick={() => goDetail(data)} className="r-item-content scale-1px">
      <img className="item-img" src={data.pic_url} />
      {renderBrand(data)}
      <div className="item-info-content">
        <p className="item-title">{data.name}</p>
        <div className="item-desc clearfix">
          <div className="item-score">
            <StarScore score={data.wm_poi_score} />
          </div>
          <div className="item-count">月售{renderMonthNum(data)}</div>
          <div className="item-distance">&nbsp;{data.distance}</div>
          <div className="item-time">{data.mt_delivery_time}&nbsp;|</div>
        </div>
        <div className="item-price">
          <div className="item-pre-price">{data.min_price_tip}</div>
          {renderMeituanFlag(data)}
        </div>
        <div className="item-others">{renderOthers(data)}</div>
      </div>
    </div>
  );
};

export default connect()(ListItem);
