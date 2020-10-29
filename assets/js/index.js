$(function() {
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            randerAvatar(res.data)
        }
    })
}

var layer = layui.form

function randerAvatar(user) {
    console.log(user);
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
    if (user.user_pic) {
        $(".layui-nav-img").show().attr("src", user.user_pic)
        $(".text-avatar").hide()
    } else {
        var first = name[0].toUpperCase()
        $(".layui-nav-img").hide()
        $(".text-avatar").html(first).show()
    }
}

//退出事件
$("#btnexit").on("click", function() {
    layer.confirm('您确定需要退出吗', { icon: 3, title: '提示' }, function(index) {
        localStorage.removeItem("token")
        location.href = "/login.html"

        layer.close(index);
    });
})