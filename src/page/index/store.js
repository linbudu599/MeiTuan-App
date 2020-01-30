import { createStore, applyMiddleware } from "redux";

import mainReducer from "./reducers/main.js";

import thunk from "redux-thunk";

import createHistory from "history/createHashHistory";

import { routerMiddleware } from "react-router-redux";

// 创建基于hash的history
const history = createHistory();

// 创建初始化tab
history.replace("home");

// 创建history的Middleware
const historyMiddl = routerMiddleware(history);

const store = createStore(mainReducer, applyMiddleware(thunk, historyMiddl));

if (module.hot) {
  // 监听主reducer模块的变化，在监听到变化后重新指定reducer
  // 这里是为了在热替换过程中更換reducer組
  module.hot.accept("./reducers/main", () => {
    const nextRootReducer = require("./reducers/main.js").default;
    store.replaceReducer(nextRootReducer);
  });
}
export { store, history };
