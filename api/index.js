const request = require('../middleware/request');
/* 
    测试接口testApi 参数已application/x-www-form-urlencoded格式传递
*/
exports.testApi = async (req,res) => {
    let {id} = req.body;//获取接口参数
    console.log('id:',id)
    let delay = ms => new Promise(resolve => setTimeout(resolve,ms))
    await delay(2000)
    return res.send('testApi')
}
exports.testApiJson = async (req,res) => {
    let {id} = req.body;//获取接口参数
    console.log('id:',id)
    let delay = ms => new Promise(resolve => setTimeout(resolve,ms))
    await delay(2000)
    return res.send('testApijson');
}
exports.testApiUmer = async (req,res) => {
    let data = await request.post({
        url: 'https://xxx',
        form: {
            
        }
    })
    console.log('testApiUmer-data:',data)
    return res.send(data)
}
exports.validateToken = function(req,res,next){
    console.log('validateToken')
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    console.log('validateToken-req.query:',req.query)
    return res.send(echostr)
}
exports.web = function(req,res) {
    return res.send('web')
}