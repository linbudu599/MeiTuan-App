# 美团外卖 APP 仿真版

## 重构计划

淦，这玩意没法重构啊，遇到了几个问题：

- 依赖，牵一发而动全身，想升级到`React-Redux@7`来使用`useSelector`和`useDispatch`，结果整个崩掉了...

- 说是MPA，但其实没有啥意义，因为路由跳转只是简单的`window.location.href`，组成它的几个SPA也很简单...

- 但是之前完成这个项目的过程我还是收获很多的，大概是19年10月，毕竟这是第二个还是第三个React完成的项目。准备整理一下以前做这个项目期间的笔记和收获(；′⌒`)。

## 复盘

### 首次接触的NPM包

#### `React-Router-Redux`(`redux-simple-router`)

用于使路由与应用数据保持同步，使得你可以倒退/回放/重置数据等，这个库会确保react-router和redux同步。在这个应用里的主要用法是当切换路由时能够自动切换页面数据。

```js
import createHistory from "history/createHashHistory";
import { routerMiddleware } from "react-router-redux";
// 创建基于hash的history
const history = createHistory();
// 创建初始化tab
history.replace("home");
// 创建history的Middleware
const historyMiddl = routerMiddleware(history);
const store = createStore(mainReducer, applyMiddleware(thunk, historyMiddl));

// index.js
<Provider store={store}>
    <ConnectedRouter history={history}>
      <Container />
    </ConnectedRouter>
  </Provider>,
```

#### React-Loadable

实现懒加载。和React-Router一起用。

```js
const Order = Loadable({
  loader: () => import(/* webpackChunkName: "order" */ "../Order/Order"),
  loading: Loading
});
```

### 首次学习的...技巧？

#### 多页面应用路由

```js
window.history.back();
// 因为有react-router-redux，所以会同步
window.location.href="./category.html";
```

#### webpack热重载

先通过plugin开启HMR，然后它的接口会被暴露在`module.hot`上。

手动插入热替换代码：`module.hot.accept`

多页面中，由于有多个SPA对应各自的Reducer，因此我们需要在更新时只更换给定的模块的基础上修改根Reducer。在这里还和React-Hot-Loader协作。

```js
// 每个独立的SPA都需要整一下
if (module.hot) {
  module.hot.accept("./reducers/main", () => {
    // 使用更新过的模块替换reducer
    const nextRootReducer = require("./reducers/main.js").default;
    store.replaceReducer(nextRootReducer);
  });
}
```

#### NavLink

在`<Link>`的基础上，它还会为匹配渲染的元素添加属性与参数。如`activeClassName` 与 `activeStyleObject`等

#### 各个页面交互细节

- 评分打星，这里的实现方法是渲染三个部分，满星/半星/空白，但是这里是用原生div配合动态类名，感觉做成一个组件`<Star>`会更好。

- ScrollView组件

  - 主要是判断当`clientHeight`+`ScrollTop`加起来（即上半部分，包括不可见区域）距底部距离大于一定值时触发回调，这里还多了一个`readyToLoad`起到类似锁的作用。

  ```js
    const ScrollView = ({ isend, readyToLoad, loadCallback,    children }) => {
      useEffect(() => {
        window.addEventListener("scroll", onLoadPage);
        return () => window.removeEventListener("scroll", onLoadPage);
      }, []);

      const onLoadPage = () => {
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.body.scrollHeight;
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;

        let proLoadDis = 30;

        if (scrollTop + clientHeight >= scrollHeight - proLoadDis) {
          if (!isend) {
            if (!readyToLoad) {
              return;
            }
            loadCallback && loadCallback();
          }
        }
      };

      return (
        <div className="scrollview">
          {children}
          <Loading isend={isend} />
        </div>
      );
    };

    export default connect(({ scrollViewReducer: { readyToLoad } }) => ({
      readyToLoad
    }))(ScrollView);
  ```

#### 数据流

其实我感觉这个数据流还是有点小复杂的，特别是不使用Dva一类的库简化操作的话，原生redux的一堆模板代码真的看的人心烦意乱。
尤其是商家筛选和选购商品部份...
这一部分的逻辑待整理，因为还挺值得学习的。
