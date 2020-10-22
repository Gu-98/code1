$(function () {
    $('#goReg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })

    $('#goLogin').on('click', function () {
        $('.regBox').hide()
        $('.loginBox').show()
    })

    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.regBox [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    $('#formReg').on('submit', function (e) {
        e.preventDefault();
        var username = $('.regBox [name=username]').val();
        var password = $('.regBox [name=password]').val();
        $.ajax({
            url: '/api/reguser',
            method: 'post',
            data: {
                username: username,
                password: password
            },
            success(res) {
                // console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('注册成功，请登录！');
                $('#goLogin').click();
            }
        })
    })


    $('#formLogin').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success(res) {
                // console.log(res);
                
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('登录成功');
                localStorage.setItem('token',res.token)
                location.href = '/index.html';
            }
        })
    })
})