// import 'amfe-flexible';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import VConsole from 'vconsole/dist/vconsole.min.js'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import store,{persistor} from '@/store/index';
import './index.scss';
import {Route, Switch,Link,BrowserRouter} from 'react-router-dom';
import Routers from '@/routers/routers';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history'
// let vConsole = new VConsole()

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
                <Route component={Routers}/>
                <div style={{
                    paddingTop: '200px'
                }}>
                    <p><Link to="/">首页</Link></p>
                    <p><Link to="/user">用户</Link></p>
                    <p><Link to="/user/edit">用户编辑</Link></p>
                    <p><Link to="/order/edit?id=1&key=2&key2=我很好">订单编辑</Link></p>
                    <p><Link to="/app/article/info">文章</Link></p>
                </div>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root')
)
