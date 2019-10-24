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
                '<li id="smsDrawerView" data-role="drawer-item"><i class="fas fa-comments" title="短信息"></i>短信息</li>' +
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
    // 通讯录数据源
    var addressBookDataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                $.fn.ajaxPost({
                    ajaxData: {
                        type: 'addressBook'
                    },
                    ajaxUrl: 'json/message.json',
                    succeed: function (res) {
                        options.success(res);
                    },
                    failed: function (res) {
                        options.error(res);
                    }
                });
            }
        },
        schema: {
            total: function(res) {
                return res.addressBook.length;
            },
            data: 'addressBook',
            model: {
                id: 'id',
                fields: {
                    avatar: { type: 'string' },
                    realName: { type: 'string' },
                    nickName: { type: 'string' },
                    gender: { type: 'string' },
                    email: { type: 'string' },
                    group: { type: 'string' }
                }
            }
        },
        group: {
            field: 'group',
            dir: 'asc'
        }
    });
    // 收件人
    $('#msgReceiverView').kendoMultiSelect({
        dataSource: addressBookDataSource,
        placeholder: '收件人（必填）',
        dataValueField: 'email',
        dataTextField: 'nickName',
        height: 400,
        autoClose: false,
        filter: 'contains',
        delay: 300,
        itemTemplate: '<img src="#: avatar #" alt="#: nickName #">#: realName #<small>&lt;#: email #&gt;</small>',
        tagTemplate: '<img src="#: avatar #" alt="#: nickName #">#: realName #'
    });
    // 抄送
    $('#msgCCView').kendoMultiSelect({
        dataSource: addressBookDataSource,
        placeholder: '抄送',
        dataValueField: 'email',
        dataTextField: 'nickName',
        height: 400,
        autoClose: false,
        filter: 'contains',
        delay: 300,
        itemTemplate: '<img src="#: avatar #" alt="#: nickName #">#: realName #<small>&lt;#: email #&gt;</small>',
        tagTemplate: '<img src="#: avatar #" alt="#: nickName #">#: realName #'
    });
    // 收件箱工具栏
    $('#inboxToolbar').width($('#messageDrawerContentView').width()).kendoToolBar({
        items: [
            {
                template: '<input class="k-checkbox" id="inboxSelectAll" type="checkbox"><label class="k-checkbox-label" for="inboxSelectAll" title="全选"></label>'
            },
            {
                type: 'button',
                text: '全部已读',
                icon: 'eye',
                click: function () {
                    readAll('inbox');
                }
            },
            {
                type: 'button',
                text: '删除',
                icon: 'x',
                click: function () {
                    batchDel('inbox');
                }
            },
            {
                type: 'button',
                text: '清空',
                icon: 'trash',
                click: function () {
                    emptyAll('inbox', '收件箱');
                }
            },
            {
                type: 'spacer'
            },
            {
                type: 'button',
                text: '升序',
                icon: 'sort-asc',
                attributes: { 'class': 'orderBtn' },
                hidden: true,
                overflow: 'never',
                click: function () {
                    order('inbox', 'desc');
                }
            },
            {
                type: 'button',
                text: '降序',
                icon: 'sort-desc',
                attributes: { 'class': 'orderBtn' },
                overflow: 'never',
                click: function () {
                    order('inbox', 'asc');
                }
            },
            {
                template: '<span class="k-textbox k-space-left"><input id="inboxSearchView" type="text" placeholder="搜索..."><i class="k-icon k-i-search ml-1"></i></span>'
            },
            {
                type: 'splitButton',
                text: '全部',
                icon: 'filter',
                menuButtons: [
                    {
                        text: '未读',
                        click: function () {
                            $('#inboxView').data('kendoListView').dataSource.filter({
                                field: 'unread',
                                operator: 'eq',
                                value: true
                            });
                        }
                    },
                    {
                        text: '已读',
                        click: function () {
                            $('#inboxView').data('kendoListView').dataSource.filter({
                                field: 'unread',
                                operator: 'eq',
                                value: false
                            });
                        }
                    }
                ],
                overflow: 'never',
                click: function () {
                    $('#inboxView').data('kendoListView').dataSource.filter({
                        field: 'unread',
                        operator: 'isnotnull'
                    });
                }
            }
        ]
    });
    // 收件箱搜索
    $('#inboxSearchView').keyup(function () {
        $('#inboxView').data('kendoListView').dataSource.filter({
            logic: 'or',
            filters: [
                { field: 'nickName', operator: 'contains', value: $(this).val() },
                { field: 'email', operator: 'contains', value: $(this).val() },
                { field: 'subject', operator: 'contains', value: $(this).val() },
                { field: 'content', operator: 'contains', value: $(this).val() },
                { field: 'time', operator: 'contains', value: $(this).val() }
            ]
        });
    });
    // 收件箱列表
    $('#inboxView').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'inbox'
                        },
                        ajaxUrl: 'json/message.json',
                        succeed: function (res) {
                            options.success(res);
                            if (res.inbox.length === 0) {
                                $('#inboxView').html('<div class="blank">您的收件箱是空的~</div>');
                            }
                        },
                        failed: function (res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                total: function(res) {
                    return res.inbox.length;
                },
                data: 'inbox',
                model: {
                    id: 'id',
                    fields: {
                        avatar: { type: 'string' },
                        nickName: { type: 'string' },
                        email: { type: 'string' },
                        to: { type: 'object',
                            defaultValue: []
                        },
                        cc: { type: 'object',
                            defaultValue: []
                        },
                        subject: { type: 'string' },
                        content: { type: 'string' },
                        time: { type: 'string' },
                        unread: { type: 'boolean' }
                    }
                }
            },
            pageSize: 10
        },
        height: $('#inboxView').height(),
        scrollable: 'endless',
        selectable: 'multiple',
        template:
            '<div class="mail-list# if (unread) { # unread# } #">' +
                '<h5>' +
                    '<input class="k-checkbox ids" id="#= id #Ids" type="checkbox" value="#= id #"><label class="k-checkbox-label" for="#= id #Ids"></label>' +
                    '<img src="#= avatar #" alt="#= email #" title="&lt;#= email #&gt;">' +
                    '#= nickName #' +
                '</h5>' +
                '<p>#= subject #</p>' +
                '<time>#= time #</time>' +
            '</div>',
        change: function (e) {
            $('#inboxView .ids').prop('checked', false);
            this.select().find('.ids').prop('checked', true);
            selectHalf('inbox');
            // 收件箱明细
            if (this.select().length > 0) {
                var dataItem = e.sender.dataItem(e.sender.select()),
                    toList = [dataItem.email],
                    ccList = [],
                    content =
                        '<div class="mail-content">' +
                            '<h6><strong>' + dataItem.subject + '</strong></h6>' +
                            '<dl class="row no-gutters">' +
                                '<dt class="col-2">发件人：</dt>' +
                                '<dd class="col-10"><img src="' + dataItem.avatar + '" alt="' + dataItem.nickName + '">' + dataItem.nickName + '<small>&lt;' + dataItem.email + '&gt;</small></dd>' +
                                '<dt class="col-2">收件人：</dt>' +
                                '<dd class="col-10">';
                for (var i = 0; i < dataItem.to.length; i++) {
                    content +=      '<img src="' + dataItem.to[i].avatar + '" alt="' + dataItem.to[i].nickName + '">' + dataItem.to[i].nickName + '<small>&lt;' + dataItem.to[i].email + '&gt;;</small><br>';
                    toList.push(dataItem.to[i].email);
                }
                    content +=  '</dd>';
                if (dataItem.cc.length > 0) {
                    content +=  '<dt class="col-2">抄送：</dt>' +
                                '<dd class="col-10">';
                    for (var k = 0; k < dataItem.cc.length; k++) {
                        content +=  '<img src="' + dataItem.cc[k].avatar + '" alt="' + dataItem.cc[k].nickName + '">' + dataItem.cc[k].nickName + '<small>&lt;' + dataItem.cc[k].email + '&gt;;</small><br>';
                        ccList.push(dataItem.cc[k].email);
                    }
                    content +=  '</dd>';
                }
                content +=  '<dt class="col-2">时间：</dt>' +
                            '<dd class="col-10">' + kendo.toString(kendo.parseDate(dataItem.time), 'yyyy-MM-dd（ddd）HH:mm') + '</dd>' +
                        '</dl>' +
                        '<div class="content">' + dataItem.content + '</div>' +
                        '<div class="btns">' +
                            '<button class="k-button k-button-icontext k-state-selected" type="button" onclick="postMailView(\'reply\', \'' + dataItem.email + '\', \'\', \'' + dataItem.subject + '\', \'' + dataItem.content + '\');"><i class="fas fa-reply"></i>回复</button>' +
                            '<button class="k-button k-button-icontext theme-m-box" type="button" onclick="postMailView(\'replyAll\', \'' + toList + '\', \'' + ccList + '\', \'' + dataItem.subject + '\', \'' + dataItem.content + '\');"><i class="fas fa-reply-all"></i>回复全部</button>' +
                            '<button class="k-button k-button-icontext theme-s-bg" type="button" onclick="postMailView(\'forward\', \'\', \'\', \'' + dataItem.subject + '\', \'' + dataItem.content + '\');"><i class="fas fa-share"></i>转发</button>' +
                        '</div>' +
                    '</div>';
                if (window.outerWidth < 768) {
                    divWindow('<img src="' + dataItem.avatar + '" alt="' + dataItem.nickName + '"><strong>' + dataItem.nickName + '</strong><small>&lt;' + dataItem.email + '&gt;</small>', '90%', '45%', content);
                } else {
                    $('#inboxView').next().html(content);
                }
            }
        },
        dataBound: function () {
            selectHalf('inbox');
        }
    });
    // 收件箱已读
    $('#inboxView').on('click', '.mail-list', function () {
        var that = $(this);
        if (that.hasClass('unread')) {
            $.fn.ajaxPost({
                ajaxData: {
                    id: that.find('.ids').val(),
                    type: 'inbox'
                },
                ajaxUrl: 'json/response.json',
                succeed: function () {
                    $('#inboxView').data('kendoListView').dataItem(that).set('unread', false);
                    setTimeout(function () {
                        $('#inboxView').data('kendoListView').select($('#' + that.find('.ids').attr('id')).parent().parent());
                    }, 10);
                    that.removeClass('unread');
                    var badgeDom = $('#inboxDrawerView').find('.badge');
                    if (badgeDom.text() === '1') {
                        badgeDom.remove();
                        $('#inboxDrawerView').find('sup').remove();
                    } else {
                        badgeDom.text(Number(badgeDom.text()) - 1);
                    }
                    getMessage();
                },
                failed: function () {
                    alertMsg('标记已读出错！', 'error');
                }
            });
        }
    });
    // 收件箱全选
    $('#inboxSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#inboxView').data('kendoListView').select($('#inboxView .mail-list'));
        } else {
            $('#inboxView').data('kendoListView').clearSelection();
        }
    });
    // 收件箱单选
    $('#inboxView').on('click', '.ids', function () {
        selectHalf('inbox');
        if ($(this).prop('checked')) {
            $('#inboxView').data('kendoListView').select($(this).parents('.mail-list'));
        } else {
            $(this).parents('.mail-list').removeClass('k-state-selected').removeAttr('aria-selected');
        }
    });
    // 发件箱工具栏
    $('#messageDrawerContentView > div:eq(2)').removeClass('hide');
    $('#outboxToolbar').width($('#messageDrawerContentView').width()).kendoToolBar({
        items: [
            {
                template: '<input class="k-checkbox" id="outboxSelectAll" type="checkbox"><label class="k-checkbox-label" for="outboxSelectAll" title="全选"></label>'
            },
            {
                type: 'button',
                text: '删除',
                icon: 'x',
                click: function () {
                    batchDel('outbox');
                }
            },
            {
                type: 'button',
                text: '清空',
                icon: 'trash',
                click: function () {
                    emptyAll('outbox', '发件箱');
                }
            },
            {
                type: 'spacer'
            },
            {
                type: 'button',
                text: '升序',
                icon: 'sort-asc',
                attributes: { 'class': 'orderBtn' },
                hidden: true,
                overflow: 'never',
                click: function () {
                    order('outbox', 'desc');
                }
            },
            {
                type: 'button',
                text: '降序',
                icon: 'sort-desc',
                attributes: { 'class': 'orderBtn' },
                overflow: 'never',
                click: function () {
                    order('outbox', 'asc');
                }
            },
            {
                template: '<span class="k-textbox k-space-left"><input id="outboxSearchView" type="text" placeholder="搜索..."><i class="k-icon k-i-search ml-1"></i></span>'
            }
        ]
    });
    $('#messageDrawerContentView > div:eq(2)').addClass('hide');
    // 发件箱搜索
    $('#outboxSearchView').keyup(function () {
        $('#outboxView').data('kendoListView').dataSource.filter({
            logic: 'or',
            filters: [
                { field: 'nickName', operator: 'contains', value: $(this).val() },
                { field: 'email', operator: 'contains', value: $(this).val() },
                { field: 'subject', operator: 'contains', value: $(this).val() },
                { field: 'content', operator: 'contains', value: $(this).val() },
                { field: 'time', operator: 'contains', value: $(this).val() }
            ]
        });
    });
    // 发件箱列表
    $('#outboxView').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'outbox'
                        },
                        ajaxUrl: 'json/message.json',
                        succeed: function (res) {
                            options.success(res);
                            if (res.outbox.length === 0) {
                                $('#outboxView').html('<div class="blank">您的发件箱是空的~</div>');
                            }
                        },
                        failed: function (res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                total: function(res) {
                    return res.outbox.length;
                },
                data: 'outbox',
                model: {
                    id: 'id',
                    fields: {
                        avatar: { type: 'string' },
                        nickName: { type: 'string' },
                        email: { type: 'string' },
                        to: { type: 'object',
                            defaultValue: []
                        },
                        cc: { type: 'object',
                            defaultValue: []
                        },
                        subject: { type: 'string' },
                        content: { type: 'string' },
                        time: { type: 'string' }
                    }
                }
            },
            pageSize: 10
        },
        height: $('#outboxView').height(),
        scrollable: 'endless',
        selectable: 'multiple',
        template:
            '<div class="mail-list unread">' +
                '<h5>' +
                    '<input class="k-checkbox ids" id="#= id #Ids" type="checkbox" value="#= id #"><label class="k-checkbox-label" for="#= id #Ids"></label>' +
                    '# for (var i = 0; i < to.length; i++) { #' +
                        '<img src="#= to[i].avatar #" alt="#= to[i].email #" title="#= to[i].nickName # &lt;#= to[i].email #&gt;">' +
                    '# } #' +
                '</h5>' +
                '<p>#= subject #</p>' +
                '<time>#= time #</time>' +
            '</div>',
        change: function (e) {
            $('#outboxView .ids').prop('checked', false);
            this.select().find('.ids').prop('checked', true);
            selectHalf('outbox');
            // 发件箱明细
            if (this.select().length > 0) {
                var dataItem = e.sender.dataItem(e.sender.select()),
                    toList = [],
                    ccList = [],
                    content =
                        '<div class="mail-content">' +
                            '<h6><strong>' + dataItem.subject + '</strong></h6>' +
                            '<dl class="row no-gutters">' +
                                '<dt class="col-2">发件人：</dt>' +
                                '<dd class="col-10"><img src="' + dataItem.avatar + '" alt="' + dataItem.nickName + '">' + dataItem.nickName + '<small>&lt;' + dataItem.email + '&gt;</small></dd>' +
                                '<dt class="col-2">收件人：</dt>' +
                                '<dd class="col-10">';
                for (var i = 0; i < dataItem.to.length; i++) {
                    content +=      '<img src="' + dataItem.to[i].avatar + '" alt="' + dataItem.to[i].nickName + '">' + dataItem.to[i].nickName + '<small>&lt;' + dataItem.to[i].email + '&gt;;</small><br>';
                    toList.push(dataItem.to[i].email);
                }
                    content +=  '</dd>';
                if (dataItem.cc.length > 0) {
                    content +=  '<dt class="col-2">抄送：</dt>' +
                                '<dd class="col-10">';
                    for (var k = 0; k < dataItem.cc.length; k++) {
                        content +=  '<img src="' + dataItem.cc[k].avatar + '" alt="' + dataItem.cc[k].nickName + '">' + dataItem.cc[k].nickName + '<small>&lt;' + dataItem.cc[k].email + '&gt;;</small><br>';
                        ccList.push(dataItem.cc[k].email);
                    }
                    content +=  '</dd>';
                }
                    content +=  '<dt class="col-2">时间：</dt>' +
                                '<dd class="col-10">' + kendo.toString(kendo.parseDate(dataItem.time), 'yyyy-MM-dd（ddd）HH:mm') + '</dd>' +
                            '</dl>' +
                            '<div class="content">' + dataItem.content + '</div>' +
                            '<div class="btns">' +
                                '<button class="k-button k-button-icontext k-state-selected" type="button" onclick="postMailView(\'reedit\', \'' + toList + '\', \'' + ccList + '\', \'' + dataItem.subject + '\', \'' + dataItem.content + '\');"><i class="fas fa-edit"></i>再次编辑</button>' +
                            '</div>' +
                        '</div>';
                if (window.outerWidth < 768) {
                    divWindow('<img src="' + dataItem.avatar + '" alt="' + dataItem.nickName + '"><strong>' + dataItem.nickName + '</strong><small>&lt;' + dataItem.email + '&gt;</small>', '90%', '45%', content);
                } else {
                    $('#outboxView').next().html(content);
                }
            }
        },
        dataBound: function () {
            selectHalf('outbox');
        }
    });
    // 发件箱全选
    $('#outboxSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#outboxView').data('kendoListView').select($('#outboxView .mail-list'));
        } else {
            $('#outboxView').data('kendoListView').clearSelection();
        }
    });
    // 发件箱单选
    $('#outboxView').on('click', '.ids', function () {
        selectHalf('outbox');
        if ($(this).prop('checked')) {
            $('#outboxView').data('kendoListView').select($(this).parents('.mail-list'));
        } else {
            $(this).parents('.mail-list').removeClass('k-state-selected').removeAttr('aria-selected');
        }
    });
    // 短信息工具栏
    $('#messageDrawerContentView > div:eq(4)').removeClass('hide');
    $('#smsToolbar').width($('#messageDrawerContentView').width()).kendoToolBar({
        items: [
            {
                template: '<input class="k-checkbox" id="smsSelectAll" type="checkbox"><label class="k-checkbox-label" for="smsSelectAll" title="全选"></label>'
            },
            {
                type: 'button',
                text: '全部已读',
                icon: 'eye',
                click: function () {
                    readAll('sms');
                }
            },
            {
                type: 'button',
                text: '删除',
                icon: 'x',
                click: function () {
                    batchDel('sms');
                }
            },
            {
                type: 'button',
                text: '清空',
                icon: 'trash',
                click: function () {
                    emptyAll('sms', '短信息');
                }
            },
            {
                type: 'spacer'
            },
            {
                type: 'button',
                text: '升序',
                icon: 'sort-asc',
                attributes: { 'class': 'orderBtn' },
                hidden: true,
                overflow: 'never',
                click: function () {
                    order('sms', 'desc');
                }
            },
            {
                type: 'button',
                text: '降序',
                icon: 'sort-desc',
                attributes: { 'class': 'orderBtn' },
                overflow: 'never',
                click: function () {
                    order('sms', 'asc');
                }
            },
            {
                template: '<span class="k-textbox k-space-left"><input id="smsSearchView" type="text" placeholder="搜索..."><i class="k-icon k-i-search ml-1"></i></span>'
            },
            {
                type: 'splitButton',
                text: '全部',
                icon: 'filter',
                menuButtons: [
                    {
                        text: '未读',
                        click: function () {
                            $('#smsView').data('kendoListView').dataSource.filter({
                                field: 'unread',
                                operator: 'gt',
                                value: 0
                            });
                        }
                    },
                    {
                        text: '已读',
                        click: function () {
                            $('#smsView').data('kendoListView').dataSource.filter({
                                field: 'unread',
                                operator: 'eq',
                                value: 0
                            });
                        }
                    }
                ],
                overflow: 'never',
                click: function () {
                    $('#smsView').data('kendoListView').dataSource.filter({
                        field: 'unread',
                        operator: 'isnotnull'
                    });
                }
            }
        ]
    });
    $('#messageDrawerContentView > div:eq(4)').addClass('hide');
    // 短信息搜索
    $('#smsSearchView').keyup(function () {
        $('#smsView').data('kendoListView').dataSource.filter({
            logic: 'or',
            filters: [
                { field: 'realName', operator: 'contains', value: $(this).val() },
                { field: 'nickName', operator: 'contains', value: $(this).val() }
            ]
        });
    });
    // 短信息列表
    $('#smsView').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'sms'
                        },
                        ajaxUrl: 'json/message.json',
                        succeed: function (res) {
                            options.success(res);
                            if (res.sms.length === 0) {
                                $('#smsView').html('<div class="blank">您还没有短信息~</div>');
                            }
                        },
                        failed: function (res) {
                            options.error(res);
                        }
                    });
                }
            },
            schema: {
                total: function(res) {
                    return res.sms.length;
                },
                data: 'sms',
                model: {
                    id: 'id',
                    fields: {
                        avatar: { type: 'string' },
                        userId: { type: 'string' },
                        realName: { type: 'string' },
                        nickName: { type: 'string' },
                        chat: { type: 'object',
                            defaultValue: []
                        },
                        unread: { type: 'number' }
                    }
                }
            }
        },
        height: $('#smsView').height(),
        scrollable: 'endless',
        selectable: 'multiple',
        template:
            '<div class="sms-list" data-id="#= userId #">' +
                '<input class="k-checkbox ids" id="#= id #Ids" type="checkbox" value="#= id #"><label class="k-checkbox-label" for="#= id #Ids"></label>' +
                '<figure>' +
                    '# if (unread > 0 && unread < 100) { #' +
                        '<sup class="theme-m-bg">#= unread #</sup>' +
                    '# } else if (unread >= 100) { #' +
                        '<sup class="theme-m-bg font-weight-bold">&middot;&middot;&middot;</sup>' +
                    '# } #' +
                    '<img src="#= avatar #" alt="#= nickName #">' +
                '</figure>' +
                '<div>' +
                    '<h5>' +
                        '<strong>#= realName #</strong>' +
                        '# if (chat.length > 0) { #' +
                            '<time>' +
                                '# if (kendo.toString(kendo.parseDate(chat[chat.length - 1].time), "yyyy-MM-dd") === kendo.toString(kendo.parseDate(new Date()), "yyyy-MM-dd")) { #' +
                                    '#= kendo.toString(kendo.parseDate(chat[chat.length - 1].time), "HH:mm") #' +
                                '# } else { #' +
                                    '#= kendo.toString(kendo.parseDate(chat[chat.length - 1].time), "MM-dd") #' +
                                '# } #' +
                            '</time>' +
                        '# } #' +
                    '</h5>' +
                    '<p># if (chat.length > 0) { ##= chat[chat.length - 1].text ## } #</p>' +
                '</div>' +
            '</div>',
        change: function (e) {
            $('#smsView .ids').prop('checked', false);
            this.select().find('.ids').prop('checked', true);
            selectHalf('sms');
            // 短信息明细
            if (this.select().length > 0) {
                var dataItem = e.sender.dataItem(e.sender.select());
                if ($('#smsChatView').data('kendoChat')) {
                    $('#smsChatView .k-message-list-content').html('');
                } else {
                    if (window.outerWidth < 768) {
                        divWindow('<img src="' + dataItem.avatar + '" alt="' + dataItem.realName + '"><strong>' + dataItem.realName + '</strong><small>' + dataItem.nickName + '</small>', '90%', '45%', '<div id="smsChatView"></div>');
                        $('.window-box:visible').css('padding', '0');
                        $('#smsChatView').css('border', '0').height('100%');
                    } else {
                        $('#smsView').next().html('<div id="smsChatView"></div>');
                        $('#smsChatView').height($('#smsView').height());
                    }
                    $('#smsChatView').kendoChat({
                        user: {
                            name: sessionStorage.getItem('userName'),
                            iconUrl: sessionStorage.getItem('avatar')
                        },
                        post: function (e) {
                            $.fn.ajaxPost({
                                ajaxData: {
                                    id: dataItem.id,
                                    text: e.text
                                },
                                ajaxUrl: 'json/response.json',
                                failed: function () {
                                    alertMsg('短信息发送失败！', 'error');
                                }
                            });
                        }
                    });
                }
                $.each(dataItem.chat, function (i, items) {
                    var id,
                        name,
                        iconUrl,
                        userInfo;
                    if (items.belongTo === 'own') {
                        userInfo = $('#smsChatView').data('kendoChat').getUser();
                        id = userInfo.id;
                        name = userInfo.name;
                        iconUrl = userInfo.iconUrl;
                    } else if (items.belongTo === 'other') {
                        id = dataItem.userId;
                        name = dataItem.realName;
                        iconUrl = dataItem.avatar;
                    }
                    $('#smsChatView').data('kendoChat').renderMessage(
                        {
                            type: 'text',
                            text: items.text
                        },
                        {
                            id: id,
                            name: name,
                            iconUrl: iconUrl
                        }
                    );
                    $('#smsChatView .k-message-list-content > div:last p').hide();
                    $('#smsChatView .k-message-list-content > div:last time:last').text(kendo.toString(kendo.parseDate(items.time), "MM-dd HH:mm"));
                });
            }
        },
        dataBound: function () {
            selectHalf('sms');
        }
    });
    // 短信息已读
    $('#smsView').on('click', '.sms-list', function () {
        var that = $(this),
            unreadNum = Number($(this).find('sup').text());
        if (that.find('sup').length > 0) {
            $.fn.ajaxPost({
                ajaxData: {
                    id: that.find('.ids').val(),
                    type: 'sms'
                },
                ajaxUrl: 'json/response.json',
                succeed: function () {
                    $('#smsView').data('kendoListView').dataItem(that).set('unread', 0);
                    setTimeout(function () {
                        $('#smsView').data('kendoListView').select($('#' + that.find('.ids').attr('id')).parent());
                    }, 10);
                    that.find('sup').remove();
                    var badgeDom = $('#smsDrawerView').find('.badge');
                    if ($('#smsView sup').length === 0) {
                        badgeDom.remove();
                        $('#smsDrawerView').find('sup').remove();
                    } else {
                        badgeDom.text(Number(badgeDom.text()) - unreadNum);
                    }
                    getMessage();
                },
                failed: function () {
                    alertMsg('标记已读出错！', 'error');
                }
            });
        }
    });
    // 短信息全选
    $('#smsSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#smsView').data('kendoListView').select($('#smsView .sms-list'));
        } else {
            $('#smsView').data('kendoListView').clearSelection();
        }
    });
    // 短信息单选
    $('#smsView').on('click', '.ids', function () {
        selectHalf('sms');
        if ($(this).prop('checked')) {
            $('#smsView').data('kendoListView').select($(this).parents('.sms-list'));
        } else {
            $(this).parents('.sms-list').removeClass('k-state-selected').removeAttr('aria-selected');
        }
    });
    // 通讯录工具栏
    $('#messageDrawerContentView > div:eq(6)').removeClass('hide');
    $('#addressBookToolbar').width($('#messageDrawerContentView').width()).kendoToolBar({
        items: [
            {
                template: '<input class="k-checkbox" id="addressBookSelectAll" type="checkbox"><label class="k-checkbox-label" for="addressBookSelectAll" title="全选"></label>'
            },
            {
                type: 'button',
                text: '发站内信',
                icon: 'email',
                click: function () {
                    var ids = [];
                    $.each($('#addressBookView .ids'), function () {
                        if ($(this).prop('checked')) {
                            ids.push($(this).val());
                        }
                    });
                    if (ids.length > 0) {
                        postMailView('newPost', '' + ids + '', '', '', '');
                    } else {
                        alertMsg('请先选择对象！', 'warning');
                    }
                }
            },
            {
                type: 'spacer'
            },
            {
                type: 'button',
                text: '升序',
                icon: 'sort-asc',
                attributes: { 'class': 'orderBtn' },
                hidden: true,
                overflow: 'never',
                click: function () {
                    orderGroup('addressBook', 'desc');
                }
            },
            {
                type: 'button',
                text: '降序',
                icon: 'sort-desc',
                attributes: { 'class': 'orderBtn' },
                overflow: 'never',
                click: function () {
                    orderGroup('addressBook', 'asc');
                }
            },
            {
                template: '<span class="k-textbox k-space-left"><input id="addressBookSearchView" type="text" placeholder="搜索..."><i class="k-icon k-i-search ml-1"></i></span>'
            },
            {
                type: 'splitButton',
                text: '全部',
                icon: 'filter',
                menuButtons: [
                    {
                        text: '男',
                        click: function () {
                            $('#addressBookView').data('kendoListView').dataSource.filter({
                                field: 'gender',
                                operator: 'eq',
                                value: '1'
                            });
                        }
                    },
                    {
                        text: '女',
                        click: function () {
                            $('#addressBookView').data('kendoListView').dataSource.filter({
                                field: 'gender',
                                operator: 'eq',
                                value: '2'
                            });
                        }
                    }
                ],
                overflow: 'never',
                click: function () {
                    $('#addressBookView').data('kendoListView').dataSource.filter({
                        field: 'gender',
                        operator: 'isnotnull'
                    });
                }
            }
        ]
    });
    $('#messageDrawerContentView > div:eq(6)').addClass('hide');
    // 通讯录搜索
    $('#addressBookSearchView').keyup(function () {
        $('#addressBookView').data('kendoListView').dataSource.filter({
            logic: 'or',
            filters: [
                { field: 'realName', operator: 'contains', value: $(this).val() },
                { field: 'nickName', operator: 'contains', value: $(this).val() },
                { field: 'email', operator: 'contains', value: $(this).val() },
                { field: 'group', operator: 'contains', value: $(this).val() }
            ]
        });
    });
    // 通讯录列表
    $('#addressBookView').kendoListView({
        dataSource: addressBookDataSource,
        height: $('#addressBookView').height(),
        scrollable: 'endless',
        selectable: 'multiple',
        template: function (e) {
            var group = '<div class="address-book-list">' +
                            '<h4>' + e.value + '</h4>';
            for (var i = 0; i < e.items.length; i++) {
                group +=    '<h5 data-id="' + e.items[i].id + '" onclick="addressBookInfoView(this, \'' + e.items[i].gender + '\', \'' + e.items[i].email + '\');">' +
                                '<input class="k-checkbox ids" id="' + e.items[i].id + 'Ids" type="checkbox" value="' + e.items[i].email + '"><label class="k-checkbox-label" for="' + e.items[i].id + 'Ids"></label>' +
                                '<img src="' + e.items[i].avatar + '" alt="' + e.items[i].nickName + '">' + e.items[i].realName +
                            '</h5>';
            }
                group += '</div>';
            return group;
        },
        change: function (e) {
            this.select().removeClass('k-state-selected').removeAttr('aria-selected');
        },
        dataBound: function () {
            selectHalf('addressBook');
        }
    });
    // 通讯录全选
    $('#addressBookSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#addressBookView .ids').prop('checked', true).parent().addClass('k-state-selected');
        } else {
            $('#addressBookView .ids').prop('checked', false).parent().removeClass('k-state-selected');
        }
    });
    // 通讯录单选
    $('#addressBookView').on('click', '.ids', function () {
        selectHalf('addressBook');
        if ($(this).prop('checked')) {
            $(this).parent().addClass('k-state-selected');
        } else {
            $(this).parent().removeClass('k-state-selected');
        }
    });
});

