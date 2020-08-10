import React, { Component,PureComponent,useState } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import {getUserInfoSync,updateUserInfoByDoctorIdSync,updateRoutersSync} from '@/store/actions/user';
import {getPlatform} from '@/utils';
import {Loading} from '@/components';

/* function Loading(props) {
    console.log('Loading-props:', props)
    return <div>加载中........</div>
} */

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}
const mapStateToDispatch = dispatch => {
    return {
        handleUpdateUserInfoSync: data => dispatch(getUserInfoSync(data)),
        handleUpdateUserInfoByDoctorIdSync: data => dispatch(updateUserInfoByDoctorIdSync(data)),
        handleUpdateRouters: data => dispatch(updateRoutersSync(data))
    }
}

const LoadableComponent = component => {
    return Loadable({
        loader: component,
        loading: Loading,
        delay: 1000
    })
}

class AuthProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            platform: getPlatform(),//哪个环境 wechat(微信) other(app),
            error: '',
        }
    }
    async componentDidMount() {
        // this.props.handleUpdateRouters()
        console.log('AuthProvider-props:',this.props)
        let {userInfo} = this.props;
        let {platform} = this.state;
        this.search = location.search;
        console.log('search:',this.search)
        this.locationQuery = new URLSearchParams(this.search)
        if(!userInfo.userInfo) {
            console.log('platform:',platform)
            if(platform == 'wechat'){
                this.getUserInfoFromWechat();
            }else{
                this.getUserInfoFromApp();
            }
        }
    }
    getUserInfoFromWechat() {//微信端获取用户信息
        let code = this.locationQuery.get('code');
        console.log('getUserInfoFromWechat-code:',code)
        if(code) {
            this.props.handleUpdateUserInfoSync(code)
        }else{
            let redir = location.href;
            if(!this.search) {
                redir += '?v=1'
            }
            location.replace('http://app.umer.com.cn/common/getCodeFromWx?redir=' + encodeURIComponent(redir))
        }
    }
    async getUserInfoFromApp() {//app端获取用户信息
        let doctorId = this.locationQuery.get('doctorId');
        console.log('AuthProvider-doctorId:',doctorId)
        if(!doctorId) 
            return this.setState({
                error: '获取用户信息失败'
            })
        this.props.handleUpdateUserInfoByDoctorIdSync(doctorId)
    }
    render() {
        const {children,userInfo} = this.props;
        const {error}  = this.state;
        if(error || userInfo.saveUserInfoErr) {
            return <div>{'获取用户信息失败'}</div>
        }
        if(userInfo.userInfo) return (
            children
        );
        return <Loading />;
    }
} 


AuthProvider = connect(mapStateToProps, mapStateToDispatch)(AuthProvider);
export {
    AuthProvider,
}
export default LoadableComponent