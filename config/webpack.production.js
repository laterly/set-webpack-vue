const path=require('path');
const stylelintWebpackPlugin=require('stylelint-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config=require('./index');
module.exports={
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename: 'app.[hash:8].js'
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'../index.html')
        }),
        ...config.prod.STYLELINT?[new stylelintWebpackPlugin({
            files: ['**/*.css', '**/*.less', '**/*.html', '**/*.htm', '**/*.vue', '**/*.scss']
        })]:[],
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ]
}
