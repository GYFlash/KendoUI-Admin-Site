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
            var noticeType = $(e.contentElement).children().eq(1).attr('id').substring(0, $(e.contentElement).children().eq(1).attr('id').length - 8);
            // 生成工具栏
            if (!($('#' + noticeType + 'Toolbar').data('kendoToolBar'))) {
                $('#' + noticeType + 'Toolbar').kendoToolBar({
                    items: [
                        {
                            template: '<input class="k-checkbox" id="' + noticeType + 'SelectAll" type="checkbox" title="全选"><label class="k-checkbox-label" for="' + noticeType + 'SelectAll"></label>'
                        },
                        {
                            type: 'button',
                            text: '全部已读',
                            icon: 'eye',
                            click: function () {
                                readAll(noticeType, $(e.item).index());
                            }
                        },
                        {
                            type: 'button',
                            text: '删除',
                            icon: 'x',
                            click: function () {
                                batchDel(noticeType);
                            }
                        },
                        {
                            type: 'button',
                            text: '清空',
                            icon: 'trash',
                            click: function () {
                                emptyAll(noticeType, $(e.item).index(), $(e.item).text().substr(0, 2));
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
                                order(noticeType, 'desc');
                            }
                        },
                        {
                            type: 'button',
                            text: '降序',
                            icon: 'sort-desc',
                            attributes: { 'class': 'orderBtn' },
                            overflow: 'never',
                            click: function () {
                                order(noticeType, 'asc');
                            }
                        },
                        {
                            template: '<span class="k-textbox k-space-left"><input id="' + noticeType + 'Search" type="text" placeholder="搜索..."><i class="k-icon k-i-search ml-1"></i></span>'
                        },
                        {
                            type: 'splitButton',
                            text: '全部',
                            icon: 'filter',
                            menuButtons: [
                                {
                                    text: '未读',
                                    click: function () {
                                        $('#' + noticeType + 'ListView').data('kendoListView').dataSource.filter({
                                            field: 'unread',
                                            operator: 'eq',
                                            value: true
                                        });
                                    }
                                },
                                {
                                    text: '已读',
                                    click: function () {
                                        $('#' + noticeType + 'ListView').data('kendoListView').dataSource.filter({
                                            field: 'unread',
                                            operator: 'eq',
                                            value: false
                                        });
                                    }
                                }
                            ],
                            overflow: 'never',
                            click: function () {
                                $('#' + noticeType + 'ListView').data('kendoListView').dataSource.filter({
                                    field: 'unread',
                                    operator: 'isnotnull'
                                });
                            }
                        }
                    ]
                });
            }
            // 搜索
            $('#' + noticeType + 'Search').keyup(function () {
                $('#' + noticeType + 'ListView').data('kendoListView').dataSource.filter({
                    logic: 'or',
                    filters: [
                        { field: 'nickName', operator: 'contains', value: $(this).val() },
                        { field: 'title', operator: 'contains', value: $(this).val() },
                        { field: 'content', operator: 'contains', value: $(this).val() },
                        { field: 'time', operator: 'contains', value: $(this).val() },
                        { field: 'state', operator: 'contains', value: $(this).val() }
                    ]
                });
            });
            // 生成列表
            if (noticeType === 'systemNotification') {
                getSystemNotificationView();
            } else if (noticeType === 'userUpdating') {
                getUserUpdatingView();
            } else if (noticeType === 'toDoItems') {
                getToDoItemsView();
            }
            // 已读
            $('#' + noticeType + 'ListView').on('click', '.media', function () {
                var that = $(this);
                if (that.find('.media-body').hasClass('unread')) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            id: that.find('.ids').val(),
                            type: noticeType
                        },
                        ajaxUrl: 'json/response.json',
                        succeed: function () {
                            $('#' + noticeType + 'ListView').data('kendoListView').dataItem(that).set('unread', false);
                            setTimeout(function () {
                                $('#' + noticeType + 'ListView').data('kendoListView').select($('#' + that.find('.ids').attr('id')).parent());
                            }, 10);
                            that.find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                            var badgeDom = $('#noticeTabStripView .k-tabstrip-items > li:eq(' + $(e.item).index() + ')').find('.badge');
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
            $('#' + noticeType + 'SelectAll').click(function () {
                if ($(this).prop('checked')) {
                    $('#' + noticeType + 'ListView').data('kendoListView').select($('#' + noticeType + 'ListView .media'));
                } else {
                    $('#' + noticeType + 'ListView').data('kendoListView').clearSelection();
                }
            });
            // 单选
            $('#' + noticeType + 'ListView').on('click', '.ids', function () {
                if ($(this).prop('checked')) {
                    $('#' + noticeType + 'ListView').data('kendoListView').select($(this).parents('.media'));
                } else {
                    $(this).parents('.media').removeClass('k-state-selected').removeAttr('aria-selected');
                }
            });
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
        height: $('#container').height() - 81,
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
}

// 个人动态获取
function getUserUpdatingView() {
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
        height: $('#container').height() - 81,
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
}

// 待办事项获取
function getToDoItemsView() {
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
        height: $('#container').height() - 81,
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

// 清空
function emptyAll(type, index, text) {
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
                $('#noticeTabStripView .k-tabstrip-items > li:eq(' + index + ')').find('.badge').remove();
                $('#' + type + 'ListView').html('<div class="blank">暂时没有新的' + text + '~</div>');
                getNotice();
            },
            isMsg: true
        });
    });
}

// 排序
function order(type, dir) {
    $('#' + type + 'ListView').data('kendoListView').dataSource.sort({
        field: 'id',
        dir: dir
    });
    $('#' + type + 'Toolbar .orderBtn').toggle();
}