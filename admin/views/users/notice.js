$(function () {
    // 选项卡生成
    $('#noticeTabStripView').kendoTabStrip({
        animation: false,
        dataSource: [
            {
                text: '通知',
                spriteCssClass: 'fas fa-volume-up',
                content:
                    '<div id="systemNotificationToolbar"></div>' +
                    '<div id="systemNotificationListView"></div>'
            },
            {
                text: '动态',
                spriteCssClass: 'fas fa-user-clock',
                content:
                    '<div id="userUpdatingToolbar"></div>' +
                    '<div id="userUpdatingListView"></div>'
            },
            {
                text: '待办',
                spriteCssClass: 'fas fa-calendar-check',
                content:
                    '<div id="toDoItemsToolbar"></div>' +
                    '<div id="toDoItemsListView"></div>'
            }
        ],
        dataTextField: 'text',
        dataSpriteCssClass: 'spriteCssClass',
        dataContentField: 'content',
        select: function (e) {
            var noticeType = $(e.contentElement).find('div').eq(1).attr('id');
            if (noticeType === 'systemNotificationListView') {
                // 生成工具条
                $('#systemNotificationToolbar').kendoToolBar({
                    resizable: false,
                    items: [
                        { template: '<input class="k-checkbox" id="systemNotificationSelectAll" type="checkbox" title="全选"><label class="k-checkbox-label" for="systemNotificationSelectAll"></label>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-eye"></span>全部已读</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-x"></span>删除</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-trash"></span>清空</a>' },
                        { type: 'spacer' },
                        { template: '<a class="k-button k-button-icontext systemNotificationOrderBtn" href="javascript:;" onclick="order(\'desc\');"><span class="k-icon k-i-sort-asc-sm"></span>升序</a><a class="k-button k-button-icontext systemNotificationOrderBtn hide" href="javascript:;" onclick="order(\'asc\');"><span class="k-icon k-i-sort-desc-sm"></span>降序</a>' },
                        { template: '<input class="k-textbox" id="systemNotificationSearch" type="text" placeholder="搜索...">' },
                        { template: '<select class="w-100" id="systemNotificationFilter"></select>' }
                    ]
                });
                // 筛选
                $('#systemNotificationFilter').kendoDropDownList({
                    dataSource: {
                        data: [
                            { text: '未读', value: true },
                            { text: '已读', value: false }
                        ]
                    },
                    optionLabel: "全部",
                    dataValueField: 'value',
                    dataTextField: 'text'
                });
                // 生成列表
                getSystemNotificationView();
            } else if (noticeType === 'userUpdatingListView') {
                // 生成工具条
                $('#userUpdatingToolbar').kendoToolBar({
                    resizable: false,
                    items: [
                        { template: '<input class="k-checkbox" id="userUpdatingSelectAll" type="checkbox" title="全选"><label class="k-checkbox-label" for="userUpdatingSelectAll"></label>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-eye"></span>全部已读</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-x"></span>删除</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-trash"></span>清空</a>' },
                        { type: 'spacer' },
                        { template: '<a class="k-button k-button-icontext userUpdatingOrderBtn" href="javascript:;" onclick="order(\'desc\');"><span class="k-icon k-i-sort-asc-sm"></span>升序</a><a class="k-button k-button-icontext userUpdatingOrderBtn hide" href="javascript:;" onclick="order(\'asc\');"><span class="k-icon k-i-sort-desc-sm"></span>降序</a>' },
                        { template: '<input class="k-textbox" id="userUpdatingSearch" type="text" placeholder="搜索...">' },
                        { template: '<select class="w-100" id="userUpdatingFilter"></select>' }
                    ]
                });
                // 筛选
                $('#userUpdatingFilter').kendoDropDownList({
                    dataSource: {
                        data: [
                            { text: '未读', value: true },
                            { text: '已读', value: false }
                        ]
                    },
                    optionLabel: "全部",
                    dataValueField: 'value',
                    dataTextField: 'text'
                });
                // 生成列表
                getUserUpdatingView();
            } else if (noticeType === 'toDoItemsListView') {
                // 生成工具条
                $('#toDoItemsToolbar').kendoToolBar({
                    resizable: false,
                    items: [
                        { template: '<input class="k-checkbox" id="toDoItemsSelectAll" type="checkbox" title="全选"><label class="k-checkbox-label" for="toDoItemsSelectAll"></label>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-eye"></span>全部已读</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-x"></span>删除</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchSubmitId(\'json/response.json\');"><span class="k-icon k-i-trash"></span>清空</a>' },
                        { type: 'spacer' },
                        { template: '<a class="k-button k-button-icontext toDoItemsOrderBtn" href="javascript:;" onclick="order(\'desc\');"><span class="k-icon k-i-sort-asc-sm"></span>升序</a><a class="k-button k-button-icontext toDoItemsOrderBtn hide" href="javascript:;" onclick="order(\'asc\');"><span class="k-icon k-i-sort-desc-sm"></span>降序</a>' },
                        { template: '<input class="k-textbox" id="toDoItemsSearch" type="text" placeholder="搜索...">' },
                        { template: '<select class="w-100" id="toDoItemsFilter"></select>' }
                    ]
                });
                // 筛选
                $('#toDoItemsFilter').kendoDropDownList({
                    dataSource: {
                        data: [
                            { text: '未读', value: true },
                            { text: '已读', value: false }
                        ]
                    },
                    optionLabel: "全部",
                    dataValueField: 'value',
                    dataTextField: 'text'
                });
                // 生成列表
                getToDoItemsView();
            }
        }
    }).data('kendoTabStrip').select($('#noticeTabStrip').data('kendoTabStrip').select().index());
    // 新提醒数量获取
    $.fn.ajaxPost({
        ajaxUrl: 'json/notice.json',
        succeed: function (res) {
            $('#noticeTabStripView').find('.k-tabstrip-items .badge').remove();
            if (res.systemNotificationTotal > 0) {
                $('#noticeTabStripView .k-tabstrip-items > li:eq(0) > .k-link').append('<span class="badge theme-s-bg">' + res.systemNotificationTotal + '</span>');
            }
            if (res.userUpdatingTotal > 0) {
                $('#noticeTabStripView .k-tabstrip-items > li:eq(1) > .k-link').append('<span class="badge theme-s-bg">' + res.userUpdatingTotal + '</span>');
            }
            if (res.toDoItemsTotal > 0) {
                $('#noticeTabStripView .k-tabstrip-items > li:eq(2) > .k-link').append('<span class="badge theme-s-bg">' + res.toDoItemsTotal + '</span>');
            }
        }
    });
});

