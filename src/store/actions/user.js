import {UPDATE_USER_INFO_ID_ASYNC} from '../actionTypes/user';

export const updateUserInfoId = (id) => {
    return{
        type: UPDATE_USER_INFO_ID_ASYNC,
        id: id
    }
}