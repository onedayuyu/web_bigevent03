var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function(opstions) {
    opstions.url = baseURL + opstions.url

    if (opstions.url.indexOf('/my/') !== -1) {
        opstions.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    opstions.complete = function(res) {
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }

})