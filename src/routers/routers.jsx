import React,{PureComponent} from 'react';
import {Route} from 'react-router-dom';
import routersConfig from './routers.config';
import LoadableComponent from '@/load';
const Home = LoadableComponent(() => import('@/pages/home/home'));

export default class Routers extends PureComponent{
    renderRouters(routers) {
        return routers.map(router => {
            if(router.routers) {
                return(
                    <>
                        <Route 
                            key={router.key} 
                            exact={router.exact} 
                            component={router.component}
                            path={router.path}
                        />
                        {
                            this.renderRouters(router.routers)
                        }
                    </>
                )
            }else{
                return <Route 
                    key={router.key} 
                    exact={router.exact} 
                    component={router.component}
                    path={router.path}
                />
            }
        })
    }
    render() {
        return(
            <React.Fragment>
                {
                    this.renderRouters(routersConfig)
                }
            </React.Fragment>
        ) 
    }
}
