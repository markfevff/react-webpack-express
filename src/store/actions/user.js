import {SAVE_USER_INFO_ASYNC,SAVE_USER_INFO_BY_DOCTORID_ASYNC,SAVE_ROUTERS_ASYNC} from '../actionTypes/user';

export const getUserInfoSync = (code) => {
    return{
        type: SAVE_USER_INFO_ASYNC,
        code: code
    }
}
export const updateUserInfoByDoctorIdSync = (doctorId) => {
    return{
        type: SAVE_USER_INFO_BY_DOCTORID_ASYNC,
        doctorId: doctorId,
    }
}
export const updateRoutersSync = () => {
    return{
        type: SAVE_ROUTERS_ASYNC,
    }
}