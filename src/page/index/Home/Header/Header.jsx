import React from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./Header.scss";

const Header = () => (
  <div className="header">
    <SearchBar />
    <img
      className="banner-img"
      // FIXME: error img url
      src="http://xs01.meituan.net/waimai_i/img/bannertemp.e8a6fa63.jpg"
    />
  </div>
);

export default Header;
