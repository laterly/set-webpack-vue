const path=require('path');
const stylelintWebpackPlugin=require('stylelint-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
const config=require('./index');
module.exports={
    output:{
        filename:'app.js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../index.html')
        }),
        ...config.dev.STYLELINT?[new stylelintWebpackPlugin({
            files: ['**/*.css', '**/*.less', '**/*.html', '**/*.htm', '**/*.vue', '**/*.scss']
        })]:[],
        new VueLoaderPlugin()
    ],
    devtool: 'source-map'
}
