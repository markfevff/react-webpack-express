import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { updateUserInfoId } from '@/store/actions/user';

function Loading(props) {
    console.log('Loading-props:', props)
    return <div>加载中........</div>
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
}
const mapStateToDispatch = dispatch => {
    return {
        handleUpdateUserInfoId: data => dispatch(updateUserInfoId(data))
    }
}

/* 
    高阶函数 用于获取用户信息 返回原组件
*/
export function AuthCompoent(ChildComponent) {
    class ChildComponentWrap extends Component {
        constructor(props) {
            super(props);
            console.log('this.props:', props);
        }
        async componentDidMount() {
            await this.delayReturn(2000);
            /* let search = this.props.location.search;
            let locationQuery = new URLSearchParams(search)
            let code = locationQuery.get('code');
            console.log('code:', code)
            if (code) {
                console.log('code-true:', code)
                await this.delayReturn(2000);
            } else {
                let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdb5adfcc1b237454&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
                console.log('url:', url);
                location.replace(url)
            } */
        }
        updateUserInfoId() {
            console.log('updateUserInfoId')
            this.props.handleUpdateUserInfoId(1)
        }
        async delayReturn(ms) {
            return new Promise(resolve => setTimeout(this.updateUserInfoId.bind(this), ms))
        }
        render() {
            const { userInfo } = this.props;
            console.log('userInfo:', userInfo)
            if (userInfo.id)
                return <ChildComponent {...this.props} />

            else return <div>ChildComponent加载中.....</div>
        }
    }
    return connect(mapStateToProps, mapStateToDispatch)(ChildComponentWrap);
}



const LoadableComponent = component => {
    return Loadable({
        loader: component,
        loading: Loading,
        delay: 1000
    })
}



export default LoadableComponent