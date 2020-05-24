# react-webpack-express
react+webpack+express

使用react+webpack，express作web服务。
## 目录结构
/src文件为react开发文件
/routers文件为express的router文件存放位置
/middleware文件为express的中间件,公共方法,请求方法等存放位置，包括request文件为封装的请求方法，utils文件为封装的公共方法
/api文件为/routers文件里的api的接口方法

```Bash
npm init //初始化
npm run start:app //开发环境运行，该运行方式是express做web服务
npm run build //打包
npm run start:app:prod //生产环境运行
npm start //生产环境运行，该运行方式是webpack-dev-server做web服务
```

