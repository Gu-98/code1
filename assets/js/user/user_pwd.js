$(function () {
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码与原密码不能一致！'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    })



    $('.layui-form').on('submit',resetPwd)
})


function resetPwd(e) {
    e.preventDefault();
    $.ajax({
        url: '/my/updatepwd',
        method: 'POST',
        data:$(this).serialize(),
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message);
            $('.layui-form')[0].reset()
        }
    })
}