$(function () {
    // 定义 PDF 嵌入字体
    kendo.pdf.defineFont({
        'Microsoft YaHei': 'fonts/msyh.ttf',
        'Microsoft YaHei|Bold': 'fonts/msyhbd.ttf'
    });
    // 普通甘特图
    $('#generalGantt').kendoGantt({
        dataSource: {
            transport: {
                create: function (options) {
                    $('#loading').show();
                    $.fn.ajaxPost({
                        ajaxData: options.data,
                        ajaxUrl: 'json/response.json',
                        finished: function () {
                            $('#loading').hide();
                        },
                        succeed: function (res) {
                            options.success(res);
                            // $('#generalGantt').data('kendoGantt').dataSource.read();
                            $('#generalGantt').data('kendoGantt').refresh();
                        },
                        failed: function (res) {
                            options.error(res);
                        },
                        isMsg: true
                    });
                },
                destroy: function (options) {
                    $('#loading').show();
                    $.fn.ajaxPost({
                        ajaxData: {'id': options.data.id},
                        ajaxUrl: 'json/response.json',
                        finished: function () {
                            $('#loading').hide();
                        },
                        succeed: function (res) {
                            options.success(res);
                            // $('#generalGantt').data('kendoGantt').dataSource.read();
                            $('#generalGantt').data('kendoGantt').refresh();
                        },
                        failed: function (res) {
                            options.error(res);
                        },
                        isMsg: true
                    });
                },
                update: function (options) {
                    $('#loading').show();
                    $.fn.ajaxPost({
                        ajaxData: options.data,
                        ajaxUrl: 'json/response.json',
                        finished: function () {
                            $('#loading').hide();
                        },
                        succeed: function (res) {
                            options.success(res);
                            // $('#generalGantt').data('kendoGantt').dataSource.read();
                            $('#generalGantt').data('kendoGantt').refresh();
                        },
                        failed: function (res) {
                            options.error(res);
                        },
                        isMsg: true
                    });
                },
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: options.data,
                        ajaxUrl: 'json/gantt.json',
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
                data: 'data',
                model: {
                    id: 'id',
                    fields: {
                        id: { from: 'ID', type: 'number' },
                        parentId: { from: 'ParentID', type: 'number',
                            defaultValue: null,
                            validation: {
                                required: true
                            }
                        },
                        orderId: { from: 'OrderID', type: 'number',
                            validation: {
                                required: true
                            }
                        },
                        title: { from: 'Title',
                            defaultValue: ''
                        },
                        start: { from: 'Start', type: 'date',
                            parse: function (e) {
                                return kendo.parseDate(e);
                            }
                        },
                        end: { from: 'End', type: 'date',
                            parse: function (e) {
                                return kendo.parseDate(e);
                            }
                        },
                        percentComplete: { from: 'PercentComplete', type: 'number' },
                        summary: { from: 'Summary', type: 'boolean' },
                        expanded: { from: 'Expanded', type: 'boolean',
                            defaultValue: true
                        }
                    }
                }
            }
        },
        dependencies: [
            { id: 1, predecessorId: 1, successorId: 2, type: 1 },
            { id: 2, predecessorId: 2, successorId: 3, type: 1 },
            { id: 3, predecessorId: 3, successorId: 4, type: 1 },
            { id: 4, predecessorId: 4, successorId: 5, type: 1 },
            { id: 5, predecessorId: 5, successorId: 6, type: 1 },
            { id: 6, predecessorId: 6, successorId: 7, type: 1 },
            { id: 7, predecessorId: 7, successorId: 8, type: 1 },
            { id: 8, predecessorId: 8, successorId: 9, type: 1 },
            { id: 9, predecessorId: 9, successorId: 10, type: 1 },
            { id: 10, predecessorId: 10, successorId: 11, type: 1 },
            { id: 11, predecessorId: 11, successorId: 12, type: 1 },
            { id: 12, predecessorId: 12, successorId: 13, type: 1 },
            { id: 13, predecessorId: 13, successorId: 14, type: 1 },
            { id: 14, predecessorId: 16, successorId: 18, type: 1 },
            { id: 15, predecessorId: 18, successorId: 20, type: 1 },
            { id: 16, predecessorId: 20, successorId: 22, type: 1 },
            { id: 17, predecessorId: 22, successorId: 24, type: 1 },
            { id: 18, predecessorId: 24, successorId: 26, type: 1 },
            { id: 19, predecessorId: 26, successorId: 28, type: 1 },
            { id: 20, predecessorId: 28, successorId: 30, type: 1 },
            { id: 21, predecessorId: 30, successorId: 32, type: 1 },
            { id: 22, predecessorId: 32, successorId: 34, type: 1 },
            { id: 23, predecessorId: 34, successorId: 36, type: 1 },
            { id: 24, predecessorId: 36, successorId: 38, type: 1 },
            { id: 25, predecessorId: 38, successorId: 39, type: 1 },
            { id: 26, predecessorId: 39, successorId: 40, type: 1 }
        ],
        resources: {
            dataSource: [
                { id: 1, name: '穆', color: '#c39b8f' },
                { id: 2, name: '阿鲁迪巴', color: '#d770ad' },
                { id: 3, name: '撒加', color: '#da4453' },
                { id: 4, name: '迪斯马斯克', color: '#ff9800' },
                { id: 5, name: '艾欧里亚', color: '#f6bb42' },
                { id: 6, name: '沙加', color: '#8cc152' },
                { id: 7, name: '童虎', color: '#37bc9b' },
                { id: 8, name: '米罗', color: '#3bafda' },
                { id: 9, name: '艾俄洛斯', color: '#4a89dc' },
                { id: 10, name: '修罗', color: '#967adc' },
                { id: 11, name: '卡妙', color: '#434a54' },
                { id: 12, name: '阿布罗狄', color: '#aab2bd' },
                { id: 13, name: '星矢', color: '#007bff' },
                { id: 14, name: '紫龙', color: '#28a745' },
                { id: 15, name: '冰河', color: '#17a2b8' },
                { id: 16, name: '瞬', color: '#dc3545' },
                { id: 17, name: '一辉', color: '#ffc107' },
                { id: 18, name: '雅典娜', color: '#6c757d' }
            ]
        },
        assignments: {
            dataSource: [
                { taskId: 0, resourceId: 13, value: 0.2 },
                { taskId: 0, resourceId: 14, value: 0.2 },
                { taskId: 0, resourceId: 15, value: 0.2 },
                { taskId: 0, resourceId: 16, value: 0.2 },
                { taskId: 0, resourceId: 17, value: 0.2 },
                { taskId: 1, resourceId: 1, value: 0.2 },
                { taskId: 1, resourceId: 13, value: 0.2 },
                { taskId: 1, resourceId: 14, value: 0.2 },
                { taskId: 1, resourceId: 15, value: 0.2 },
                { taskId: 1, resourceId: 16, value: 0.2 },
                { taskId: 2, resourceId: 2, value: 0.5 },
                { taskId: 2, resourceId: 13, value: 0.5 },
                { taskId: 3, resourceId: 3, value: 0.5 },
                { taskId: 3, resourceId: 16, value: 0.5 },
                { taskId: 4, resourceId: 4, value: 0.5 },
                { taskId: 4, resourceId: 14, value: 0.5 },
                { taskId: 5, resourceId: 5, value: 0.5 },
                { taskId: 5, resourceId: 13, value: 0.5 },
                { taskId: 6, resourceId: 6, value: 0.5 },
                { taskId: 6, resourceId: 17, value: 0.5 },
                { taskId: 7, resourceId: 7, value: 0.5 },
                { taskId: 7, resourceId: 14, value: 0.5 },
                { taskId: 8, resourceId: 8, value: 0.5 },
                { taskId: 8, resourceId: 15, value: 0.5 },
                { taskId: 9, resourceId: 9, value: 0.2 },
                { taskId: 9, resourceId: 13, value: 0.2 },
                { taskId: 9, resourceId: 14, value: 0.2 },
                { taskId: 9, resourceId: 15, value: 0.2 },
                { taskId: 9, resourceId: 16, value: 0.2 },
                { taskId: 10, resourceId: 10, value: 0.5 },
                { taskId: 10, resourceId: 14, value: 0.5 },
                { taskId: 11, resourceId: 11, value: 0.5 },
                { taskId: 11, resourceId: 15, value: 0.5 },
                { taskId: 12, resourceId: 12, value: 0.5 },
                { taskId: 12, resourceId: 16, value: 0.5 },
                { taskId: 13, resourceId: 3, value: 0.5 },
                { taskId: 13, resourceId: 13, value: 0.25 },
                { taskId: 13, resourceId: 17, value: 0.25 },
                { taskId: 14, resourceId: 13, value: 1 },
                { taskId: 15, resourceId: 1, value: 1 },
                { taskId: 16, resourceId: 13, value: 0.25 },
                { taskId: 16, resourceId: 14, value: 0.25 },
                { taskId: 16, resourceId: 15, value: 0.25 },
                { taskId: 16, resourceId: 16, value: 0.25 },
                { taskId: 17, resourceId: 2, value: 1 },
                { taskId: 18, resourceId: 13, value: 1 },
                { taskId: 19, resourceId: 3, value: 1 },
                { taskId: 20, resourceId: 16, value: 1 },
                { taskId: 21, resourceId: 4, value: 1 },
                { taskId: 22, resourceId: 14, value: 1 },
                { taskId: 23, resourceId: 5, value: 1 },
                { taskId: 24, resourceId: 13, value: 1 },
                { taskId: 25, resourceId: 6, value: 1 },
                { taskId: 26, resourceId: 17, value: 1 },
                { taskId: 27, resourceId: 7, value: 1 },
                { taskId: 28, resourceId: 14, value: 1 },
                { taskId: 29, resourceId: 8, value: 1 },
                { taskId: 30, resourceId: 15, value: 1 },
                { taskId: 31, resourceId: 9, value: 1 },
                { taskId: 32, resourceId: 13, value: 0.25 },
                { taskId: 32, resourceId: 14, value: 0.25 },
                { taskId: 32, resourceId: 15, value: 0.25 },
                { taskId: 32, resourceId: 16, value: 0.25 },
                { taskId: 33, resourceId: 10, value: 1 },
                { taskId: 34, resourceId: 14, value: 1 },
                { taskId: 35, resourceId: 11, value: 1 },
                { taskId: 36, resourceId: 15, value: 1 },
                { taskId: 37, resourceId: 12, value: 1 },
                { taskId: 38, resourceId: 16, value: 1 },
                { taskId: 39, resourceId: 3, value: 0.5 },
                { taskId: 39, resourceId: 13, value: 0.25 },
                { taskId: 39, resourceId: 17, value: 0.25 },
                { taskId: 40, resourceId: 13, value: 1 }
            ]
        },
        toolbar: ['append', 'pdf'],
        views: [],
        pdf: {
            fileName: 'Gantt.pdf',
            creator: 'IKKI Studio',
            author: 'IKKI & Amikoko',
            title: '甘特图展示',
            subject: '黄金十二宫',
            keywords: 'Gold Saint',
            landscape: true,
            avoidLinks: true
        },
        columns: [
            { field: 'title', title: '任务', width: 200, editable: true, sortable: true },
            { field: 'resources', title: '资源分配', width: 220, editable: true },
            { field: 'percentComplete', title: '完成度', format: '{0:p}', width: 90, editable: true, sortable: true },
            { field: 'start', title: '开始时间', format: '{0:HH:mm}', width: 90, editable: true, sortable: true },
            { field: 'end', title: '结束时间', format: '{0:HH:mm}', width: 90, editable: true, sortable: true }
        ],
        date: new Date('2019/8/15'),
        range: {
            start: new Date('2019/1/1'),
            end: new Date('2019/12/31')
        },
        workDayStart: new Date('2019/8/15 11:00 AM'),
        workDayEnd: new Date('2019/8/15 11:00 PM'),
        resizable: true,
        navigatable: true,
        rowHeight: 50
    });
});