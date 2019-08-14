$(function () {
    // 普通多重日历
    $('#generalMultiViewCalendar').kendoMultiViewCalendar({
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
        disableDates: [
            'sa',
            'su'
        ],
        value: new Date()
    });
    // 星期多重日历
    $('#weekMultiViewCalendar').kendoMultiViewCalendar({
        weekNumber: true,
        footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日 dddd") #',
        month: {
            weekNumber: '<small>#= data.weekNumber #周</small>'
        },
        value: new Date()
    });
    // 月份多重日历
    $('#monthMultiViewCalendar').kendoMultiViewCalendar({
        start: 'year',
        depth: 'year',
        footer: '当月：#= kendo.toString(data, "yyyy年MM月") #',
        value: new Date()
    });
    // 年份多重日历
    $('#yearMultiViewCalendar').kendoMultiViewCalendar({
        start: 'decade',
        depth: 'decade',
        footer: '今年：#= kendo.toString(data, "yyyy年") #',
        value: new Date()
    });
    // 世纪多重日历
    $('#centuryMultiViewCalendar').kendoMultiViewCalendar({
        start: 'century',
        depth: 'decade',
        footer: '今年：#= kendo.toString(data, "yyyy年") #'
    });
    // 节假日多重日历
    $('#holidayMultiViewCalendar').kendoMultiViewCalendar({
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
        value: new Date()
    });
    // 农历多重日历
    $('#lunarMultiViewCalendar').kendoMultiViewCalendar({
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
        value: new Date()
    });
    // 自定义多重日历
    $('#customMultiViewCalendar').kendoMultiViewCalendar({
        views: 4,
        value: new Date()
    });
    // 中国年历多重日历
    $('#chinaMultiViewCalendar').kendoMultiViewCalendar({
        showViewHeader: true,
        footer: false,
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
        views: 12,
        min: new Date(2019, 0, 1),
        max: new Date(2019, 11, 31),
        value: new Date()
    });
});