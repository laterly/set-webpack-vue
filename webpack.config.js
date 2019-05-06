const path = require("path");
const config = require("./config/index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = (env, argv) => {
  env = env || {};
  let build = null; //启用配置
  let ESLINT = null; //启用eslint
  if (env.production) {
    build = require("./config/webpack.production");
    ESLINT = config.prod.ESLINT;
  } else if (env.development) {
    build = require("./config/webpack.development");
    ESLINT = config.dev.ESLINT;
  } else {
    build = require("./config/webpack.test");
  }
  return {
    entry: path.resolve(__dirname, "./src/app.js"),
    devServer: {
      contentBase: path.resolve(__dirname, "./src"),
      compress: true,
      port: 9000
    },
    //优化项配置
    optimization: {
      runtimeChunk: "single", // 等价于
      // runtimeChunk: {
      //   name: 'runtime'
      // }
      // 分割代码块
      splitChunks: {
        chunks: "all", //同时分割同步和异步代码,推荐。
        cacheGroups: {
          //公用模块抽离
          common: {
            chunks: "initial",
            minSize: 0, //大于0个字节
            minChunks: 2 //抽离公共代码时，这个代码块最小被引用的次数
          },
          //第三方库抽离
          vendor: {
            priority: 1, //权重
            test: /node_modules/,
            chunks: "initial",
            minSize: 0, //大于0个字节
            minChunks: 2 //在分割之前，这个代码块最小应该被引用的次数
          }
        }
      },
      minimizer: [
        // 自定义js优化配置，将会覆盖默认配置
        ...(env.production
          ? [
              new UglifyjsWebpackPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
                cache: true,
                parallel: true, // 开启并行压缩，充分利用cpu
                sourceMap: false,
                extractComments: false, // 移除注释
                uglifyOptions: {
                  compress: {
                    unused: true,
                    drop_debugger: true
                  },
                  output: {
                    comments: false
                  }
                }
              }),
              // 用于优化css文件
              new OptimizeCssAssetsWebpackPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                  safe: true,
                  autoprefixer: { disable: true }, // 这里是个大坑，否则会移除前缀
                  mergeLonghand: false,
                  discardComments: {
                    removeAll: true // 移除注释
                  }
                },
                canPrint: true
              })
            ]
          : [])
      ]
    },
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm",
        "@": path.resolve(__dirname, "./src")
      },
      extensions: [".js", ".json", ".vue", ".stylus", ".css"]
    },
    module: {
      rules: [
        //vue
        {
          test: /\.vue$/i,
          use: [
            {
              loader: "vue-loader"
            }
          ]
        },
        //css
        {
          test: /\.css$/i,
          use: [
            env.production
              ? {
                  loader: MiniCssExtractPlugin.loader
                }
              : {
                  loader: "style-loader"
                },
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")]
              }
            }
          ]
        },
        //stylus
        {
          test: /\.stylus$/i,
          use: [
            env.production
              ? {
                  loader: MiniCssExtractPlugin.loader
                }
              : {
                  loader: "style-loader"
                },
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")]
              }
            },
            {
              loader: "stylus-loader"
            }
          ]
        },
        //js
        {
          test: /\.js$/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"],
                plugins: [
                  "@babel/plugin-syntax-dynamic-import",
                  [
                    "import",
                    {
                      libraryName: "ant-design-vue",
                      libraryDirectory: "es",
                      style: "css"
                    }
                  ]
                ]
              }
            },
            ...(ESLINT
              ? [
                  {
                    loader: "eslint-loader",
                    options: {
                      exclude: /node_modules/
                    }
                  }
                ]
              : [])
          ]
        },
        //images
        {
          test: /\.(gif|jpg|jpeg|png)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4 * 1024,
                name: "images/[name].[hash:7].[ext]"
              }
            }
          ]
        },
        //fonts
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4 * 1024,
                name: "fonts/[name].[hash:7].[ext]"
              }
            }
          ]
        },
        //media
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 4 * 1024,
                name: "media/[name].[hash:7].[ext]"
              }
            }
          ]
        }
      ]
    },
    ...build
  };
};
