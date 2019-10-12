$(function () {
    // 抽屉生成
    $('#messageDrawerView').height($('#container').height()).kendoDrawer({
        mode: 'push',
        template:
            '<ul>' +
                '<li data-role="drawer-item"><i class="fas fa-feather" title="写邮件"></i>写邮件</li>' +
                '<li class="k-state-selected" id="inboxDrawerView" data-role="drawer-item"><i class="fas fa-inbox" title="收件箱"></i>收件箱</li>' +
                '<li data-role="drawer-item"><i class="fas fa-envelope" title="发件箱"></i>发件箱</li>' +
                '<li data-role="drawer-separator"></li>' +
                '<li data-role="drawer-item" id="smsDrawerView"><i class="fas fa-comments" title="短信息"></i>短信息</li>' +
                '<li data-role="drawer-separator"></li>' +
                '<li data-role="drawer-item"><i class="fas fa-address-book" title="通讯录"></i>通讯录</li>' +
            '</ul>',
        mini: {
            width: 40
        },
        width: 120,
        show: function(e) {
            $('#messageDrawerBtnView').animate({width: '120px'}, 300, 'swing').find('i').removeClass('fa-indent').addClass('fa-outdent');
            $('#messageDrawerView .k-drawer-items sup').fadeOut();
            $('#messageDrawerView .k-drawer-items .badge').fadeIn();
        },
        hide: function(e) {
            $('#messageDrawerBtnView').animate({width: '40px'}, 300, 'swing').find('i').removeClass('fa-outdent').addClass('fa-indent');
            $('#messageDrawerView .k-drawer-items .badge').fadeOut();
            $('#messageDrawerView .k-drawer-items sup').fadeIn();
        },
        itemClick: function (e) {
            $('#messageDrawerContentView > div').addClass('hide').eq(e.item.index()).removeClass('hide');
        }
    });
    $('#messageDrawerContentView .blank').html('<i class="fas fa-couch"></i>空空如也');
    // 抽屉折叠
    $('#messageDrawerBtnView i').show();
    $('#messageDrawerBtnView').click(function () {
        if ($('#messageDrawerView').data('kendoDrawer').drawerContainer.hasClass('k-drawer-expanded')) {
            $('#messageDrawerView').data('kendoDrawer').hide();
            $('#messageDrawerBtnView').animate({width: '40px'}, 300, 'swing').find('i').removeClass('fa-outdent').addClass('fa-indent');
            $('#messageDrawerView .k-drawer-items .badge').fadeOut();
            $('#messageDrawerView .k-drawer-items sup').fadeIn();
        } else {
            $('#messageDrawerView').data('kendoDrawer').show();
            $('#messageDrawerBtnView').animate({width: '120px'}, 300, 'swing').find('i').removeClass('fa-indent').addClass('fa-outdent');
            $('#messageDrawerView .k-drawer-items sup').fadeOut();
            $('#messageDrawerView .k-drawer-items .badge').fadeIn();
        }
    });
    // 新消息数量获取
    $.fn.ajaxPost({
        ajaxUrl: 'json/message.json',
        succeed: function (res) {
            if (res.inboxTotal > 0) {
                $('#inboxDrawerView').append('<span class="badge theme-s-bg">' + res.inboxTotal + '</span><sup></sup>');
            }
            if (res.smsTotal > 0) {
                $('#smsDrawerView').append('<span class="badge theme-s-bg">' + res.smsTotal + '</span><sup></sup>');
            }
        }
    });
});