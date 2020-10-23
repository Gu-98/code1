$(function () {
    getUserInfo();


    $('#loginOut').on('click', function () {
        layui.layer.confirm('你确认退出吗?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href='/login.html'
            layui.layer.close(index);
          });
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    })
}



function renderAvatar(value) {
    var name = value.nickname || value.username;
    $('#welcome').html('欢迎,' + name + '!')
    if (value.user_pic !== null) {
        $('.layui-nav-img').attr('src', value.user_pic).show();
        $('.text-avatar').hide()
    } else {
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide();
        
    }
}