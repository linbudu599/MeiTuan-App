import { ORDER_DATA } from "./actionTypes";
import { CHANGEREADYSTATE } from "component/ScrollView/scrollViewActionsTypes.js";
import axios from "axios";

// 与ScrollView配合：在完成加载数据后，触发SVReducer中的changeState，设置readyToLoad为true
// 当其为true时，才会去执行SV组件的loadCallback方法，即加载更多数据

export const getOrderData = page => async dispatch => {
  dispatch({
    type: CHANGEREADYSTATE,
    obj: false
  });
  let resp = await axios({
    method: "get",
    url: "./json/orders.json"
  });
  dispatch({
    type: ORDER_DATA,
    currentPage: page,
    obj: resp.data
  });
  dispatch({
    type: CHANGEREADYSTATE,
    obj: true
  });
};
