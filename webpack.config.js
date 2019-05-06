const path = require("path");
const config = require("./config/index");

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
            {
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
            {
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
                outputPath: "images/"
              }
            }
          ]
        },
        //fonts
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          use: {
            loader: "url-loader",
            options: {
              outputPath: "fonts/",
              limit: 4 * 1024
            }
          }
        }
      ]
    },
    ...build
  };
};
