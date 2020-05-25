const path = require('path');
const fs = require('fs');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const appDir = fs.realpathSync(process.cwd());
let mode = 'development';
if(process.env.NODE_ENV == 'development'){
    mode = 'development'
}else{
    mode = 'production'
}
module.exports = {
     // 项目入口，webpack从此处开始构建
     mode: mode,
     entry: {
        main: path.join(__dirname, 'src/index.js'), // 指定入口，可以指定多个。参考webpack文档
     },
     output: {
        path: path.join(__dirname, "dist"), // bundle生成(emit)到哪里
        filename: "js/[name]_[chunkhash:8].js", // bundle生成文件的名称
        publicPath: '/'
    },
    module: {
    	// 配置相应的规则
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {loader: 'eslint-loader'}
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader',},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            {
                test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                use: [
                    // 小于8KB的图片会自动转成dataUrl
                    {
                        loader: 'url-loader',
                        options:{
                            limit:1024 * 8 ,
                            fallback:'file-loader',
                            name:'images/[hash].[name].[ext]'
                        }    
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions:['.js','.jsx','.json'],//自动解析确定的扩展
        alias: {
          '@': path.resolve(appDir, 'src'),
        },
    },
    devServer: {
        contentBase: './dist',
        port: 3001,
    }
}
