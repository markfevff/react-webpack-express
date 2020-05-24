// import { delay } from 'redux-saga'
import { put, takeEvery } from 'redux-saga/effects';
import {UPDATE_USER_INFO_ID,UPDATE_USER_INFO_ID_ASYNC} from '../actionTypes/user'

let delay = (ms) => new Promise(resolve => setTimeout(resolve,ms))
function* updateUserId({id}) {
    yield delay(1000)
    yield put({
        type: UPDATE_USER_INFO_ID,
        id: id,
    })
}

export default function* wechatUserSages() {
    yield takeEvery(UPDATE_USER_INFO_ID_ASYNC,updateUserId)
}