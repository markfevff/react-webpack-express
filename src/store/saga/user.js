import { put, takeEvery,call } from 'redux-saga/effects';
import {getUserInfo,getUserInfoByDoctorId,getRouters} from '@/api/user';
import {
    SAVE_USER_INFO, SAVE_USER_INFO_ASYNC, SAVE_USER_INFO_ERROR,
    SAVE_USER_INFO_BY_DOCTORID, SAVE_USER_INFO_BY_DOCTORID_ASYNC,
    SAVE_ROUTERS,SAVE_ROUTERS_ASYNC
} from '../actionTypes/user';
import {delParam} from '@/utils';

function* updateUseInfo({code}) {//保存用户信息 通过openid
    const userInfo = yield call(getUserInfo,{code});
    let title = document.title;
    console.log('updateUserInfoByDoctorId-title:',title)
    let _url = delParam('code');
    console.log('_url:',_url)
    history.replaceState({
        foo: "bar",
    },title,_url)
    if(userInfo.code) {
        yield put({
            type: SAVE_USER_INFO,
            userInfo: userInfo.data,
        })
    }else{
        yield put({
            type: SAVE_USER_INFO_ERROR,
            message: userInfo.message,
        })
    }
}
function* updateUserInfoByDoctorId({doctorId}) {//保存用户信息 通过doctorId
    const {data,code,message} = yield call(getUserInfoByDoctorId,{doctorId})
    if(code) {
        yield put({
            type: SAVE_USER_INFO_BY_DOCTORID,
            userInfo: data,
        })
    }else{
        yield put({
            type: SAVE_USER_INFO_ERROR,
            message,
        })
    }
}

function* updateRouters() {
    const {code,data,message} = yield call(getRouters);
    if(code) {
        yield put({
            type: SAVE_ROUTERS,
            routers: data,
        })
    }else{
        
    }
}

export default function* wechatUserSages() {
    yield takeEvery(SAVE_USER_INFO_ASYNC,updateUseInfo),
    yield takeEvery(SAVE_USER_INFO_BY_DOCTORID_ASYNC,updateUserInfoByDoctorId),
    yield takeEvery(SAVE_ROUTERS_ASYNC,updateRouters)
}