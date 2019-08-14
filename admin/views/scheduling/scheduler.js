$(function () {
    // 定义 PDF 嵌入字体
    kendo.pdf.defineFont({
        'Microsoft YaHei': 'fonts/msyh.ttf',
        'Microsoft YaHei|Bold': 'fonts/msyhbd.ttf'
    });
    // 普通日程表
    $('#generalScheduler').kendoScheduler({
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
                            // $('#generalScheduler').data('kendoScheduler').dataSource.read();
                            $('#generalScheduler').data('kendoScheduler').refresh();
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
                            // $('#generalScheduler').data('kendoScheduler').dataSource.read();
                            $('#generalScheduler').data('kendoScheduler').refresh();
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
                            // $('#generalScheduler').data('kendoScheduler').dataSource.read();
                            $('#generalScheduler').data('kendoScheduler').refresh();
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
                        ajaxUrl: 'json/scheduler.json',
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
                    id: 'taskId',
                    fields: {
                        taskId: { from: 'TaskID', type: 'number' },
                        ownerId: { from: 'OwnerID',
                            defaultValue: 'saint'
                        },
                        avatar: { from: 'Avatar',
                            defaultValue: 'img/avatar.png'
                        },
                        title: { from: 'Title',
                            defaultValue: '无标题',
                            validation: {
                                required: true
                            }
                        },
                        description: { from: 'Description' },
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
                        startTimezone: { from: 'StartTimezone' },
                        endTimezone: { from: 'EndTimezone' },
                        recurrenceId: { from: 'RecurrenceID' },
                        recurrenceRule: { from: 'RecurrenceRule' },
                        recurrenceException: { from: 'RecurrenceException' },
                        isAllDay: { from: 'IsAllDay', type: 'boolean' }
                    }
                }
            }
        },
        resources: [
            {
                field: 'ownerId',
                name: 'saint',
                title: '圣斗士',
                dataSource: [
                    { text: '穆', value: 'Aries', color: '#c39b8f' },
                    { text: '阿鲁迪巴', value: 'Taurus', color: '#d770ad' },
                    { text: '撒加', value: 'Gemini', color: '#da4453' },
                    { text: '迪斯马斯克', value: 'Cancer', color: '#ff9800' },
                    { text: '艾欧里亚', value: 'Leo', color: '#f6bb42' },
                    { text: '沙加', value: 'Virgo', color: '#8cc152' },
                    { text: '童虎', value: 'Libra', color: '#37bc9b' },
                    { text: '米罗', value: 'Scorpion', color: '#3bafda' },
                    { text: '艾俄洛斯', value: 'Sagittarius', color: '#4a89dc' },
                    { text: '修罗', value: 'Capricorn', color: '#967adc' },
                    { text: '卡妙', value: 'Aquarius', color: '#434a54' },
                    { text: '阿布罗狄', value: 'Picses', color: '#aab2bd' },
                    { text: '星矢', value: 'Pegasus', color: '#007bff' },
                    { text: '紫龙', value: 'Dragon', color: '#28a745' },
                    { text: '冰河', value: 'Cygnus', color: '#17a2b8' },
                    { text: '瞬', value: 'Andromeda', color: '#dc3545' },
                    { text: '一辉', value: 'Phoenix', color: '#ffc107' },
                    { text: '雅典娜', value: 'Goddess', color: '#6c757d' }
                ]
            }
        ],
        toolbar: ['pdf'],
        views: [
            { type: 'day',
                selected: true,
                group: {
                    resources: ['saint'],
                    date: true
                },
                dateHeaderTemplate:
                    '# var lunar = lunarData.solar2lunar(date.getFullYear(), (date.getMonth() + 1), date.getDate()) #' +
                    '<strong>公历：#= kendo.toString(date, "yyyy年MM月dd日 dddd") # —— 农历：[#= lunar.zodiac #年] #= lunar.lunarMonthCn ##= lunar.lunarDayCn #（#= lunar.gzYear #年 #= lunar.gzMonth #月 #= lunar.gzDay #日）</strong>',
                allDaySlotTemplate: '<span class="d-block text-center">无</span>',
                eventTemplate: '<img class="img-s mt-1" src="#: avatar #" alt="#: ownerId #"><p class="mb-0 pl-2"><small>#: title #</small></p>'
            },
            { type: 'week',
                eventTemplate: '<img class="img-s mt-1 ml-2" src="#: avatar #" alt="#: ownerId #"><p class="mb-0 pl-2"><small>#: title #</small></p>'
            },
            { type: 'workWeek',
                eventTemplate: '<img class="img-s mt-1 ml-2" src="#: avatar #" alt="#: ownerId #"><p class="mb-0 pl-2"><small>#: title #</small></p>'
            },
            { type: 'month',
                eventHeight: 24,
                dayTemplate:
                    '# var lunar = lunarData.solar2lunar(date.getFullYear(), (date.getMonth() + 1), date.getDate()) #' +
                    '<div class="d-flex flex-column">' +
                        '<div>' +
                            '# if (lunar.lunarDay === 1) { #' +
                                '<span class="theme-s float-left">#= lunar.lunarMonthCn #</span>' +
                            '# } else { #' +
                                '<span class="float-left">#= lunar.lunarDayCn #</span>' +
                            '# } #' +
                            '<span class="lead float-right">#= kendo.toString(date, "dd") #</span>' +
                        '</div>' +
                        '# if (lunar.lunarFestival) { #' +
                            '<span class="festival text-left">#= lunar.lunarFestival #</span>' +
                        '# } #' +
                        '# if (lunar.solarFestival) { #' +
                            '<span class="festival text-left">#= lunar.solarFestival #</span>' +
                        '# } #' +
                        '# if (lunar.isTerm) { #' +
                            '<span class="theme-m text-left">#= lunar.term #</span>' +
                        '# } #' +
                    '</div>',
                eventTemplate: '<img class="img-s mr-2" src="#: avatar #" alt="#: ownerId #"><small>#: title #</small>'
            },
            { type: 'agenda',
                eventDateTemplate:
                    '# var lunar = lunarData.solar2lunar(date.getFullYear(), (date.getMonth() + 1), date.getDate()) #' +
                    '<strong class="k-scheduler-agendaday theme-m">#= kendo.toString(date, "dd") #</strong>' +
                    '<em class="k-scheduler-agendaweek">#= kendo.toString(date, "dddd") #</em>' +
                    '<span class="k-scheduler-agendadate">#= kendo.toString(date, "yyyy年MM月") #</span>' +
                    '<br><br>' +
                    '<span class="text-black-50">#= lunar.lunarMonthCn ##= lunar.lunarDayCn #</span>' +
                    '<br>' +
                    '# if (lunar.lunarFestival) { #' +
                        '<span class="festival">#= lunar.lunarFestival #</span>' +
                    '# } #' +
                    '# if (lunar.solarFestival) { #' +
                        '<span class="festival">#= lunar.solarFestival #</span>' +
                    '# } #' +
                    '# if (lunar.isTerm) { #' +
                        '<span class="theme-m">#= lunar.term #</span>' +
                    '# } #',
                eventTimeTemplate:
                    '# if (isAllDay) { #' +
                        '<span class="theme-m">全天</span>' +
                    '# } else { #' +
                        '#= kendo.toString(start, "HH:mm") # 至 #= kendo.toString(end, "HH:mm") #' +
                    '# } #',
                eventTemplate: '<img class="img-m ml-2 mr-3" src="#: avatar #" alt="#: ownerId #">#: title #'
            },
            { type: 'timeline',
                group: {
                    resources: ['saint'],
                    date: true,
                    orientation: 'vertical'
                },
                eventTemplate: '<img class="img-s mr-2" src="#: avatar #" alt="#: ownerId #"><small>#: title #</small>'
            },
            { type: 'timelineWeek',
                eventTemplate: '<img class="img-s mr-2" src="#: avatar #" alt="#: ownerId #"><small>#: title #</small>'
            },
            { type: 'timelineWorkWeek',
                eventTemplate: '<img class="img-s mr-2" src="#: avatar #" alt="#: ownerId #"><small>#: title #</small>'
            },
            { type: 'timelineMonth',
                columnWidth: 128,
                eventHeight: 50,
                group: {
                    resources: ['saint'],
                    orientation: 'vertical'
                },
                eventTemplate: '<img class="img-s mr-2" src="#: avatar #" alt="#: ownerId #"><small>#: title #</small>'
            }
        ],
        pdf: {
            fileName: 'Scheduler.pdf',
            creator: 'IKKI Studio',
            author: 'IKKI & Amikoko',
            title: '日程表展示',
            subject: '黄金十二宫',
            keywords: 'Gold Saint',
            landscape: true,
            avoidLinks: true
        },
        date: new Date('2019/8/15'),
        startTime: new Date('2019/8/15 00:00'),
        endTime: new Date('2019/8/15 24:00'),
        workDayStart: new Date('2019/8/15 11:00 AM'),
        workDayEnd: new Date('2019/8/15 11:00 PM'),
        selectable: true,
        showWorkHours: true,
        dateHeaderTemplate: '<strong>#= kendo.toString(date, "MM月dd日 dddd") #</strong>',
        groupHeaderTemplate: '<strong style="color: #= color #">#= text #</strong>',
        allDayEventTemplate: '<img class="img-s mt-1" src="#: avatar #" alt="#: ownerId #"><p class="mb-0 pl-2"><small>#: title #<br>#: description #</small></p>',
        majorTimeHeaderTemplate: '<strong>#= kendo.toString(date, "HH:mm") #</strong>',
        editable: {
            template: kendo.template($('#editTemplate').html())
        },
        edit: function (e) {
            // 开始时间
            $('#startEdit').kendoDateTimePicker({
                format: 'yyyy-MM-dd HH:mm'
            });
            // 结束时间
            $('#endEdit').kendoDateTimePicker({
                format: 'yyyy-MM-dd HH:mm'
            });
            // 重复
            $('#recurrenceRuleEdit').kendoDropDownList({
                dataSource: {
                    data: [
                        { text: '每天', value: 'FREQ=DAILY' },
                        { text: '每周', value: 'FREQ=WEEKLY' },
                        { text: '每月', value: 'FREQ=MONTHLY' },
                        { text: '每年', value: 'FREQ=YEARLY' }
                    ]
                },
                optionLabel: '从不',
                dataValueField: 'value',
                dataTextField: 'text'
            });
            // 圣斗士
            $('#ownerIdEdit').kendoDropDownList({
                dataSource: {
                    data: [
                        { text: '穆', value: 'Aries', url: 'img/temp/Aries.png', color: '#c39b8f' },
                        { text: '阿鲁迪巴', value: 'Taurus', url: 'img/temp/Taurus.png', color: '#d770ad' },
                        { text: '撒加', value: 'Gemini', url: 'img/temp/Gemini.png', color: '#da4453' },
                        { text: '迪斯马斯克', value: 'Cancer', url: 'img/temp/Cancer.png', color: '#ff9800' },
                        { text: '艾欧里亚', value: 'Leo', url: 'img/temp/Leo.png', color: '#f6bb42' },
                        { text: '沙加', value: 'Virgo', url: 'img/temp/Virgo.png', color: '#8cc152' },
                        { text: '童虎', value: 'Libra', url: 'img/temp/Libra.png', color: '#37bc9b' },
                        { text: '米罗', value: 'Scorpion', url: 'img/temp/Scorpion.png', color: '#3bafda' },
                        { text: '艾俄洛斯', value: 'Sagittarius', url: 'img/temp/Sagittarius.png', color: '#4a89dc' },
                        { text: '修罗', value: 'Capricorn', url: 'img/temp/Capricorn.png', color: '#967adc' },
                        { text: '卡妙', value: 'Aquarius', url: 'img/temp/Aquarius.png', color: '#434a54' },
                        { text: '阿布罗狄', value: 'Picses', url: 'img/temp/Picses.png', color: '#aab2bd' },
                        { text: '星矢', value: 'Pegasus', url: 'img/temp/Pegasus.png', color: '#007bff' },
                        { text: '紫龙', value: 'Dragon', url: 'img/temp/Dragon.png', color: '#28a745' },
                        { text: '冰河', value: 'Cygnus', url: 'img/temp/Cygnus.png', color: '#17a2b8' },
                        { text: '瞬', value: 'Andromeda', url: 'img/temp/Andromeda.png', color: '#dc3545' },
                        { text: '一辉', value: 'Phoenix', url: 'img/temp/Phoenix.png', color: '#ffc107' },
                        { text: '雅典娜', value: 'Goddess', url: 'img/temp/Goddess.png', color: '#6c757d' }
                    ]
                },
                dataValueField: 'value',
                dataTextField: 'text',
                height: 520,
                template: '<span class="dot-color" style="background: #: color #;"></span><img class="w-5 rounded-circle mx-2" src="#: url #" alt="#: value #">#: text #',
                valueTemplate: '<span class="dot-color" style="background: #: color #;"></span><img class="w-5 border rounded-circle mx-2" src="#: url #" alt="#: value #">#: text #'
            });
        },
        save: function (e) {
            e.event.set('avatar', 'img/temp/' + e.event.ownerId + '.png');
        }
    });
    // 联动显示
    $('#saint :checkbox').change(function (e) {
        var checked = $.map($('#saint :checked'), function (checkbox) {
            return $(checkbox).val();
        });
        $('#generalScheduler').data('kendoScheduler').dataSource.filter({
            logic: 'or',
            filters: $.map(checked, function (value) {
                return {
                    operator: 'eq',
                    field: 'ownerId',
                    value: value
                };
            })
        });
    });
});