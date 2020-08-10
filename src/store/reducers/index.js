import userInfo from './user';
import orderInfo from './order';
import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../../utils/history'

export default combineReducers({
    router: connectRouter(history),
    userInfo,
    orderInfo
})