var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function(opstions) {
    opstions.url = baseURL + opstions.url

    if (opstions.url.indexOf('/my/') !== -1) {
        opstions.headers = {
            Authorization: localStorage.setItem('token') || ""
        }
    }
})