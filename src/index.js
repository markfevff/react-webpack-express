import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/store/index'
import '@/index.scss';
import {Route, Switch,Link,BrowserRouter} from 'react-router-dom';
import LoadableComponent from '@/load';
/* import User from './user';
import Home from './home'; */

const Home = LoadableComponent(() => import('@/home'));
const User = LoadableComponent(() => import('@/user'));
const UserEdit = LoadableComponent(() => import('@/userEdit'));
const OrderEdit = LoadableComponent(() => import('@/orderEdit'));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/user" component={User} />
                        <Route exact path="/user/edit" component={UserEdit} />
                        <Route exact path="/order/edit" component={OrderEdit} />
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
            </Provider>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));
