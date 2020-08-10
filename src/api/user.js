import {get,post} from  '@/utils/axios';
import config from '@/config';
import qs from 'qs';

export const getUserInfo = (data) => post(config.server_umer.local_url + '/users/get/userInfo/by/code',qs.stringify(data))
export const getUserInfoByDoctorId = (data) => post(config.server_umer.local_url + '/users/get/userInfo/by/umerId',qs.stringify(data))

export const getRouters = () => post(config.server_umer.local_url + '/users/get/roles')//获取路由