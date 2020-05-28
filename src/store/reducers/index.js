import userInfo from './user';
import orderInfo from './order';
import {combineReducers} from 'redux';

export default combineReducers({
    userInfo,
    orderInfo
})