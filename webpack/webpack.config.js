const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require("webpack")

module.exports = {
   entry:"./src/index.js",
   output:{
       path:path.resolve(__dirname,'./dist'),
       filename:"main.js"
   },
   mode:"development",
   // 模块
   module:{
       rules:[
        //处理图片
        {
            test:/\.(png|jpe?g|gif)$/,
            // use:["file-loader"]
            use:[{
                loader:"file-loader",
                options:{
                    name:"[name]_[hash:8].[ext]"
                }
            }]
        },{
            test:/\.css$/,
           // use:["style-loader","css-loader"]  // 从右往左执行
            use:[MiniCssExtractPlugin.loader,"css-loader"]
        }   
       ]
   },
   devServer:{
      contentBase:"./dist",
      open:true,
      hot:true,
      hotOnly:true,//开启hotonly，即使HMR不生效，浏览器也不自动更新。
   },
   plugins:[
       new HtmlWebpackPlugin({
       template:"./src/index.html",
       filename:"tmac.html"
       }),// 生成html模板文件
       new CleanWebpackPlugin(),//每次打包前清除dist目录
       new MiniCssExtractPlugin({
           filename:"[name]_[chunkhash:8].css"
       }),// 抽取出css文件
       new webpack.HotModuleReplacementPlugin() //HMR是指模块刷新 HMR支持style-loader css的处理方式，不支持抽离成独立文件的方式
   ]   
}