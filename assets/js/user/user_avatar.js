$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btnFile').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        var fileList = e.target.files;
        if (fileList.length === 0) {
            return '请选择照片'
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })



    $('#btnSure').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            height: 100
        }).toDataURL('image/png');       
        getNewAvatar(dataURL)
    })


})


function getNewAvatar(url) {
    $.ajax({
        url: '/my/update/avatar',
        method:'POST',
        data: {
            avatar:url
        },
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message);
            window.parent.getUserInfo()
        }
    })
}