// 发送站内信
function sendMailView() {
    if ($('#writeMailView form').kendoValidator().data('kendoValidator').validate()) {
        $.fn.ajaxPost({
            ajaxData: $('#writeMailView form').serializeObject(),
            ajaxUrl: 'json/response.json',
            succeed: function (res) {
                $('#writeMailView form')[0].reset();
            },
            isMsg: true
        });
    }
}

// 发、回复和转发站内信
function postMailView(type, toList, ccList, subject, content) {
    if ($('body > .k-overlay').length > 0) {
        $('.window-box').data('kendoWindow').close();
    }
    $('#msgReceiverView').data('kendoMultiSelect').value(toList.split(','));
    $('#msgCCView').data('kendoMultiSelect').value(ccList.split(','));
    if (type === 'reply' || type === 'replyAll') {
        $('#writeMailView input[name=subject]').val('回复：' + subject);
    } else if (type === 'forward') {
        $('#writeMailView input[name=subject]').val('转发：' + subject);
    } else {
        $('#writeMailView input[name=subject]').val(subject);
    }
    if (type === 'reedit' || type === 'newPost') {
        $('#writeMailView textarea[name=content]').val(content.replace(/<br>/g, '\n'));
    } else {
        $('#writeMailView textarea[name=content]').val('\n------------------------------------------------------------\n' + content.replace(/<br>/g, '\n'));
    }
    $('#messageDrawerView .k-drawer-item').removeClass('k-state-selected').eq(0).addClass('k-state-selected');
    $('#messageDrawerContentView > div').addClass('hide').eq(0).removeClass('hide');
}

