$(function() {
    $('#reg-btn').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#login-btn').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name = password]').val()
                // console.log(pwd);
            if (value !== pwd) {
                return '两次输入密码不一致'
            }
        }
    })

    //注册
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('已注册成功 ! 请登录')
                    $("#login-btn").click()
                    $("#form-reg")[0].reset()
                }
            }
        })
    })

    //登录
    $("#form-login").on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                localStorage.setItem("token", res.token)
                location.href = "/index.html"

            }
        })
    })
})