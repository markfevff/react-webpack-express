import React,{PureComponent} from 'react';
import {Switch,Route} from 'react-router-dom';
import routersConfig from './routers.config';
import LoadableComponent,{AuthProvider} from '@/hoc/loadableComponent';
import { connect } from 'react-redux';
import {updateRoutersSync} from '@/store/actions/user'
import { Divider } from 'antd';

const NotFount = LoadableComponent(() => import('@/pages/404'))

class Routers extends PureComponent{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    renderRouters(routers) {
        return routers.reduce((result,router) => {
            if(router.routers) {
                let _result = [];
                if(router.path && router.componentPath) {
                    let Component = LoadableComponent(() => import(`@/pages/${router.componentPath}`))
                    _result = _result.concat(
                        <Route 
                            key={router.key} 
                            exact={router.exact} 
                            // component={component}
                            render={props => {
                                if(router.isAuth) {
                                    return (
                                        <AuthProvider {...props}>
                                            <Component {...props}/>
                                        </AuthProvider>
                                    )
                                }else{
                                    return <Component {...props}/>
                                } 
                            }}
                            path={router.path}
                        />
                    )
                }
                _result = _result.concat(...this.renderRouters(router.routers))
                return result.concat(..._result);
            }else{
                let Component = LoadableComponent(() => import(`@/pages/${router.componentPath}`))
                return result.concat(
                    <Route 
                        key={router.key} 
                        exact={router.exact} 
                        // component={component}
                        render={props => {
                            if(router.isAuth) {
                                return (
                                    <AuthProvider {...props}>
                                        <Component {...props}/>
                                    </AuthProvider>
                                )
                            }else{
                                return <Component {...props}/>
                            } 
                        }}
                        path={router.path}
                    />
                )
            }
        },[])
    }
    render() {
        // let {routers} = this.props.userInfo;
        let routers = routersConfig;
        console.log('renderRouters:',this.renderRouters(routers))
        return(
            <React.Fragment>
                <Switch>
                    {
                        this.renderRouters(routers)
                    }
                    <Route path="*" component={NotFount} exact/>
                </Switch>
            </React.Fragment>
        ) 
    }
}

const mapStateToDispatch = dispatch => {
    return {
        handleUpdateRouters: data => dispatch(updateRoutersSync(data))
    }
}

const mapStateToProps = state => {
    return{
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps,mapStateToDispatch)(Routers)
