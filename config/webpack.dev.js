const webpack = require("webpack");
const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const dev = process.env.NODE_ENV === "development";
const srcRoot = path.resolve(__dirname, "../src");
const devPath = path.resolve(__dirname, "../dev");
const pageDir = path.resolve(srcRoot, "page");
const mainFile = "index.js";

// 动态生成入口文件/Html模板文件

function getHtmlArray(entryMap) {
  let htmlArray = [];
  Object.keys(entryMap).forEach(key => {
    let fullPathName = path.resolve(pageDir, key);
    let fileName = path.resolve(fullPathName, key + ".html");

    if (fs.existsSync(fileName)) {
      htmlArray.push(
        new HtmlWebpackPlugin({
          filename: key + ".html",
          template: fileName,
          favicon: path.join(__dirname, "../public/meituan.ico"),
          chunks: ["common", key],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            minifyCSS: true
          },
          showErrors: true
        })
      );
    }
  });
  return htmlArray;
}

function getEntry() {
  let entryMap = {};

  fs.readdirSync(pageDir).forEach(pathname => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName, mainFile);

    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });

  return entryMap;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: "development",
  watchOptions: {
    ignored: "/node_modules/",
    aggregateTimeout: 300,
    // 默认每秒1000次
    poll: 1000
  },
  devServer: {
    host: "localhost",
    contentBase: devPath,
    open: true,
    hot: true,
    inline: true, // 实时刷新
    hot: true, // 热模块替换机制
    compress: false, // 是否对服务器资源启用gzip压缩
    overlay: {
      // 在浏览器输出编译错误
      warnings: true,
      errors: true
    },
    stats: "errors-only" // 编译时shell上的输出内容
  },
  entry: entryMap,
  resolve: {
    alias: {
      component: path.resolve(srcRoot, "component")
    },
    extensions: [".js", ".jsx"]
  },
  output: {
    path: devPath,
    filename: "[name].min.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: "babel-loader" }, { loader: "eslint-loader" }],
        include: srcRoot,
        enforce: "pre",
        exclude: /(node_modules)/
        // options: {
        //   // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
        //   formatter: require("eslint-friendly-formatter") // 指定错误报告的格式规范（需要安装）
        // }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { minimize: true } }
        ],
        include: srcRoot
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: srcRoot + "/component/rem_function.scss"
            }
          }
        ],
        include: srcRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: "url-loader?limit=8192",
        include: srcRoot
      }
    ]
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    minimize: true,
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "common"
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new WebpackBar({
      name: `MeiTuan APP MPA ${dev ? "dev" : "prod"}`,
      color: "steelblue",
      profile: true,
      fancy: true
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["Your application is running here http://localhost:8080"],
        notes: ["一些注意事项"]
      },
      clearConsole: true
    })
  ].concat(htmlArray)
};
