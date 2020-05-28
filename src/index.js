import 'amfe-flexible';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import VConsole from 'vconsole/dist/vconsole.min.js'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import store,{persistor} from '@/store/index';
import '@/index.scss';
import {Route, Switch,Link,BrowserRouter} from 'react-router-dom';
import LoadableComponent from '@/load';
import Routers from '@/routers/routers';
// let vConsole = new VConsole()

const Home = LoadableComponent(() => import('@/pages/home/home'));
const User = LoadableComponent(() => import('@/pages/user/user'));
const UserEdit = LoadableComponent(() => import('@/pages/userEdit/userEdit'));
const OrderEdit = LoadableComponent(() => import('@/pages/orderEdit/orderEdit'));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <BrowserRouter>
                        <Switch>
                            <Routers />
                            {/* <Route exact component={Home} path='/'/>
                            <Route exact component={User} path='/user'>
                                <Route exact component={UserEdit} path='edit'/>
                            </Route>
                            <Route exact component={OrderEdit} path='/order/edit'/> */}
                        </Switch>
                        <div style={{
                            paddingTop: '200px'
                        }}>
                            <p><Link to="/">首页</Link></p>
                            <p><Link to="/user">用户</Link></p>
                            <p><Link to="/user/edit">用户编辑</Link></p>
                            <p><Link to="/order/edit?id=1&key=2&key2=我很好">订单编辑</Link></p>
                        </div>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
