const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');//打包html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//删除打包缓存
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//将样式文件打包到文件里
const TerserJSPlugin = require('terser-webpack-plugin');//压缩js代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css
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
        path: path.join(__dirname, "dist/app"), // bundle生成(emit)到哪里
        filename: "js/[name]_[hash:8].js", // bundle生成文件的名称
        publicPath: '/app/'
    },
    optimization: {//优化
        minimize: true,//告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle。
        minimizer: [//使用的压缩方法
            new TerserJSPlugin({
                sourceMap: true,
                terserOptions: {
                    compress: {
                        typeofs: false,//default: true。为true时：将typeof foo == "undefined"转化为foo === void 0. 
                        arrows: false,//default: true。如果结果代码更短，被转换的类和对象文字方法也会被转换为箭头表达式:m(){return x}变成m:()=>x
                        properties: false,//default: true。foo["bar"] → foo.bar
                        pure_funcs: ['console.log'],//default: null.打包时删除的函数
                    } 
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
    	// 配置相应的规则
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [
                    {loader: 'babel-loader'},
                    {loader: 'eslint-loader'}
                ]
            },
            /* {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader',},
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        } 
                    },
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }, */
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: mode === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        } 
                    },
                    'sass-loader',
                ],
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
    performance: {//配置如何展示性能提示
        hints: false,//打开/关闭提示。 string = 'warning': 'error' | 'warning' boolean: false
    },
    plugins: [
        new CleanWebpackPlugin({
            dry: false,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html?v=[name]_[hash:8]'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: mode === 'development' ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: mode === 'development' ? 'css/[id].css' : 'css/[id].[hash].css',
          }),
    ],
    resolve: {
        extensions:['.js','.jsx','.json'],//自动解析确定的扩展
        alias: {
          '@': path.resolve(appDir, 'src'),
        },
    },
    devServer: {
        index: 'index.html',
        contentBase: './dist',
        port: 3001,
        historyApiFallback: true,
        writeToDisk: true,
        hot: true,
    }
}
