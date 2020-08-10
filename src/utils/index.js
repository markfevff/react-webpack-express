/* 获取平台 */
export function getPlatform () {
    let ua = navigator.userAgent.toLowerCase();
    console.log('getPlatform-ua:',ua);
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return "wechat";
    } else {
        return "other";
    }
}

/*删除地址栏中，指定的参数名*/
export function delParam(paramKey) {
    var url = window.location.href;    //页面url
    var urlParam = window.location.search.substr(1);  //页面参数
    var beforeUrl = url.substr(0, url.indexOf("?"));  //页面主地址（参数之前地址）
    var nextUrl = "";
    var arr = new Array();
    if (urlParam != "") {
        var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
        for (var i = 0; i < urlParamArr.length; i++) {
            var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
            //如果键雨要删除的不一致，则加入到参数中
            if (paramArr[0] != paramKey) {
                arr.push(urlParamArr[i]);
            }
        }
    }
    if (arr.length > 0) {
        nextUrl = "?" + arr.join("&");
    }
    url = beforeUrl + nextUrl;
    return url;
}