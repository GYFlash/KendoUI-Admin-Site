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
                template: '<span class="k-textbox k-space-left"><input id="inboxSearch" type="text" placeholder="搜索..."><i class="k-icon k-i-search ml-1"></i></span>'
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
    $('#inboxSearch').keyup(function () {
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

// 半选
function selectHalf(type) {
    if ($('#' + type + 'View').find('.ids:checked').length < $('#' + type + 'View').find('.ids').length && $('#' + type + 'View').find('.ids:checked').length > 0) {
        $('#' + type + 'SelectAll').prop('checked', false).prop('indeterminate', true);
    } else if ($('#' + type + 'View').find('.ids:checked').length === $('#' + type + 'View').find('.ids').length) {
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
            $.each($('#' + type + 'View .mail-list'), function (i, items) {
                $('#' + type + 'View').data('kendoListView').dataItem(items).set('unread', false);
            });
            $('#' + type + 'View').find('.mail-list').removeClass('unread');
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