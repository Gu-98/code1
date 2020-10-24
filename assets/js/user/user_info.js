$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '必须1-6之间'
            }
        }
    })

    initUserInfo()



    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    })



    $('.layui-form').on('submit', newUserInfo)
})

function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            layui.form.val('formUserInfo', res.data);
        }
    })
}


function newUserInfo(e) {
    e.preventDefault()
    console.log($(this));

    $.ajax({
        url: '/my/userinfo',
        method: 'POST',
        data: $(this).serialize(),
        success(res) {
            console.log(res);

            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message);
            window.top.getUserInfo()
        }
    })
}