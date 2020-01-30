import React from "react";

import "./StarScore.scss";

const StarScore = ({ score }) => {
  const renderScore = () => {
    let wm_poi_score = score || "";

    let scores = wm_poi_score.toString();

    let scoreArray = scores.split(".");

    // 满星个数
    let fullstar = parseInt(scoreArray[0]);

    // 0.5即以上记半颗星，否则不记录
    // 半星个数
    let halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;

    // 0星个数
    let nullstar = 5 - fullstar - halfstar;

    let starjsx = [];

    // 渲染满星jsx
    for (let i = 0; i < fullstar; i++) {
      starjsx.push(<div key={i + "full"} className="star fullstar"></div>);
    }

    // 渲染满星jsx
    if (halfstar) {
      for (let j = 0; j < halfstar; j++) {
        starjsx.push(<div key={j + "half"} className="star halfstar"></div>);
      }
    }

    // 渲染0星jsx
    if (nullstar) {
      for (let k = 0; k < nullstar; k++) {
        starjsx.push(<div key={k + "null"} className="star nullstar"></div>);
      }
    }

    return starjsx;
  };
  return <div className="star-score">{renderScore()}</div>;
};

export default StarScore;