// 系统通知获取
function getSystemNotificationView() {
    if ($('#systemNotificationListView').data('kendoListView')) {
        $('#systemNotificationListView').data('kendoListView').destroy();
    }
    if (window.innerWidth < 660) {
        var listViewHeight = $('#container').height() - 111;
    } else {
        var listViewHeight = $('#container').height() - 81;
    }
    $('#systemNotificationListView').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'systemNotification'
                        },
                        ajaxUrl: 'json/notice.json',
                        succeed: function (res) {
                            $('#noticeTabStripView .k-tabstrip-items > li:eq(0)').find('.badge').remove();
                            options.success(res);
                            if (res.systemNotification.length > 0) {
                                $('#noticeTabStripView .k-tabstrip-items > li:eq(0) > .k-link').append('<span class="badge theme-s-bg">' + res.systemNotification.length + '</span>');
                            } else {
                                $('#systemNotificationListView').html('<div class="blank">暂时没有新的系统通知~</div>');
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
                    return res.systemNotification.length;
                },
                data: 'systemNotification',
                model: {
                    id: 'id',
                    fields: {
                        avatar: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        time: { type: 'string' },
                        unread: { type: 'boolean' }
                    }
                }
            },
            pageSize: 10
        },
        height: listViewHeight,
        scrollable: 'endless',
        selectable: true,
        template:
            '<div class="media">' +
                '<figure class="theme-m-bg">' +
                    '<i class="fab fa-#= avatar #"></i>' +
                '</figure>' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            // 系统通知已读
            if ($(e.sender.select()).find('.media-body').hasClass('unread')) {
                $.fn.ajaxPost({
                    ajaxData: {
                        id: e.sender.dataItem(e.sender.select()).id,
                        type: 'systemNotification'
                    },
                    ajaxUrl: 'json/response.json',
                    succeed: function () {
                        e.sender.dataItem(e.sender.select()).set('unread', false);
                        $(e.sender.select()).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                        var badgeDom = $('#noticeTabStripView .k-tabstrip-items > li:eq(0)').find('.badge');
                        if (badgeDom.text() === '1') {
                            badgeDom.remove();
                        } else {
                            badgeDom.text(Number(badgeDom.text()) - 1);
                        }
                        getNotice();
                    },
                    failed: function () {
                        alertMsg('标记已读出错！', 'error');
                    }
                });
            }
        }
    });
}

