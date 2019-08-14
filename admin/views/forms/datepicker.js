$(function () {
    // DOM 日期框
    $('#domDatePicker').kendoDatePicker();
    // 普通日期框
    $('#generalDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
        min: new Date(1949, 9, 1),
        max: new Date()
    });
    // 只读日期框
    $('#readonlyDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
        value: '1949-10-01'
    }).data('kendoDatePicker').readonly();
    // 禁用日期框
    $('#disabledDatePicker').kendoDatePicker().data('kendoDatePicker').enable(false);
    // 默认值日期框
    $('#defaultValueDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
        value: '1949-10-01'
    });
    // 星期数日期框
    $('#weekDatePicker').kendoDatePicker({
        weekNumber: true,
        format: 'yyyy-MM-dd dddd',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日 dddd") #',
        month: {
            weekNumber: '<small>#= data.weekNumber #周</small>'
        },
        value: '1949-10-01'
    });
    // 月份日期框
    $('#monthDatePicker').kendoDatePicker({
        start: 'year',
        depth: 'year',
        format: 'yyyy-MM',
        footer: '当月：#= kendo.toString(data, "yyyy年MM月") #',
        value: '1949-10'
    });
    // 年份日期框
    $('#yearDatePicker').kendoDatePicker({
        start: 'decade',
        depth: 'decade',
        format: 'yyyy',
        footer: '今年：#= kendo.toString(data, "yyyy年") #',
        value: '1949'
    });
    // 世纪日期框
    $('#centuryDatePicker').kendoDatePicker({
        start: 'century',
        depth: 'decade',
        format: 'yyyy 年',
        footer: '今年：#= kendo.toString(data, "yyyy年") #',
        value: '1949 年'
    });
    // 掩码日期框
    $('#maskedDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
        dateInput: true
    });
    // 屏蔽日期框
    $('#shieldDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
        disableDates: [
            'sa',
            'su'
        ]
    });
    // 格式转换日期框
    $('#parseDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
        parseFormats: [
            'M/d/yy',
            'M/d/yyyy',
            'MM/dd/yyyy',
            'yy.M.d',
            'yyyy.M.d',
            'yyyy.MM.dd',
            'yy年M月d日',
            'yyyy年M月d日',
            'yyyy年MM月dd日'
        ]
    });
    // 节假日日期框
    $('#holidayDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
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
        value: '1949-10-01'
    });
    // 农历日期框
    $('#lunarDatePicker').kendoDatePicker({
        format: 'yyyy-MM-dd',
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
        value: '1949-10-01'
    });
    // 等宽日期框
    $('#widthDatePicker').kendoDatePicker();
});