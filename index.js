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
    /* var webpackHotMiddleware=require('webpack-hot-middleware');
    await app.use(webpackHotMiddleware(compiler));  */
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
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use('/', apiRouter);
    /* app.get('/web', function (request, response){
        console.log('web');
        response.send('web')
    }) */
    app.get('*', function (request, response){
        console.log('get-request.path:',request.path);
        return response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
        
        let code = request.query.code;
        console.log('code:',code);
        if(code) {
            console.log('code_true')
            // return response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
        }else{
            console.log('code_undefined')
            let _url = request.protocol + "://" + request.host + request.originalUrl;
            let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdb5adfcc1b237454&redirect_uri=${encodeURIComponent(_url)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
            console.log('authUrl:',authUrl,',_url:',_url)
            return response.redirect(authUrl);
        } 
    })
    app.on('error', error => {
        console.log("error:", error);
    });
    return app;
}
module.exports = {
    listen: listen,
    create: create,
};