// 个人动态获取
function getUserUpdatingView() {
    if ($('#userUpdatingListView').data('kendoListView')) {
        $('#userUpdatingListView').data('kendoListView').destroy();
    }
    if (window.innerWidth < 660) {
        var listViewHeight = $('#container').height() - 111;
    } else {
        var listViewHeight = $('#container').height() - 81;
    }
    $('#userUpdatingListView').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'userUpdating'
                        },
                        ajaxUrl: 'json/notice.json',
                        succeed: function (res) {
                            $('#noticeTabStripView .k-tabstrip-items > li:eq(1)').find('.badge').remove();
                            options.success(res);
                            if (res.userUpdating.length > 0) {
                                $('#noticeTabStripView .k-tabstrip-items > li:eq(1) > .k-link').append('<span class="badge theme-s-bg">' + res.userUpdating.length + '</span>');
                            } else {
                                $('#userUpdatingListView').html('<div class="blank">暂时没有新的个人动态~</div>');
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
                    return res.userUpdating.length;
                },
                data: 'userUpdating',
                model: {
                    id: 'id',
                    fields: {
                        avatar: { type: 'string' },
                        nickName: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        time: { type: 'string' },
                        unread: { type: 'boolean' }
                    }
                }
            },
            pageSize: 10
        },
        height: listViewHeight,
        scrollable: 'endless',
        selectable: true,
        template:
            '<div class="media">' +
                '<img src="#= avatar #" alt="#= nickName #">' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            // 个人动态已读
            if ($(e.sender.select()).find('.media-body').hasClass('unread')) {
                $.fn.ajaxPost({
                    ajaxData: {
                        id: e.sender.dataItem(e.sender.select()).id,
                        type: 'userUpdating'
                    },
                    ajaxUrl: 'json/response.json',
                    succeed: function () {
                        e.sender.dataItem(e.sender.select()).set('unread', false);
                        $(e.sender.select()).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                        var badgeDom = $('#noticeTabStripView .k-tabstrip-items > li:eq(1)').find('.badge');
                        if (badgeDom.text() === '1') {
                            badgeDom.remove();
                        } else {
                            badgeDom.text(Number(badgeDom.text()) - 1);
                        }
                        getNotice();
                    },
                    failed: function () {
                        alertMsg('标记已读出错！', 'error');
                    }
                });
            }
        }
    });
}

// 待办事项获取
function getToDoItemsView() {
    if ($('#toDoItemsListView').data('kendoListView')) {
        $('#toDoItemsListView').data('kendoListView').destroy();
    }
    if (window.innerWidth < 660) {
        var listViewHeight = $('#container').height() - 111;
    } else {
        var listViewHeight = $('#container').height() - 81;
    }
    $('#toDoItemsListView').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'toDoItems'
                        },
                        ajaxUrl: 'json/notice.json',
                        succeed: function (res) {
                            $('#noticeTabStripView .k-tabstrip-items > li:eq(2)').find('.badge').remove();
                            options.success(res);
                            if (res.toDoItems.length > 0) {
                                $('#noticeTabStripView .k-tabstrip-items > li:eq(2) > .k-link').append('<span class="badge theme-s-bg">' + res.toDoItems.length + '</span>');
                            } else {
                                $('#toDoItemsListView').html('<div class="blank">暂时没有新的待办事项~</div>');
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
                    return res.toDoItems.length;
                },
                data: 'toDoItems',
                model: {
                    id: 'id',
                    fields: {
                        state: { type: 'string' },
                        stateType: { type: 'string' },
                        title: { type: 'string' },
                        content: { type: 'string' },
                        time: { type: 'string' },
                        unread: { type: 'boolean' }
                    }
                }
            },
            pageSize: 10
        },
        height: listViewHeight,
        scrollable: 'endless',
        selectable: true,
        template:
            '<div class="media">' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5><em class="k-notification-# if (stateType === \'1\') { #success# } else if (stateType === \'2\') { #info# } else if (stateType === \'3\') { #warning# } else if (stateType === \'4\') { #error# } else { #normal# } #">#= state #</em>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            // 待办事项已读
            if ($(e.sender.select()).find('.media-body').hasClass('unread')) {
                $.fn.ajaxPost({
                    ajaxData: {
                        id: e.sender.dataItem(e.sender.select()).id,
                        type: 'toDoItems'
                    },
                    ajaxUrl: 'json/response.json',
                    succeed: function () {
                        e.sender.dataItem(e.sender.select()).set('unread', false);
                        $(e.sender.select()).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                        var badgeDom = $('#noticeTabStripView .k-tabstrip-items > li:eq(2)').find('.badge');
                        if (badgeDom.text() === '1') {
                            badgeDom.remove();
                        } else {
                            badgeDom.text(Number(badgeDom.text()) - 1);
                        }
                        getNotice();
                    },
                    failed: function () {
                        alertMsg('标记已读出错！', 'error');
                    }
                });
            }
        }
    });
}