// 发短信息
function postSmsView(userId, realName) {
    if ($('body > .k-overlay').length > 0) {
        $('.window-box').data('kendoWindow').close();
    }
    $('#messageDrawerView .k-drawer-item').removeClass('k-state-selected').eq(4).addClass('k-state-selected');
    $('#messageDrawerContentView > div').addClass('hide').eq(4).removeClass('hide');
    $('#smsSearchView').val(realName).trigger('keyup');
    $('#smsView').data('kendoListView').select($('#smsView .sms-list[data-id=' + userId + ']'));
    $('#smsView .sms-list[data-id=' + userId + ']').trigger('click');
    $('#smsChatView .k-message-box input, .window-box:visible .k-message-box input').focus();
}

// 通讯录明细
function addressBookInfoView(dom, gender, email) {
    var content =
        '<div class="address-book-content">' +
            '<figure style="background-image: url(' + $(dom).find('img').attr('src') + ');"></figure>' +
            '<img src="' + $(dom).find('img').attr('src') + '" alt="' + $(dom).find('img').attr('alt') + '">' +
            '<h5>' +
                $(dom).text();
    if (gender === '1') {
        content += '<i class="fas fa-male mars"></i>';
    } else if (gender === '2') {
        content += '<i class="fas fa-female venus"></i>';
    }
        content += '</h5>' +
            '<h6>' + $(dom).find('img').attr('alt') + '</h6>' +
            '<p>' + email + '</p>' +
            '<div class="btns">' +
                '<button class="k-button k-button-icontext k-state-selected" type="button" onclick="postMailView(\'newPost\', \'' + email + '\', \'\', \'\', \'\');"><i class="fas fa-envelope"></i>发站内信</button>' +
                '<button class="k-button k-button-icontext k-state-selected" type="button" onclick="postSmsView(\'' + $(dom).attr('data-id') + '\', \'' + $(dom).text() + '\');"><i class="fas fa-comments"></i>发短信息</button>' +
            '</div>' +
        '</div>';
    if (window.outerWidth < 768) {
        divWindow('<img src="' + $(dom).find('img').attr('src') + '" alt="' + $(dom).find('img').attr('alt') + '"><strong>' + $(dom).text() + '</strong><small>' + $(dom).find('img').attr('alt') + '</small>', '90%', '45%', content);
    } else {
        $('#addressBookView').next().html(content);
    }
}

