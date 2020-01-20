# 美团外卖APP仿真版

> 常年以美团为生，会员一年一年的买，红包有时候买满还不够用的我，三餐/夜宵/水果/给女朋友点奶茶，这次看到这个项目就感觉按耐不住了...
> （饿了么我一般用来买菜还有偶尔水果）
> 但是这个项目有几个问题：
>
> - 依赖版本过低或是缺失，比如 `babel` 还是6，webpack和各种插件/loader版本也挺老的，还有，没有 `webpackbar` 导致我感觉打包过程没氛围（？）
> - 目录结构，emmm太没有美感了
> - 组件复用及拆分做的不是很到位
> - 代码格式，看了一下好像UI和逻辑还是有些耦合
> - mock数据的方式是文件夹和一堆JSON文件
> - ...
>
> 那还说个🔨，重构啊！

## 重构计划

- [x] 升级核心依赖，添加辅助依赖
  - Babel --> 7.0
  - Stylelint & Eslint(alloy及各种plugin) & Tslint ...等
  - friendly-errors-webpack-plugin & webpackbar
  - mini-css-extract-plugin
  - purify-css & purifycss-webpack
  - speed-measure-webpack-plugin & webpack-visualizer-plugin
  - ...

- [ ] 区分开发/测试/部署环境
- [ ] tsx重构组件，耦合⬇ 内聚⬆
- [ ] Koa & Ts 搭建服务端，提供 RestFul Api（如果学了GraphQL就上它）
- [ ] 单元测试、UI测试等
- [ ] 优化样式表现
- [ ] 添加更多功能
- [ ] （终极版）使用React Native重构
