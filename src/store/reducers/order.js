import {UPDATE_ORDER_INFO_ID} from '../actionTypes/order';

const initState = {
    id: 1,
}

export default function orderInfo (state = initState,action = {}) {
    switch(action.type) {
        case UPDATE_ORDER_INFO_ID: {
            return {
                ...state,
                id: action.id
            }
        };
        default: return state
    }
}