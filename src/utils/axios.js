import axios from 'axios';
import { Toast} from 'antd-mobile'; 

const get = async (url, params = {}, config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}) => {
    return axios({
        method: 'GET',
        url: url,
        params: params,
        ...config
    }).then(function(res) {
        return res.data;
    }).catch(function(err) {
        return {
            code: 0,
            data: null,
            message: err,
        }
    });
}

const post = async (url, data = {}, config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}) => {
    // console.log('url:',url,',data:',data,',config:',config)
    return axios.post(url,data,{
        ...config
    }).then(function(res) {
        console.log('res:',res)
        let {data} = res;
        if(!data.code) {
            Toast.info(data.message)
        }
        return data;
    }).catch(function(err) {
        console.log('err:',err)
        if(err.response.status == 404) {
            Toast.info('404')
            return {
                code: 0,
                data: null,
                message: '404',
            }
        }
        Toast.info(err)
        return {
            code: 0,
            data: null,
            message: err,
        }
    });
}

export {
    get,
    post
}

