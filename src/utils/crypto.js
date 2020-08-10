const crypto = require('crypto');
/* 
    该文件是封装了一系列的加密/解密方法
*/

/* 
    文章对应的一系列加密/解密方法
*/
// php 和 nodejs 通用加密 key
export function pjcryptkey () {
    return crypto.createHash('sha256').update('__tazai_wolf__key').digest();
}
// php 和 nodejs 通用加密 iv
export function pjiv () {
    return "1234567890000000";
}
// php 和 nodejs 通用解密
export function decodepj(cryptkey, iv, secretdata) {
    let decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
        decoded = decipher.update(secretdata, 'base64', 'utf8');

    decoded += decipher.final('utf8');
    
    return decoded;
}
// 验证加密字符串
export function compareCodeStr(str, encodeStr) {
    if (typeof(str) == "undefined" || !str) {
        return false;
    }

    if (str != decodepj(pjcryptkey(), pjiv(), decodeURIComponent(decodeURI(encodeStr)))) {
        return false;
    }

    return true;
}