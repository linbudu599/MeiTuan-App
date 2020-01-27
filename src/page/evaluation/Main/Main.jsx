import React, { useEffect, useState, useRef } from "react";

import NavHeader from "component/NavHeader/NavHeader.jsx";

import "component/common.scss";
import "./Main.scss";

const maxCount = 140;

const Main = () => {
  const [count, setCount] = useState(maxCount);
  const [startIdx, setStartIdx] = useState(0);
  const [chineseInputing, setChineseInputing] = useState();

  const commentInput = useRef(null);

  useEffect(() => {
    commentInput.current.addEventListener("compositionstart", () => {
      setChineseInputing(true);
    });
    commentInput.current.addEventListener("compositionend", e => {
      setChineseInputing(false);
      onIuput(e.target.value);
    });
    return () => {};
  }, []);

  const onIuput = value => {
    let num = value.length;
    if (!chineseInputing) {
      setCount(maxCount - num);
    }
  };

  const doEva = i => {
    setStartIdx(i + 1);
  };

  const renderStar = () => {
    let array = [];
    for (let i = 0; i < 5; i++) {
      let cls = i >= startIdx ? "star-item" : "star-item light";
      array.push(<div onClick={() => doEva(i)} key={i} className={cls}></div>);
    }
    return array;
  };

  return (
    <div className="content">
      <NavHeader title="评价" />
      <div className="eva-content">
        <div className="star-area">{renderStar()}</div>
        <div className="comment">
          <textarea
            ref={commentInput}
            onChange={e => onIuput(e.target.value)}
            minLength="140"
            placeholder="亲，菜品的口味如何，商家的服务是否周到?"
            className="comment-input"
          ></textarea>
          <span className="count">{count}</span>
        </div>
        <p className="one-line product-name">+厚切鸡排 香辣口水鸡饭. 中辣</p>
      </div>
      <div className="submit">提交评价</div>
    </div>
  );
};

export default Main;
