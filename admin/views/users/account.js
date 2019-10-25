$(function () {
    // 获取数据源
    $.fn.ajaxPost({
        ajaxUrl: 'json/account.json',
        succeed: function (res) {
            // 渲染数据
            $('#account').html(kendo.template($('#accountTemplate').html())(res.data[0]));
        },
        failed: function () {
            alertMsg('获取用户信息出错！', 'error');
        }
    });
});