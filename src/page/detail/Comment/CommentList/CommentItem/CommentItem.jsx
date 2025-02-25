import React from "react";
import { connect } from "react-redux";
import StarScore from "component/StarScore/StarScore";

import "./CommentItem.scss";

const CommentItem = ({ data: item }) => {
  const renderImgs = item => {
    let imgs = item.comment_pics || [];
    if (imgs.length) {
      return (
        <div className="img-content clearfix">
          {imgs.map((item, index) => {
            let src = item.url;
            let style = {
              backgroundImage: "url(" + src + ")"
            };
            return <div key={index} className={"img-item"} style={style}></div>;
          })}
        </div>
      );
    } else {
      return null;
    }
  };
  const renderTags = label => {
    return label.map(item => {
      return item.content + "，";
    });
  };
  const formatTime = time => {
    let date = new Date(Number(time + "000"));

    return (
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate()
    );
  };

  return (
    <div className="comment-item">
      <div className="comment-time">{formatTime(item.comment_time)}</div>
      <img
        className="avatar"
        src={
          item.user_pic_url ||
          "http://xs01.meituan.net/waimai_i/img/default-avatar.c4e0230d.png"
        }
      />
      <div className="item-right">
        <p className="nickname">{item.user_name}</p>
        <div className="star-and-time">
          <div className="star-content">
            <StarScore score={item.order_comment_score} />
          </div>
          <div className="send-time">{item.ship_time + "分钟送达"}</div>
        </div>
        <div className="comment-text">{item.comment}</div>
        {renderImgs(item)}
        {item.praise_food_tip ? (
          <div className="like-info">{item.praise_food_tip}</div>
        ) : null}
        {item.comment_labels.length ? (
          <div className="tag-info">{renderTags(item.comment_labels)}</div>
        ) : null}
      </div>
    </div>
  );
};

export default connect()(CommentItem);
