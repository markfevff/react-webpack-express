const request = require('../middleware/request');
exports.testApi = async (req,res) => {
    let delay = ms => new Promise(resolve => setTimeout(resolve,ms))
    await delay(2000)
    return res.send('testApi')
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