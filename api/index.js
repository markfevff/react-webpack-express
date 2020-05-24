const request = require('../middleware/request');
exports.testApi = async (req,res) => {
    let delay = ms => new Promise(resolve => setTimeout(resolve,ms))
    await delay(2000)
    return res.send('testApi')
}
exports.testApiUmer = async (req,res) => {
    let data = await request.post({
        url: 'https://api.umer.com.cn/healthchat/wechat/getDoctorPsnInfo.do',
        form: {
            "token": 'umer0518',
            "umerId": '10866048'
        }
    })
    console.log('testApiUmer-data:',data)
    return res.send(data)
}