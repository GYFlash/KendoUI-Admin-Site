$(function () {
    // DOM 日期范围框
    $('#domDateRangePicker').kendoDateRangePicker();
    // 普通日期范围框
    $('#generalDateRangePicker').kendoDateRangePicker({
        format: 'yyyy-MM-dd',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
        min: new Date(1949, 9, 1),
        max: new Date()
    });
    // 只读日期范围框
    $('#readonlyDateRangePicker').kendoDateRangePicker({
        format: 'yyyy-MM-dd',
        range: {
            start: '1949-10-01',
            end: '1949-10-07'
        }
    }).data('kendoDateRangePicker').readonly();
    // 禁用日期范围框
    $('#disabledDateRangePicker').kendoDateRangePicker().data('kendoDateRangePicker').enable(false);
    // 默认值日期范围框
    $('#defaultValueDateRangePicker').kendoDateRangePicker({
        format: 'yyyy-MM-dd',
        range: {
            start: new Date(1949, 9, 1),
            end: new Date(1949, 9, 7)
        }
    });
    // 星期数日期范围框
    $('#weekDateRangePicker').kendoDateRangePicker({
        weekNumber: true,
        format: 'yyyy-MM-dd dddd',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日 dddd") #',
        month: {
            weekNumber: '# if (data.weekNumber !== "&nbsp;") { #<small>#= data.weekNumber #周</small># } #'
        },
        range: {
            start: new Date(1949, 9, 1),
            end: new Date(1949, 9, 7)
        }
    });
    // 无标签日期范围框
    $('#noLabelDateRangePicker').kendoDateRangePicker({
        format: 'yyyy-MM-dd',
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
        labels: false
    });
    // 屏蔽日期范围框
    $('#shieldDateRangePicker').kendoDateRangePicker({
        format: 'yyyy-MM-dd',
        disableDates: [
            'sa',
            'su'
        ]
    });
    // 节假日日期范围框
    $('#holidayDateRangePicker').kendoDateRangePicker({
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
        range: {
            start: new Date(1949, 9, 1),
            end: new Date(1949, 9, 7)
        }
    });
    // 农历日期范围框
    $('#lunarDateRangePicker').kendoDateRangePicker({
        format: 'yyyy-MM-dd',
        footer:
            '# var lunar = lunarData.solar2lunar(data.getFullYear(), (data.getMonth() + 1), data.getDate()) #' +
            '今天：#= kendo.toString(data, "yyyy年MM月dd日 dddd") #' +
            '<span class="d-inline-block mx-3"></span>' +
            '农历：[#= lunar.zodiac #年] #= lunar.lunarMonthCn ##= lunar.lunarDayCn #（#= lunar.gzYear #年 #= lunar.gzMonth #月 #= lunar.gzDay #日）',
        month: {
            content:
                '# var lunar = lunarData.solar2lunar(data.date.getFullYear(), (data.date.getMonth() + 1), data.date.getDate()) #' +
                '<div class="d-flex flex-column">' +
                    '#= data.value #' +
                    '<div class="text-nowrap">' +
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
                    '</div>' +
                '</div>'
        },
        range: {
            start: new Date(1949, 9, 1),
            end: new Date(1949, 9, 7)
        }
    });
    // 等宽日期框
    $('#widthDateRangePicker').kendoDateRangePicker();
});