// 半选
function selectHalf(type) {
    if ($('#' + type + 'View').find('.ids:checked').length < $('#' + type + 'View').find('.ids').length && $('#' + type + 'View').find('.ids:checked').length > 0) {
        $('#' + type + 'SelectAll').prop('checked', false).prop('indeterminate', true);
    } else if ($('#' + type + 'View').find('.ids:checked').length === $('#' + type + 'View').find('.ids').length && $('#' + type + 'View').find('.ids:checked').length !== 0) {
        $('#' + type + 'SelectAll').prop('indeterminate', false).prop('checked', true);
    } else {
        $('#' + type + 'SelectAll').prop('indeterminate', false).prop('checked', false);
    }
}

// 全部已读
function readAll(type) {
    $.fn.ajaxPost({
        ajaxData: {
            type: type
        },
        ajaxUrl: 'json/response.json',
        succeed: function () {
            $.each($('#' + type + 'View').children(), function (i, items) {
                if (type === 'inbox') {
                    $('#' + type + 'View').data('kendoListView').dataItem($(items)).set('unread', false);
                    $(items).removeClass('unread');
                } else if (type === 'sms') {
                    $('#' + type + 'View').data('kendoListView').dataItem($(items)).set('unread', 0);
                    $(items).find('sup').remove();
                }
            });
            $('#' + type + 'DrawerView').find('.badge').remove();
            $('#' + type + 'DrawerView').find('sup').remove();
            getMessage();
        },
        failed: function () {
            alertMsg('标记全部已读出错！', 'error');
        }
    });
}

