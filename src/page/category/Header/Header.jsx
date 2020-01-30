import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { TABKEY } from "../config";

import {
  changeTabAction,
  getFilterData,
  changeFilter
} from "../actions/headerAction";
import { getListData } from "../actions/contentListAction";

import "./Header.scss";

const Header = ({ tabs, activeKey, filterData, closePanel, dispatch }) => {
  const [close, setClose] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = () => {
    dispatch(getFilterData());
  };

  const revertActive = (key, dataList) => {
    if (key === TABKEY.cate) {
      for (let i = 0; i < dataList.length; i++) {
        for (let j = 0; j < dataList[i].sub_category_list.length; j++) {
          dataList[i].sub_category_list[j].active = false;
        }
      }
    } else if (key === TABKEY.type) {
      for (let x = 0; x < dataList.length; x++) {
        dataList[x].active = false;
      }
    } else {
      for (let k = 0; k < dataList.length; k++) {
        for (let o = 0; o < dataList[k].items.length; o++) {
          dataList[k].items[o].active = false;
        }
      }
    }
  };

  const changeDoFilter = (item, key, dataList) => {
    revertActive(key, dataList);
    item.active = true;
    dispatch(
      changeFilter({
        item,
        key
      })
    );

    dispatch(
      getListData({
        filterData: item,
        toFirstPage: true
      })
    );
  };

  const changeTab = key => {
    // 如果前后点击的是同一个tab 就关闭panel
    if (activeKey === key && !closePanel) {
      setClose(true);
    }
    dispatch(
      changeTabAction({
        activeKey: key,
        closePanel: close
      })
    );
  };

  const renderTabGroups = () => {
    let array = [];

    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + " item";
      if (item.key === activeKey && !closePanel) {
        cls += " current";
      }

      array.push(
        <div
          className={cls}
          key={item.key}
          onClick={() => {
            changeTab(item.key);
          }}
        >
          {item.text}
        </div>
      );
    }

    return array;
  };

  const renderFilterInnerContent = (items, filterList) => {
    return items.map((item, index) => {
      let cls = item.icon ? "cate-box-inner has-icon" : "cate-box-inner";
      if (item.active) {
        cls += " active";
      }
      return (
        <div
          onClick={() => changeDoFilter(item, TABKEY.filter, filterList)}
          key={index}
          className="cate-box"
        >
          <div className={cls}>
            {item.icon ? <img src={item.icon} /> : null}
            {item.name}
          </div>
        </div>
      );
    });
  };

  const renderFilterContent = () => {
    let filterList = filterData.activity_filter_list || [];
    return filterList.map((item, index) => {
      return (
        <li key={index} className="filter-item">
          <p className="filter-title">{item.group_title}</p>
          <div className="item-content clearfix">
            {renderFilterInnerContent(item.items, filterList)}
          </div>
        </li>
      );
    });
  };

  const renderTypeContent = () => {
    let typeList = filterData.sort_type_list || [];
    return typeList.map((item, index) => {
      let cls = item.active ? "type-item active" : "type-item";

      return (
        <li
          onClick={() => changeDoFilter(item, TABKEY.type, typeList)}
          key={index}
          className={cls}
        >
          {item.name}
        </li>
      );
    });
  };

  const renderCateInnerContent = (items, cateList) => {
    return items.sub_category_list.map((item, index) => {
      let cls = item.active ? "cate-box-inner active" : "cate-box-inner";
      return (
        <div
          onClick={() => changeDoFilter(item, TABKEY.cate, cateList)}
          key={index}
          className="cate-box"
        >
          <div className={cls}>
            {item.name}({item.quantity})
          </div>
        </div>
      );
    });
  };

  const renderCateContent = () => {
    let cateList = filterData.category_filter_list || [];

    return cateList.map((item, index) => {
      return (
        <li key={index} className="cate-item">
          <p className="item-title">
            {item.name}
            <span className="item-count">{item.quantity}</span>
          </p>
          <div className="item-content clearfix">
            {renderCateInnerContent(item, cateList)}
          </div>
        </li>
      );
    });
  };

  const renderContent = () => {
    let array = [];
    for (let key in tabs) {
      let item = tabs[key];
      let cls = item.key + "-panel";
      if (item.key === activeKey) {
        cls += " current";
      }

      if (item.key === TABKEY.cate) {
        array.push(
          <ul key={item.key} className={cls}>
            {renderCateContent()}
          </ul>
        );
      } else if (item.key === TABKEY.type) {
        array.push(
          <ul key={item.key} className={cls}>
            {renderTypeContent()}
          </ul>
        );
      } else if (item.key === TABKEY.filter) {
        array.push(
          <ul key={item.key} className={cls}>
            {renderFilterContent()}
          </ul>
        );
      }
    }
    return array;
  };

  let cls = "panel";
  if (!closePanel) {
    cls += " show";
  } else {
    cls = "panel";
  }

  return (
    <div className="header">
      <div className="header-top">{renderTabGroups()}</div>
      <div className={cls}>
        <div className="panel-inner">{renderContent()}</div>
      </div>
    </div>
  );
};

export default connect(
  ({ headerReducer: { tabs, activeKey, filterData, closePanel } }) => ({
    tabs,
    activeKey,
    filterData,
    closePanel
  })
)(Header);
