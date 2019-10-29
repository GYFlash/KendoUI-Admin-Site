$(function () {
    // 整体框架布局
    $('input[name="edition"]').click(function () {
        if ($(this).prop('checked')) {
            location.href = path + webType + '/index_' + $(this).val() + '.html';
        }
    });
    // 主题配色
    $('#IKKIAmikoko').kendoChart({
        theme: 'sass',
        chartArea: {
            height: 300
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: 'donut'
        },
        series: [
            {
                name: 'accent',
                margin: 0,
                size: 72,
                holeSize: 5,
                data: [
                    {
                        category: '默认',
                        value: 1,
                        color: '#1890ff',
                        name: 'default',
                        accent: '#1890ff',
                        minor: '#69c0ff'
                    },
                    {
                        category: '褐色',
                        value: 1,
                        color: '#c39b8f',
                        name: 'brown',
                        accent: '#c39b8f',
                        minor: '#d9b6ac'
                    },
                    {
                        category: '桃色',
                        value: 1,
                        color: '#d770ad',
                        name: 'pink',
                        accent: '#d770ad',
                        minor: '#ec87c0'
                    },
                    {
                        category: '红色',
                        value: 1,
                        color: '#da4453',
                        name: 'red',
                        accent: '#da4453',
                        minor: '#ed5565'
                    },
                    {
                        category: '橙色',
                        value: 1,
                        color: '#ff9800',
                        name: 'orange',
                        accent: '#ff9800',
                        minor: '#ffb74d'
                    },
                    {
                        category: '黄色',
                        value: 1,
                        color: '#f6bb42',
                        name: 'yellow',
                        accent: '#f6bb42',
                        minor: '#ffce54'
                    },
                    {
                        category: '白色',
                        value: 1,
                        color: '#e6e9ed',
                        name: 'white',
                        accent: '#e6e9ed',
                        minor: '#f5f7fa'
                    },
                    {
                        category: '翠色',
                        value: 1,
                        color: '#8cc152',
                        name: 'grass',
                        accent: '#8cc152',
                        minor: '#a0d468'
                    },
                    {
                        category: '绿色',
                        value: 1,
                        color: '#37bc9b',
                        name: 'green',
                        accent: '#37bc9b',
                        minor: '#48cfad'
                    },
                    {
                        category: '青色',
                        value: 1,
                        color: '#3bafda',
                        name: 'cyan',
                        accent: '#3bafda',
                        minor: '#4fc1e9'
                    },
                    {
                        category: '蓝色',
                        value: 1,
                        color: '#4a89dc',
                        name: 'blue',
                        accent: '#4a89dc',
                        minor: '#5d9cec'
                    },
                    {
                        category: '紫色',
                        value: 1,
                        color: '#967adc',
                        name: 'purple',
                        accent: '#967adc',
                        minor: '#ac92ec'
                    },
                    {
                        category: '黑色',
                        value: 1,
                        color: '#434a54',
                        name: 'black',
                        accent: '#434a54',
                        minor: '#656d78'
                    },
                    {
                        category: '灰色',
                        value: 1,
                        color: '#aab2bd',
                        name: 'gray',
                        accent: '#aab2bd',
                        minor: '#ccd1d9'
                    }
                ]
            },
            {
                name: 'minor',
                size: 48,
                data: [
                    {
                        category: '默认',
                        value: 1,
                        color: '#69c0ff',
                        name: 'default',
                        accent: '#1890ff',
                        minor: '#69c0ff'
                    },
                    {
                        category: '褐色',
                        value: 1,
                        color: '#d9b6ac',
                        name: 'brown',
                        accent: '#c39b8f',
                        minor: '#d9b6ac'
                    },
                    {
                        category: '桃色',
                        value: 1,
                        color: '#ec87c0',
                        name: 'pink',
                        accent: '#d770ad',
                        minor: '#ec87c0'
                    },
                    {
                        category: '红色',
                        value: 1,
                        color: '#ed5565',
                        name: 'red',
                        accent: '#da4453',
                        minor: '#ed5565'
                    },
                    {
                        category: '橙色',
                        value: 1,
                        color: '#ffb74d',
                        name: 'orange',
                        accent: '#ff9800',
                        minor: '#ffb74d'
                    },
                    {
                        category: '黄色',
                        value: 1,
                        color: '#ffce54',
                        name: 'yellow',
                        accent: '#f6bb42',
                        minor: '#ffce54'
                    },
                    {
                        category: '白色',
                        value: 1,
                        color: '#f5f7fa',
                        name: 'white',
                        accent: '#e6e9ed',
                        minor: '#f5f7fa'
                    },
                    {
                        category: '翠色',
                        value: 1,
                        color: '#a0d468',
                        name: 'grass',
                        accent: '#8cc152',
                        minor: '#a0d468'
                    },
                    {
                        category: '绿色',
                        value: 1,
                        color: '#48cfad',
                        name: 'green',
                        accent: '#37bc9b',
                        minor: '#48cfad'
                    },
                    {
                        category: '青色',
                        value: 1,
                        color: '#4fc1e9',
                        name: 'cyan',
                        accent: '#3bafda',
                        minor: '#4fc1e9'
                    },
                    {
                        category: '蓝色',
                        value: 1,
                        color: '#5d9cec',
                        name: 'blue',
                        accent: '#4a89dc',
                        minor: '#5d9cec'
                    },
                    {
                        category: '紫色',
                        value: 1,
                        color: '#ac92ec',
                        name: 'purple',
                        accent: '#967adc',
                        minor: '#ac92ec'
                    },
                    {
                        category: '黑色',
                        value: 1,
                        color: '#656d78',
                        name: 'black',
                        accent: '#434a54',
                        minor: '#656d78'
                    },
                    {
                        category: '灰色',
                        value: 1,
                        color: '#ccd1d9',
                        name: 'gray',
                        accent: '#aab2bd',
                        minor: '#ccd1d9'
                    }
                ]
            }
        ],
        tooltip: {
            visible: true,
            template: '#= category #'
        },
        seriesClick: function (e) {
            changeColor(e.dataItem.name, e.dataItem.accent, e.dataItem.minor);
        }
    });
    $('#AntDesign').kendoChart({
        theme: 'sass',
        chartArea: {
            height: 300
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: 'donut'
        },
        series: [
            {
                name: 'accent',
                margin: 0,
                size: 72,
                holeSize: 5,
                data: [
                    {
                        category: '默认',
                        value: 1,
                        color: '#1890ff',
                        name: 'ant_default',
                        accent: '#1890ff',
                        minor: '#40a9ff'
                    },
                    {
                        category: '薄暮',
                        value: 1,
                        color: '#f5222d',
                        name: 'ant_red',
                        accent: '#f5222d',
                        minor: '#ff7875'
                    },
                    {
                        category: '火山',
                        value: 1,
                        color: '#fa541c',
                        name: 'ant_volcano',
                        accent: '#fa541c',
                        minor: '#ff9c6e'
                    },
                    {
                        category: '日暮',
                        value: 1,
                        color: '#fa8c16',
                        name: 'ant_orange',
                        accent: '#fa8c16',
                        minor: '#ffc069'
                    },
                    {
                        category: '金盏花',
                        value: 1,
                        color: '#faad14',
                        name: 'ant_gold',
                        accent: '#faad14',
                        minor: '#ffd666'
                    },
                    {
                        category: '日出',
                        value: 1,
                        color: '#fadb14',
                        name: 'ant_yellow',
                        accent: '#fadb14',
                        minor: '#fff566'
                    },
                    {
                        category: '青柠',
                        value: 1,
                        color: '#a0d911',
                        name: 'ant_lime',
                        accent: '#a0d911',
                        minor: '#d3f261'
                    },
                    {
                        category: '极光绿',
                        value: 1,
                        color: '#52c41a',
                        name: 'ant_green',
                        accent: '#52c41a',
                        minor: '#95de64'
                    },
                    {
                        category: '明青',
                        value: 1,
                        color: '#13c2c2',
                        name: 'ant_cyan',
                        accent: '#13c2c2',
                        minor: '#5cdbd3'
                    },
                    {
                        category: '拂晓蓝',
                        value: 1,
                        color: '#1890ff',
                        name: 'ant_blue',
                        accent: '#1890ff',
                        minor: '#69c0ff'
                    },
                    {
                        category: '极客蓝',
                        value: 1,
                        color: '#2f54eb',
                        name: 'ant_geekblue',
                        accent: '#2f54eb',
                        minor: '#85a5ff'
                    },
                    {
                        category: '酱紫',
                        value: 1,
                        color: '#722ed1',
                        name: 'ant_purple',
                        accent: '#722ed1',
                        minor: '#b37feb'
                    },
                    {
                        category: '法式洋红',
                        value: 1,
                        color: '#eb2f96',
                        name: 'ant_magenta',
                        accent: '#eb2f96',
                        minor: '#ff85c0'
                    }
                ]
            },
            {
                name: 'minor',
                size: 48,
                data: [
                    {
                        category: '默认',
                        value: 1,
                        color: '#40a9ff',
                        name: 'ant_default',
                        accent: '#1890ff',
                        minor: '#40a9ff'
                    },
                    {
                        category: '薄暮',
                        value: 1,
                        color: '#ff7875',
                        name: 'ant_red',
                        accent: '#f5222d',
                        minor: '#ff7875'
                    },
                    {
                        category: '火山',
                        value: 1,
                        color: '#ff9c6e',
                        name: 'ant_volcano',
                        accent: '#fa541c',
                        minor: '#ff9c6e'
                    },
                    {
                        category: '日暮',
                        value: 1,
                        color: '#ffc069',
                        name: 'ant_orange',
                        accent: '#fa8c16',
                        minor: '#ffc069'
                    },
                    {
                        category: '金盏花',
                        value: 1,
                        color: '#ffd666',
                        name: 'ant_gold',
                        accent: '#faad14',
                        minor: '#ffd666'
                    },
                    {
                        category: '日出',
                        value: 1,
                        color: '#fff566',
                        name: 'ant_yellow',
                        accent: '#fadb14',
                        minor: '#fff566'
                    },
                    {
                        category: '青柠',
                        value: 1,
                        color: '#d3f261',
                        name: 'ant_lime',
                        accent: '#a0d911',
                        minor: '#d3f261'
                    },
                    {
                        category: '极光绿',
                        value: 1,
                        color: '#95de64',
                        name: 'ant_green',
                        accent: '#52c41a',
                        minor: '#95de64'
                    },
                    {
                        category: '明青',
                        value: 1,
                        color: '#5cdbd3',
                        name: 'ant_cyan',
                        accent: '#13c2c2',
                        minor: '#5cdbd3'
                    },
                    {
                        category: '拂晓蓝',
                        value: 1,
                        color: '#69c0ff',
                        name: 'ant_blue',
                        accent: '#1890ff',
                        minor: '#69c0ff'
                    },
                    {
                        category: '极客蓝',
                        value: 1,
                        color: '#85a5ff',
                        name: 'ant_geekblue',
                        accent: '#2f54eb',
                        minor: '#85a5ff'
                    },
                    {
                        category: '酱紫',
                        value: 1,
                        color: '#b37feb',
                        name: 'ant_purple',
                        accent: '#722ed1',
                        minor: '#b37feb'
                    },
                    {
                        category: '法式洋红',
                        value: 1,
                        color: '#ff85c0',
                        name: 'ant_magenta',
                        accent: '#eb2f96',
                        minor: '#ff85c0'
                    }
                ]
            }
        ],
        tooltip: {
            visible: true,
            template: '#= category #'
        },
        seriesClick: function (e) {
            changeColor(e.dataItem.name, e.dataItem.accent, e.dataItem.minor);
        }
    });
    $('#MaterialDesign').kendoChart({
        theme: 'sass',
        chartArea: {
            height: 300
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: 'donut'
        },
        series: [
            {
                name: 'accent',
                margin: 0,
                size: 72,
                holeSize: 5,
                data: [
                    {
                        category: 'Default',
                        value: 1,
                        color: '#018786',
                        name: 'material_default',
                        accent: '#018786',
                        minor: '#79bcbc'
                    },
                    {
                        category: 'Red',
                        value: 1,
                        color: '#f44336',
                        name: 'material_red',
                        accent: '#f44336',
                        minor: '#e57373'
                    },
                    {
                        category: 'Pink',
                        value: 1,
                        color: '#e91e63',
                        name: 'material_pink',
                        accent: '#e91e63',
                        minor: '#f06292'
                    },
                    {
                        category: 'Purple',
                        value: 1,
                        color: '#9c27b0',
                        name: 'material_purple',
                        accent: '#9c27b0',
                        minor: '#ba68c8'
                    },
                    {
                        category: 'Deep Purple',
                        value: 1,
                        color: '#673ab7',
                        name: 'material_deep_purple',
                        accent: '#673ab7',
                        minor: '#9575cd'
                    },
                    {
                        category: 'Indigo',
                        value: 1,
                        color: '#3f51b5',
                        name: 'material_indigo',
                        accent: '#3f51b5',
                        minor: '#7986cb'
                    },
                    {
                        category: 'Blue',
                        value: 1,
                        color: '#2196f3',
                        name: 'material_blue',
                        accent: '#2196f3',
                        minor: '#64b5f6'
                    },
                    {
                        category: 'Light Blue',
                        value: 1,
                        color: '#03a9f4',
                        name: 'material_light_blue',
                        accent: '#03a9f4',
                        minor: '#4fc3f7'
                    },
                    {
                        category: 'Cyan',
                        value: 1,
                        color: '#00bcd4',
                        name: 'material_cyan',
                        accent: '#00bcd4',
                        minor: '#4dd0e1'
                    },
                    {
                        category: 'Teal',
                        value: 1,
                        color: '#009688',
                        name: 'material_teal',
                        accent: '#009688',
                        minor: '#4db6ac'
                    },
                    {
                        category: 'Green',
                        value: 1,
                        color: '#4caf50',
                        name: 'material_green',
                        accent: '#4caf50',
                        minor: '#81c784'
                    },
                    {
                        category: 'Light Green',
                        value: 1,
                        color: '#8bc34a',
                        name: 'material_light_green',
                        accent: '#8bc34a',
                        minor: '#aed581'
                    },
                    {
                        category: 'Lime',
                        value: 1,
                        color: '#cddc39',
                        name: 'material_lime',
                        accent: '#cddc39',
                        minor: '#dce775'
                    },
                    {
                        category: 'Yellow',
                        value: 1,
                        color: '#ffeb3b',
                        name: 'material_yellow',
                        accent: '#ffeb3b',
                        minor: '#fff176'
                    },
                    {
                        category: 'Amber',
                        value: 1,
                        color: '#ffc107',
                        name: 'material_amber',
                        accent: '#ffc107',
                        minor: '#ffd54f'
                    },
                    {
                        category: 'Orange',
                        value: 1,
                        color: '#ff9800',
                        name: 'material_orange',
                        accent: '#ff9800',
                        minor: '#ffb74d'
                    },
                    {
                        category: 'Deep Orange',
                        value: 1,
                        color: '#ff5722',
                        name: 'material_deep_orange',
                        accent: '#ff5722',
                        minor: '#ff8a65'
                    },
                    {
                        category: 'Brown',
                        value: 1,
                        color: '#795548',
                        name: 'material_brown',
                        accent: '#795548',
                        minor: '#a1887f'
                    },
                    {
                        category: 'Grey',
                        value: 1,
                        color: '#9e9e9e',
                        name: 'material_grey',
                        accent: '#9e9e9e',
                        minor: '#e0e0e0'
                    },
                    {
                        category: 'Blue Grey',
                        value: 1,
                        color: '#607d8b',
                        name: 'material_blue_grey',
                        accent: '#607d8b',
                        minor: '#90a4ae'
                    }
                ]
            },
            {
                name: 'minor',
                size: 48,
                data: [
                    {
                        category: 'Default',
                        value: 1,
                        color: '#79bcbc',
                        name: 'material_default',
                        accent: '#018786',
                        minor: '#79bcbc'
                    },
                    {
                        category: 'Red',
                        value: 1,
                        color: '#e57373',
                        name: 'material_red',
                        accent: '#f44336',
                        minor: '#e57373'
                    },
                    {
                        category: 'Pink',
                        value: 1,
                        color: '#f06292',
                        name: 'material_pink',
                        accent: '#e91e63',
                        minor: '#f06292'
                    },
                    {
                        category: 'Purple',
                        value: 1,
                        color: '#ba68c8',
                        name: 'material_purple',
                        accent: '#9c27b0',
                        minor: '#ba68c8'
                    },
                    {
                        category: 'Deep Purple',
                        value: 1,
                        color: '#9575cd',
                        name: 'material_deep_purple',
                        accent: '#673ab7',
                        minor: '#9575cd'
                    },
                    {
                        category: 'Indigo',
                        value: 1,
                        color: '#7986cb',
                        name: 'material_indigo',
                        accent: '#3f51b5',
                        minor: '#7986cb'
                    },
                    {
                        category: 'Blue',
                        value: 1,
                        color: '#64b5f6',
                        name: 'material_blue',
                        accent: '#2196f3',
                        minor: '#64b5f6'
                    },
                    {
                        category: 'Light Blue',
                        value: 1,
                        color: '#4fc3f7',
                        name: 'material_light_blue',
                        accent: '#03a9f4',
                        minor: '#4fc3f7'
                    },
                    {
                        category: 'Cyan',
                        value: 1,
                        color: '#4dd0e1',
                        name: 'material_cyan',
                        accent: '#00bcd4',
                        minor: '#4dd0e1'
                    },
                    {
                        category: 'Teal',
                        value: 1,
                        color: '#4db6ac',
                        name: 'material_teal',
                        accent: '#009688',
                        minor: '#4db6ac'
                    },
                    {
                        category: 'Green',
                        value: 1,
                        color: '#81c784',
                        name: 'material_green',
                        accent: '#4caf50',
                        minor: '#81c784'
                    },
                    {
                        category: 'Light Green',
                        value: 1,
                        color: '#aed581',
                        name: 'material_light_green',
                        accent: '#8bc34a',
                        minor: '#aed581'
                    },
                    {
                        category: 'Lime',
                        value: 1,
                        color: '#dce775',
                        name: 'material_lime',
                        accent: '#cddc39',
                        minor: '#dce775'
                    },
                    {
                        category: 'Yellow',
                        value: 1,
                        color: '#fff176',
                        name: 'material_yellow',
                        accent: '#ffeb3b',
                        minor: '#fff176'
                    },
                    {
                        category: 'Amber',
                        value: 1,
                        color: '#ffd54f',
                        name: 'material_amber',
                        accent: '#ffc107',
                        minor: '#ffd54f'
                    },
                    {
                        category: 'Orange',
                        value: 1,
                        color: '#ffb74d',
                        name: 'material_orange',
                        accent: '#ff9800',
                        minor: '#ffb74d'
                    },
                    {
                        category: 'Deep Orange',
                        value: 1,
                        color: '#ff8a65',
                        name: 'material_deep_orange',
                        accent: '#ff5722',
                        minor: '#ff8a65'
                    },
                    {
                        category: 'Brown',
                        value: 1,
                        color: '#a1887f',
                        name: 'material_brown',
                        accent: '#795548',
                        minor: '#a1887f'
                    },
                    {
                        category: 'Grey',
                        value: 1,
                        color: '#e0e0e0',
                        name: 'material_grey',
                        accent: '#9e9e9e',
                        minor: '#e0e0e0'
                    },
                    {
                        category: 'Blue Grey',
                        value: 1,
                        color: '#90a4ae',
                        name: 'material_blue_grey',
                        accent: '#607d8b',
                        minor: '#90a4ae'
                    }
                ]
            }
        ],
        tooltip: {
            visible: true,
            template: '#= category #'
        },
        seriesClick: function (e) {
            changeColor(e.dataItem.name, e.dataItem.accent, e.dataItem.minor);
        }
    });
    $('#KendoUI').kendoChart({
        theme: 'sass',
        chartArea: {
            height: 300
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: 'donut'
        },
        series: [
            {
                name: 'accent',
                margin: 0,
                size: 72,
                holeSize: 5,
                data: [
                    {
                        category: 'Default',
                        value: 1,
                        color: '#f35800',
                        name: 'kendo_ui_default',
                        accent: '#f35800',
                        minor: '#f0713a'
                    },
                    {
                        category: 'Default v2',
                        value: 1,
                        color: '#ff6358',
                        name: 'kendo_ui_default_v2',
                        accent: '#ff6358',
                        minor: '#eb5b51'
                    },
                    {
                        category: 'Default Blue',
                        value: 1,
                        color: '#23bde0',
                        name: 'kendo_ui_default_blue',
                        accent: '#23bde0',
                        minor: '#21b0d0'
                    },
                    {
                        category: 'Default Green',
                        value: 1,
                        color: '#53b827',
                        name: 'kendo_ui_default_green',
                        accent: '#53b827',
                        minor: '#4ca924'
                    },
                    {
                        category: 'Default Orange',
                        value: 1,
                        color: '#ff9411',
                        name: 'kendo_ui_default_orange',
                        accent: '#ff9411',
                        minor: '#eb8810'
                    },
                    {
                        category: 'Default Purple',
                        value: 1,
                        color: '#bf70cc',
                        name: 'kendo_ui_default_purple',
                        accent: '#bf70cc',
                        minor: '#b067bc'
                    },
                    {
                        category: 'Default Turquoise',
                        value: 1,
                        color: '#28bfba',
                        name: 'kendo_ui_default_turquoise',
                        accent: '#28bfba',
                        minor: '#25b0ab'
                    },
                    {
                        category: 'Bootstrap v4',
                        value: 1,
                        color: '#007bff',
                        name: 'kendo_ui_bootstrap_v4',
                        accent: '#007bff',
                        minor: '#52b1ff'
                    }
                ]
            },
            {
                name: 'minor',
                size: 48,
                data: [
                    {
                        category: 'Default',
                        value: 1,
                        color: '#f0713a',
                        name: 'kendo_ui_default',
                        accent: '#f35800',
                        minor: '#f0713a'
                    },
                    {
                        category: 'Default v2',
                        value: 1,
                        color: '#eb5b51',
                        name: 'kendo_ui_default_v2',
                        accent: '#ff6358',
                        minor: '#eb5b51'
                    },
                    {
                        category: 'Default Blue',
                        value: 1,
                        color: '#21b0d0',
                        name: 'kendo_ui_default_blue',
                        accent: '#23bde0',
                        minor: '#21b0d0'
                    },
                    {
                        category: 'Default Green',
                        value: 1,
                        color: '#4ca924',
                        name: 'kendo_ui_default_green',
                        accent: '#53b827',
                        minor: '#4ca924'
                    },
                    {
                        category: 'Default Orange',
                        value: 1,
                        color: '#eb8810',
                        name: 'kendo_ui_default_orange',
                        accent: '#ff9411',
                        minor: '#eb8810'
                    },
                    {
                        category: 'Default Purple',
                        value: 1,
                        color: '#b067bc',
                        name: 'kendo_ui_default_purple',
                        accent: '#bf70cc',
                        minor: '#b067bc'
                    },
                    {
                        category: 'Default Turquoise',
                        value: 1,
                        color: '#25b0ab',
                        name: 'kendo_ui_default_turquoise',
                        accent: '#28bfba',
                        minor: '#25b0ab'
                    },
                    {
                        category: 'Bootstrap v4',
                        value: 1,
                        color: '#52b1ff',
                        name: 'kendo_ui_bootstrap_v4',
                        accent: '#007bff',
                        minor: '#52b1ff'
                    }
                ]
            }
        ],
        tooltip: {
            visible: true,
            template: '#= category #'
        },
        seriesClick: function (e) {
            changeColor(e.dataItem.name, e.dataItem.accent, e.dataItem.minor);
        }
    });
    $('#Bootstrap').kendoChart({
        theme: 'sass',
        chartArea: {
            height: 300
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: 'donut'
        },
        series: [
            {
                name: 'accent',
                margin: 0,
                size: 72,
                holeSize: 5,
                data: [
                    {
                        category: 'Bootstrap Blue',
                        value: 1,
                        color: '#007bff',
                        name: 'bootstrap_blue',
                        accent: '#007bff',
                        minor: '#52b1ff'
                    },
                    {
                        category: 'Bootstrap Indigo',
                        value: 1,
                        color: '#6610f2',
                        name: 'bootstrap_indigo',
                        accent: '#6610f2',
                        minor: '#a963ff'
                    },
                    {
                        category: 'Bootstrap Purple',
                        value: 1,
                        color: '#6f42c1',
                        name: 'bootstrap_purple',
                        accent: '#6f42c1',
                        minor: '#b091db'
                    },
                    {
                        category: 'Bootstrap Pink',
                        value: 1,
                        color: '#e83e8c',
                        name: 'bootstrap_pink',
                        accent: '#e83e8c',
                        minor: '#ff96c0'
                    },
                    {
                        category: 'Bootstrap Red',
                        value: 1,
                        color: '#dc3545',
                        name: 'bootstrap_red',
                        accent: '#dc3545',
                        minor: '#f5898d'
                    },
                    {
                        category: 'Bootstrap Orange',
                        value: 1,
                        color: '#fd7e14',
                        name: 'bootstrap_orange',
                        accent: '#fd7e14',
                        minor: '#ffb566'
                    },
                    {
                        category: 'Bootstrap Yellow',
                        value: 1,
                        color: '#ffc107',
                        name: 'bootstrap_yellow',
                        accent: '#ffc107',
                        minor: '#ffe159'
                    },
                    {
                        category: 'Bootstrap Green',
                        value: 1,
                        color: '#28a745',
                        name: 'bootstrap_green',
                        accent: '#28a745',
                        minor: '#6bbf79'
                    },
                    {
                        category: 'Bootstrap Teal',
                        value: 1,
                        color: '#20c997',
                        name: 'bootstrap_teal',
                        accent: '#20c997',
                        minor: '#6de3b8'
                    },
                    {
                        category: 'Bootstrap Cyan',
                        value: 1,
                        color: '#17a2b8',
                        name: 'bootstrap_cyan',
                        accent: '#17a2b8',
                        minor: '#5cc9d1'
                    }
                ]
            },
            {
                name: 'minor',
                size: 48,
                data: [
                    {
                        category: 'Bootstrap Blue',
                        value: 1,
                        color: '#52b1ff',
                        name: 'bootstrap_blue',
                        accent: '#007bff',
                        minor: '#52b1ff'
                    },
                    {
                        category: 'Bootstrap Indigo',
                        value: 1,
                        color: '#a963ff',
                        name: 'bootstrap_indigo',
                        accent: '#6610f2',
                        minor: '#a963ff'
                    },
                    {
                        category: 'Bootstrap Purple',
                        value: 1,
                        color: '#b091db',
                        name: 'bootstrap_purple',
                        accent: '#6f42c1',
                        minor: '#b091db'
                    },
                    {
                        category: 'Bootstrap Pink',
                        value: 1,
                        color: '#ff96c0',
                        name: 'bootstrap_pink',
                        accent: '#e83e8c',
                        minor: '#ff96c0'
                    },
                    {
                        category: 'Bootstrap Red',
                        value: 1,
                        color: '#f5898d',
                        name: 'bootstrap_red',
                        accent: '#dc3545',
                        minor: '#f5898d'
                    },
                    {
                        category: 'Bootstrap Orange',
                        value: 1,
                        color: '#ffb566',
                        name: 'bootstrap_orange',
                        accent: '#fd7e14',
                        minor: '#ffb566'
                    },
                    {
                        category: 'Bootstrap Yellow',
                        value: 1,
                        color: '#ffe159',
                        name: 'bootstrap_yellow',
                        accent: '#ffc107',
                        minor: '#ffe159'
                    },
                    {
                        category: 'Bootstrap Green',
                        value: 1,
                        color: '#6bbf79',
                        name: 'bootstrap_green',
                        accent: '#28a745',
                        minor: '#6bbf79'
                    },
                    {
                        category: 'Bootstrap Teal',
                        value: 1,
                        color: '#6de3b8',
                        name: 'bootstrap_teal',
                        accent: '#20c997',
                        minor: '#6de3b8'
                    },
                    {
                        category: 'Bootstrap Cyan',
                        value: 1,
                        color: '#5cc9d1',
                        name: 'bootstrap_cyan',
                        accent: '#17a2b8',
                        minor: '#5cc9d1'
                    }
                ]
            }
        ],
        tooltip: {
            visible: true,
            template: '#= category #'
        },
        seriesClick: function (e) {
            changeColor(e.dataItem.name, e.dataItem.accent, e.dataItem.minor);
        }
    });
    // 组件语言
    $.each($('input[name="language"]'), function (i, items) {
        if ($(items).val() === localStorage.getItem('culture')) {
            $(items).next().find('span').addClass('font-weight-bold theme-m');
        } else {
            $(items).next().find('span').removeClass();
        }
    });
    $('input[name="language"]').click(function () {
        if ($(this).prop('checked')) {
            changeLang($(this).val());
        }
    });
});