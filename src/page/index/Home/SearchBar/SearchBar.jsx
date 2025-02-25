import React from "react";

import "./SearchBar.scss";

const SearchBar = () => (
  <div className="search-bar">
    <div className="bar-location">
      <div className="location-icon"></div>
      <div className="location-text">郑州市</div>
    </div>
    <div className="search-btn">
      <p className="place-holder">鸡翅</p>
    </div>
  </div>
);

export default SearchBar;
