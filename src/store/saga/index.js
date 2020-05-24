import { all } from 'redux-saga/effects';
import wechatUserSages from './order'

export default function* rootSaga() {
    yield all([
        wechatUserSages()
    ])
}