// 删除
function batchDel(type) {
    var ids = [];
    $.each($('#' + type + 'View .ids'), function () {
        if ($(this).prop('checked')) {
            ids.push($(this).val());
        }
    });
    if (ids.length > 0) {
        $('#loading').show();
        $.fn.ajaxPost({
            ajaxData: {
                'ids': ids
            },
            ajaxUrl: 'json/response.json',
            finished: function () {
                $('#loading').hide();
            },
            succeed: function (res) {
                $('#' + type + 'View').data('kendoListView').dataSource.read();
            },
            isMsg: true
        });
    } else {
        alertMsg('请先选择对象！', 'warning');
    }
}

// 清空
function emptyAll(type, text) {
    confirmMsg('清空确认', '你确定要清空<strong class="theme-m mx-1">' + text + '</strong>吗？', 'question', function () {
        $('#loading').show();
        $.fn.ajaxPost({
            ajaxData: {
                type: type
            },
            ajaxUrl: 'json/response.json',
            finished: function () {
                $('#loading').hide();
            },
            succeed: function (res) {
                $('#' + type + 'DrawerView').find('.badge').remove();
                $('#' + type + 'DrawerView').find('sup').remove();
                $('#' + type + 'View').html('<div class="blank">您的' + text + '是空的~</div>').next().html('<div class="blank"><i class="fas fa-couch"></i>空空如也</div>');
                getMessage();
            },
            isMsg: true
        });
    });
}

// 排序
function order(type, dir) {
    $('#' + type + 'View').data('kendoListView').dataSource.sort({
        field: 'id',
        dir: dir
    });
    $('#' + type + 'Toolbar .orderBtn').toggle();
}

function orderGroup(type, dir) {
    $('#' + type + 'View').data('kendoListView').dataSource.query({
        group: {
            field: 'group',
            dir: dir
        },
        sort: {
            field: 'id',
            dir: dir
        }
    });
    $('#' + type + 'Toolbar .orderBtn').toggle();
}