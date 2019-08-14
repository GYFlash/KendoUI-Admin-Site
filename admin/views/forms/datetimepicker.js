$(function () {
    // DOM 时日框
    $('#domDateTimePicker').kendoDateTimePicker();
    // 普通时日框
    $('#generalDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
        min: new Date(1949, 9, 1),
        max: new Date()
    });
    // 只读时日框
    $('#readonlyDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        value: '1949-10-01 19:00'
    }).data('kendoDateTimePicker').readonly();
    // 禁用时日框
    $('#disabledDateTimePicker').kendoDateTimePicker().data('kendoDateTimePicker').enable(false);
    // 默认值时日框
    $('#defaultValueDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        value: '1949-10-01 19:00'
    });
    // 星期数时日框
    $('#weekDateTimePicker').kendoDateTimePicker({
        weekNumber: true,
        format: 'yyyy-MM-dd dddd HH:mm',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日 dddd") #',
        month: {
            weekNumber: '<small>#= data.weekNumber #周</small>'
        },
        value: '1949-10-01 19:00'
    });
    // 月份时日框
    $('#monthDateTimePicker').kendoDateTimePicker({
        start: 'year',
        depth: 'year',
        format: 'yyyy-MM HH:mm',
        footer: '当月：#= kendo.toString(data, "yyyy年MM月") #',
        value: '1949-10 19:00'
    });
    // 年份时日框
    $('#yearDateTimePicker').kendoDateTimePicker({
        start: 'decade',
        depth: 'decade',
        format: 'yyyy HH:mm',
        footer: '今年：#= kendo.toString(data, "yyyy年") #',
        value: '1949 19:00'
    });
    // 世纪时日框
    $('#centuryDateTimePicker').kendoDateTimePicker({
        start: 'century',
        depth: 'decade',
        format: 'yyyy 年 HH:mm',
        footer: '今年：#= kendo.toString(data, "yyyy年") #',
        value: '1949 年 19:00'
    });
    // 十二小时时日框
    $('#ampmDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd hh:mm:ss tt',
        value: '1949-10-01 07:00:00 下午'
    });
    // 毫秒时日框
    $('#millisecondDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm:ss fff',
        value: '1949-10-01 19:00:00 000'
    });
    // 秒钟时日框
    $('#secondDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm:ss',
        value: '1949-10-01 19:00:00'
    });
    // 分钟时日框
    $('#minuteDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        value: '1949-10-01 19:00'
    });
    // 小时时日框
    $('#hourDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH 点',
        interval: 60,
        value: '1949-10-01 19 点'
    });
    // 掩码时日框
    $('#maskedDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm:ss',
        dateInput: true
    });
    // 屏蔽时日框
    $('#shieldDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        disableDates: [
            'sa',
            'su'
        ]
    });
    // 格式转换时日框
    $('#parseDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm:ss',
        parseFormats: [
            'M/d/yy h:m:s',
            'M/d/yy h:m:s tt',
            'M/d/yyyy hh:mm:ss',
            'M/d/yyyy hh:mm:ss tt',
            'MM/dd/yyyy H:m:s',
            'MM/dd/yyyy HH:mm:ss',
            'yy.M.d h.m.s',
            'yy.M.d h.m.s tt',
            'yyyy.M.d hh.mm.ss',
            'yyyy.M.d hh.mm.ss tt',
            'yyyy.MM.dd H.m.s',
            'yyyy.MM.dd HH.mm.ss',
            'yy年M月d日 h时m分s秒',
            'yy年M月d日 h时m分s秒 tt',
            'yyyy年M月d日 hh时mm分ss秒',
            'yyyy年M月d日 hh时mm分ss秒 tt',
            'yyyy年MM月dd日 H时m分s秒',
            'yyyy年MM月dd日 HH时mm分ss秒',
            'yy年M月d日 h点m分s秒',
            'yy年M月d日 h点m分s秒 tt',
            'yyyy年M月d日 hh点mm分ss秒',
            'yyyy年M月d日 hh点mm分ss秒 tt',
            'yyyy年MM月dd日 H点m分s秒',
            'yyyy年MM月dd日 HH点mm分ss秒'
        ]
    });
    // 自定义时间间隔时日框
    $('#intervalDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        interval: 15
    });
    // 节假日时日框
    $('#holidayDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        dates: [
            new Date(2000, 0, 1),
            new Date(2000, 1, 14),
            new Date(2000, 2, 5),
            new Date(2000, 2, 8),
            new Date(2000, 2, 12),
            new Date(2000, 2, 15),
            new Date(2000, 3, 1),
            new Date(2000, 4, 1),
            new Date(2000, 4, 4),
            new Date(2000, 5, 1),
            new Date(2000, 6, 1),
            new Date(2000, 6, 7),
            new Date(2000, 7, 1),
            new Date(2000, 7, 15),
            new Date(2000, 8, 3),
            new Date(2000, 8, 10),
            new Date(2000, 9, 1),
            new Date(2000, 10, 1),
            new Date(2000, 11, 13),
            new Date(2000, 11, 25),
            new Date(2000, 11, 26)
        ],
        month: {
            content: '#= data.value #<i class="#= isHoliday(data.date, data.dates) ? \'fas fa-star\' : \'\' #"></i>'
        },
        value: '1949-10-01 19:00'
    });
    // 农历时日框
    $('#lunarDateTimePicker').kendoDateTimePicker({
        format: 'yyyy-MM-dd HH:mm',
        footer:
            '# var lunar = lunarData.solar2lunar(data.getFullYear(), (data.getMonth() + 1), data.getDate()) #' +
            '今天：#= kendo.toString(data, "yyyy年MM月dd日 dddd") #<br>' +
            '农历：[#= lunar.zodiac #年] #= lunar.lunarMonthCn ##= lunar.lunarDayCn #（#= lunar.gzYear #年 #= lunar.gzMonth #月 #= lunar.gzDay #日）',
        month: {
            content:
                '# var lunar = lunarData.solar2lunar(data.date.getFullYear(), (data.date.getMonth() + 1), data.date.getDate()) #' +
                '<div class="d-flex flex-column">' +
                    '#= data.value #' +
                    '<small class="text-nowrap">' +
                    '# if (lunar.lunarFestival) { #' +
                        '<span class="festival rounded px-1">#= lunar.lunarFestival #</span>' +
                    '# } else if (lunar.solarFestival) { #' +
                        '<span class="festival rounded px-1">#= lunar.solarFestival #</span>' +
                    '# } else if (lunar.isTerm) { #' +
                        '<span class="theme-m-box rounded px-1">#= lunar.term #</span>' +
                    '# } else if (lunar.lunarDay === 1) { #' +
                        '<span class="theme-s-box rounded px-1">#= lunar.lunarMonthCn #</span>' +
                    '# } else { #' +
                        '#= lunar.lunarDayCn #' +
                    '# } #' +
                    '</small>' +
                '</div>'
        },
        min: '1900-01-01',
        value: '1949-10-01 19:00'
    });
    // 等宽时日框
    $('#widthDateTimePicker').kendoDateTimePicker();
});