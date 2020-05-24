const request = require('request-promise');
const utils = require('./utils');

exports.post = async ({url,form={},headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}}) => {
    console.log('post')
    return request.post({
        url,
        form,
        headers,
    }).then(function(res) {
        if(utils.isJson(res)) {
            res = JSON.parse(res);
            if(res.reqResult == 'success'){
                return {
                    code: 1,
                    data: res.data,
                    message: res.reqMessage,
                }
            }else{
                return {
                    code: 0,
                    data: null,
                    message: res.reqMessage,
                }
            }
        }else{
            return res;
        }
    }).catch(function (err) {
        return {
            code: 0,
            message: err.toString()
        }
    });
}