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
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="readAll(\'systemNotification\', 0);"><span class="k-icon k-i-eye"></span>全部已读</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchDel(\'systemNotification\');"><span class="k-icon k-i-x"></span>删除</a>' },
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
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="readAll(\'userUpdating\', 1);"><span class="k-icon k-i-eye"></span>全部已读</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchDel(\'userUpdating\');"><span class="k-icon k-i-x"></span>删除</a>' },
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
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="readAll(\'toDoItems\', 2);"><span class="k-icon k-i-eye"></span>全部已读</a>' },
                        { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="batchDel(\'toDoItems\');"><span class="k-icon k-i-x"></span>删除</a>' },
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
        selectable: 'multiple',
        template:
            '<div class="media">' +
                '<input class="k-checkbox ids" id="#= id #Ids" type="checkbox" value="#= id #"><label class="k-checkbox-label" for="#= id #Ids"></label>' +
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
            $('#systemNotificationListView .ids').prop('checked', false);
            this.select().find('.ids').prop('checked', true);
        },
        dataBound: function () {
            $('#systemNotificationSelectAll').prop('checked', false);
        }
    });
    // 系统通知已读
    $('#systemNotificationListView').on('click', '.media', function () {
        var that = $(this);
        if (that.find('.media-body').hasClass('unread')) {
            $.fn.ajaxPost({
                ajaxData: {
                    id: that.find('.ids').val(),
                    type: 'systemNotification'
                },
                ajaxUrl: 'json/response.json',
                succeed: function () {
                    $('#systemNotificationListView').data('kendoListView').dataItem(that).set('unread', false);
                    setTimeout(function () {
                        $('#systemNotificationListView').data('kendoListView').select($('#' + that.find('.ids').attr('id')).parent());
                    }, 10);
                    that.find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
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
    });
    // 全选
    $('#systemNotificationSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#systemNotificationListView').data('kendoListView').select($('#systemNotificationListView .media'));
        } else {
            $('#systemNotificationListView').data('kendoListView').clearSelection();
        }
    });
    // 单选
    $('#systemNotificationListView').on('click', '.ids', function () {
        if ($(this).prop('checked')) {
            $('#systemNotificationListView').data('kendoListView').select($(this).parents('.media'));
        } else {
            $(this).parents('.media').removeClass('k-state-selected').removeAttr('aria-selected');
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
        selectable: 'multiple',
        template:
            '<div class="media">' +
                '<input class="k-checkbox ids" id="#= id #Ids" type="checkbox" value="#= id #"><label class="k-checkbox-label" for="#= id #Ids"></label>' +
                '<img src="#= avatar #" alt="#= nickName #">' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            $('#userUpdatingListView .ids').prop('checked', false);
            this.select().find('.ids').prop('checked', true);
        },
        dataBound: function () {
            $('#userUpdatingSelectAll').prop('checked', false);
        }
    });
    // 个人动态已读
    $('#userUpdatingListView').on('click', '.media', function () {
        var that = $(this);
        if (that.find('.media-body').hasClass('unread')) {
            $.fn.ajaxPost({
                ajaxData: {
                    id: that.find('.ids').val(),
                    type: 'userUpdating'
                },
                ajaxUrl: 'json/response.json',
                succeed: function () {
                    $('#userUpdatingListView').data('kendoListView').dataItem(that).set('unread', false);
                    setTimeout(function () {
                        $('#userUpdatingListView').data('kendoListView').select($('#' + that.find('.ids').attr('id')).parent());
                    }, 10);
                    that.find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
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
    });
    // 全选
    $('#userUpdatingSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#userUpdatingListView').data('kendoListView').select($('#userUpdatingListView .media'));
        } else {
            $('#userUpdatingListView').data('kendoListView').clearSelection();
        }
    });
    // 单选
    $('#userUpdatingListView').on('click', '.ids', function () {
        if ($(this).prop('checked')) {
            $('#userUpdatingListView').data('kendoListView').select($(this).parents('.media'));
        } else {
            $(this).parents('.media').removeClass('k-state-selected').removeAttr('aria-selected');
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
        selectable: 'multiple',
        template:
            '<div class="media">' +
                '<input class="k-checkbox ids" id="#= id #Ids" type="checkbox" value="#= id #"><label class="k-checkbox-label" for="#= id #Ids"></label>' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5><em class="k-notification-# if (stateType === \'1\') { #success# } else if (stateType === \'2\') { #info# } else if (stateType === \'3\') { #warning# } else if (stateType === \'4\') { #error# } else { #normal# } #">#= state #</em>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            $('#toDoItemsListView .ids').prop('checked', false);
            this.select().find('.ids').prop('checked', true);
        },
        dataBound: function () {
            $('#toDoItemsSelectAll').prop('checked', false);
        }
    });
    // 待办事项已读
    $('#toDoItemsListView').on('click', '.media', function () {
        var that = $(this);
        if (that.find('.media-body').hasClass('unread')) {
            $.fn.ajaxPost({
                ajaxData: {
                    id: that.find('.ids').val(),
                    type: 'toDoItems'
                },
                ajaxUrl: 'json/response.json',
                succeed: function () {
                    $('#toDoItemsListView').data('kendoListView').dataItem(that).set('unread', false);
                    setTimeout(function () {
                        $('#toDoItemsListView').data('kendoListView').select($('#' + that.find('.ids').attr('id')).parent());
                    }, 10);
                    that.find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
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
    });
    // 全选
    $('#toDoItemsSelectAll').click(function () {
        if ($(this).prop('checked')) {
            $('#toDoItemsListView').data('kendoListView').select($('#toDoItemsListView .media'));
        } else {
            $('#toDoItemsListView').data('kendoListView').clearSelection();
        }
    });
    // 单选
    $('#toDoItemsListView').on('click', '.ids', function () {
        if ($(this).prop('checked')) {
            $('#toDoItemsListView').data('kendoListView').select($(this).parents('.media'));
        } else {
            $(this).parents('.media').removeClass('k-state-selected').removeAttr('aria-selected');
        }
    });
}

// 全部已读
function readAll(type, index) {
    $.fn.ajaxPost({
        ajaxData: {
            type: type
        },
        ajaxUrl: 'json/response.json',
        succeed: function () {
            $.each($('#' + type + 'ListView .media'), function (i, items) {
                $('#' + type + 'ListView').data('kendoListView').dataItem(items).set('unread', false);
            });
            $('#' + type + 'ListView').find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
            $('#noticeTabStripView .k-tabstrip-items > li:eq(' + index + ')').find('.badge').remove();
            getNotice();
        },
        failed: function () {
            alertMsg('标记全部已读出错！', 'error');
        }
    });
}

// 删除
function batchDel(type) {
    var ids = [];
    $.each($('#' + type + 'ListView .ids'), function () {
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
                $('#' + type + 'ListView').data('kendoListView').dataSource.read();
            },
            isMsg: true
        });
    } else {
        alertMsg('请先选择对象！', 'warning');
    }
}