# 美团外卖 APP 仿真版

> 常年以美团为生，会员一年一年的买，红包有时候买满还不够用的我，三餐/夜宵/水果/给女朋友点奶茶，这次看到这个项目就感觉按耐不住了...
> 但是这个项目有几个问题：
>
> - 依赖版本过低或是缺失，比如 `babel` 还是 6，webpack 和各种插件/loader 版本也挺老的，还有，没有 `webpackbar` 导致我感觉打包过程没氛围（？）
> - 目录结构，emmm 太没有美感了
> - 组件复用及拆分做的不是很到位
> - 代码格式，看了一下好像 UI 和逻辑还是有些耦合
> - mock 数据的方式是文件夹和一堆 JSON 文件
> - ...
>
> 那还说个 🔨，重构啊！

## 重构计划

- [x] 升级核心依赖，添加辅助依赖

  - Babel --> 7.0
  - lint 工具
  - Webpack 优化插件
  - ...

- [ ] 区分开发/测试/部署环境
- [x] Hooks、FC 初步重构所有组件，一个类组件不留
- [ ] tsx 重构组件，耦合 ⬇ 内聚 ⬆
- [ ] Koa & Ts 搭建服务端，提供 RestFul Api（如果学了 GraphQL 就上它）
- [ ] 单元测试、UI 测试等
- [ ] 优化样式表现
- [ ] 添加更多功能
- [ ] （终极版）使用 React Native 重构

## 原有结构整理

```text
目 录 结 构
| - config/ ----- webpack 配置
| - dev/ ----- 暂时的mock文件
| - router/ ----- 服务端路由
| - server/ ----- 服务端入口
| - src/
| | - component/ ----- 组件
| | - page/
    | - category/ -----
    | - detail/ -----
    | - evalution/ -----
    | - index/ -----
  | - static/ ----- 美团token、样式转化文件


```

### [history](https://github.com/ReactTraining/history/tree/master/docs)

对浏览器 `History` `Location` API 的增强（封装），这里使用了其 `createHashHistory` api，创建基于 hash 的 history 栈。

### react-router-redux(5.0.0-alpha.9)

解决了 redux 和 react-router 协作的问题，属于 redux 的中间件。这里将 `history` 和 `react-router-redux` 结合起来作为 react-redux 的中间件，能够将 history 接收到的变化反馈到 store 中（dispatch action）。同时可以使用 redux 的方式去操作 react-router，例如跳转 url 可以通过 dispatch 来执行。本质上好像就是把 react-router 原本私有的状态也交给 redux 管理了。

```javascript
<Provider store={store}>{/*react-redux*/}
  <ConnectedRouter history={history}>
    <Container />
  </ConnectedRouter>
</Provider>,
```

（!这个仓库已经不维护了，估计要寻找新的替代品）

### 开启 webpack HMR

- 全局开启代码热替换 (HotModuleReplacementPlugin)
- 插入热替换代码 module.hot.accept

```javascript
// 如果更改了reducer，则重新赋值reducer，来保持HMR完整性
module.hot.accept("./reducers/main", () => {
  const nextRootReducer = require("./reducers/main.js").default;
  store.replaceReducer(nextRootReducer);
});
```
