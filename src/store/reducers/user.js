import {
    SAVE_USER_INFO,SAVE_USER_INFO_BY_DOCTORID,SAVE_USER_INFO_ERROR,
    SAVE_ROUTERS,
} from '../actionTypes/user';

const initState = {
    userInfo: null,
    saveUserInfoErr: '',//获取用户信息失败的提示信息
    routers: [
        {
            key: '/',
            exact: false,
            component: '@/pages/home/home',
            path: '/'
        }
    ],//
}

export default function userInfo (state = initState,action = {}) {
    console.log('userInfo-state:',state)
    switch(action.type) {
        case SAVE_USER_INFO: {
            return {
                ...state,
                userInfo: {
                    ...action.userInfo
                },
                saveUserInfoErr: ''
            }
        };
        case SAVE_USER_INFO_BY_DOCTORID: {//获取用户信息 通过doctorId
            return {
                ...state,
                userInfo: {
                    ...action.userInfo
                },
                saveUserInfoErr: ''
            }
        };
        case SAVE_USER_INFO_ERROR: {//获取用户信息失败
            return{
                ...state,
                saveUserInfoErr: action.message
            }
        };
        case SAVE_ROUTERS: {//获取用户信息失败
            return{
                ...state,
                routers: action.routers
            }
        };
        default: return state
    }
}