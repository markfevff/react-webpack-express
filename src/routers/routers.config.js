import LoadableComponent from '@/load';

const Home = LoadableComponent(() => import('@/pages/home/home'));
const User = LoadableComponent(() => import('@/pages/user/user'));
const UserEdit = LoadableComponent(() => import('@/pages/userEdit/userEdit'));
const OrderEdit = LoadableComponent(() => import('@/pages/orderEdit/orderEdit'));

const routersConfig = [
    {
        key: '/',
        exact: true,
        component: Home,
        path: '/'
    },
    {
        key: '/user',
        exact: true,
        component: User,
        path: '/user',
        routers: [
            {
                key: '/user/edit',
                exact: true,
                component: UserEdit,
                path: '/user/edit',
                routers: [
                    {
                        key: '/order/edit',
                        exact: true,
                        component: OrderEdit,
                        path: '/order/edit'
                    }
                ]
            } 
        ]
    }
]

export default routersConfig;