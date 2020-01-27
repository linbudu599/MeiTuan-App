import React from "react";
import { connect } from "react-redux";
import CommentItem from "./CommentItem/CommentItem";
import ScrollView from "component/ScrollView/ScrollView.jsx";
import { getListData } from "../../actions/commentAction";

import "./CommentList.scss";

const CommentList = ({ commentList, dispatch }) => {
  const onLoadPage = () => {
    dispatch(getListData({}));
  };

  return (
    <div className="comment-list">
      <ScrollView loadCallback={onLoadPage} isend={0}>
        {commentList.map((item, index) => {
          return <CommentItem key={index} data={item}></CommentItem>;
        })}
      </ScrollView>
    </div>
  );
};

export default connect(({ commentReducer: { commentList } }) => ({
  commentList
}))(CommentList);
