require('env2')(`.${process.env.NODE_ENV}.env`)//引入对应的.env文件
let express = require('express');
let path = require('path');
let config = require('./config');
let apiRouter = require('./routers')

const initHMR = async (app) => {
    if(!config.HMR) return;
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    const compiler = await webpack(Object.assign({},webpackConfig,{
        mode: 'development'
    }));
    var webpackDevMiddleware=require('webpack-dev-middleware');
    await app.use(webpackDevMiddleware(compiler,{
        publicPath:'/',
        stats:{color:true},
        lazy:false,
        writeToDisk: true,//采用内存存储还是打包到打包文件里
        watchOptions:{
            aggregateTimeout:300,
            poll:true
        },
    }));
    var webpackHotMiddleware=require('webpack-hot-middleware');
    await app.use(webpackHotMiddleware(compiler)); 
}
const listen = (app) => {
    const server = app.listen(config.PORT);
    console.log(`visit: http://localhost:` + config.PORT);
    return server;
}
const create = async () => {
    var app = express();
    await initHMR(app);
    app.set('views', path.join(__dirname, 'dist'));    //html文件加载路径
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', function (request, response){
        console.log('get-request.path:',request.path)
        response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    })
    app.use('/', apiRouter);
    app.on('error', error => {
        console.log("error:", error);
    });
    return app;
}
module.exports = {
    listen: listen,
    create: create,
};
