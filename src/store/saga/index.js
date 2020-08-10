import { all } from 'redux-saga/effects';
import wechatUserSages from './user'

export default function* rootSaga() {
    yield all([
        wechatUserSages()
    ])
}