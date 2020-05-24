import {UPDATE_USER_INFO_ID} from '../actionTypes/user';

const initState = {
    id: 1,
}

export default function userInfo (state = initState,action = {}) {
    switch(action.type) {
        case UPDATE_USER_INFO_ID: {
            return {
                ...state,
                id: action.id
            }
        };
        default: return state
    }
}