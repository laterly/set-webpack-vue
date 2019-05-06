const path=require('path');
const stylelintWebpackPlugin=require('stylelint-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const config=require('./index');
module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash:8].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      minify: {
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    ...(config.prod.STYLELINT
      ? [
          new stylelintWebpackPlugin({
            files: [
              "**/*.css",
              "**/*.less",
              "**/*.html",
              "**/*.htm",
              "**/*.vue",
              "**/*.scss"
            ]
          })
        ]
      : []),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css"
    }),
    new UglifyjsWebpackPlugin()
  ]
};
