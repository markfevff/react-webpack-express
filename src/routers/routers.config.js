/* 
    路由配置表
    {
        key: '/',
        exact: true,
        componentPath: 'home/home',//组件的路径 去掉'@/pages/'前缀
        path: '/',
        isAuth: true,//是否需要获取用户信息
    },
*/
const routersConfig = [
    {
        key: '/',
        exact: true,
        componentPath: 'home/home',
        path: '/',
        isAuth: true,//是否需要获取用户信息
    },
    {
        key: '/order/edit',
        exact: true,
        componentPath: 'orderEdit/orderEdit',
        path: '/order/edit',
        isAuth: true,//是否需要获取用户信息
    },
    {
        key: '/user',
        exact: true,
        componentPath: 'user/user',
        path: '/user',
        isAuth: true,//是否需要获取用户信息
        routers: [
            {
                key: '/user/edit',
                exact: true,
                componentPath: 'userEdit/userEdit',
                path: '/user/edit',
                isAuth: true,//是否需要获取用户信息
            },
        ]
    },
    {
        key: '/app/article/info',
        exact: true,
        componentPath: 'app/article/info',
        path: '/app/article/info',
        isAuth: true,//是否需要获取用户信息
    },
    {
        key: '/home/noauth',
        exact: true,
        componentPath: 'home/home',
        path: '/home/noauth',
        isAuth: false,//是否需要获取用户信息
    },
]

export default routersConfig;