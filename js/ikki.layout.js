/*!
 * Kendo UI Admin v1.0.0 by IKKI & Amikoko - https://ikki2000.github.io/
 * Copyright 2018-2019 IKKI Studio
 * Released under the MIT License - https://ikki2000.github.io/KendoUI-Admin-Site/LICENSE
 */

/* JS for Layout | Written by IKKI | 2018-02-03 */

// 配置路径
var path = $('base').attr('href'),
    webType = $('base').attr('type'),
    accentColor,
    minorColor,
    tokenUrl = 'json/logout.json',
    navUrl = 'json/nav.json',
    menuUrl = 'json/menu.json';

/* 初始化 ****************************************************************************/
$(function () {
    // 配色
    if (localStorage.hasOwnProperty('colorName')) {
        accentColor = localStorage.getItem('accentColor');
        minorColor = localStorage.getItem('minorColor');
        changeColor(localStorage.getItem('colorName'), accentColor, minorColor);
    } else {
        accentColor = '#1890ff';
        minorColor = '#69c0ff';
        changeColor('default', accentColor, minorColor);
    }
    // 语言
    kendo.culture('zh-CN');
    // 左侧导航数据获取
    $.fn.ajaxPost({
        ajaxUrl: navUrl,
        succeed: function (res) {
            $('#navPanelBar').kendoPanelBar({
                dataSource: res.data,
                loadOnDemand: false
            });
            $('#navMenu').kendoMenu({
                orientation: 'vertical',
                dataSource: res.data
            });
        }
    });
    // 顶部菜单数据获取
    $.fn.ajaxPost({
        ajaxUrl: menuUrl,
        succeed: function (res) {
            $('#menuV').kendoMenu({
                orientation: 'vertical',
                dataSource: res.data,
                dataBound: function () {
                    globalSearch();
                }
            });
            $('#menuH').kendoMenu({
                dataSource: res.data,
                dataBound: function () {
                    globalSearch();
                }
            });
        }
    });
    // 面包屑导航
    setTimeout(function () {
        showPath(location.hash.split('#')[1].split('/')[location.hash.split('#')[1].split('/').length - 1]);
        $(window).resize(function () {
            showPath(location.hash.split('#')[1].split('/')[location.hash.split('#')[1].split('/').length - 1]);
        }).resize();
    }, 200);
    // 刷新接管
    document.onkeydown = function () {
        var e = window.event || arguments[0];
        // 屏蔽 F5 和 Ctrl + F5
        if (e.keyCode === 116 || ((e.ctrlKey) && (e.keyCode === 116))) {
            refresh();
            return false;
        }
    };
    // 全屏
    $('#header').on('click', '.fullscreen', function () {
        var fullscreenEnabled = document.fullscreenEnabled       ||
                                document.webkitFullscreenEnabled ||
                                document.mozFullScreenEnabled    ||
                                document.msFullscreenEnabled;
        if (fullscreenEnabled) {
            var isFullscreen = document.fullscreenElement        ||
                               document.webkitFullscreenElement  ||
                               document.mozFullScreenElement     ||
                               document.msFullscreenElement;
            if (isFullscreen) {
                exitFullscreen();
                $(this).find('.fa-compress').addClass('fa-expand').removeClass('fa-compress');
            } else {
                enterFullscreen();
                $(this).find('.fa-expand').addClass('fa-compress').removeClass('fa-expand');
            }
        } else {
            alertMsg('当前浏览器不支持全屏！', 'error');
        }
    });
    // 回车解锁
    $('body').on('keyup', '#locking input', function (event) {
        if(event.keyCode === 13){
            unlockScreen();
        }
    });
    // 聊天机器人
    $('body').append('<button class="k-button k-state-selected" id="bot"><label for="botCkb"><i class="fas fa-robot"></i></label></button><input id="botCkb" type="checkbox"><label for="botCkb"><span id="botMask"></span></label><div id="botChat"></div>');
    tipMsg($('#bot'), '聊天机器人', 'left');
    $('#botChat').kendoChat({
        user: {
            name: 'IKKI',
            iconUrl: 'img/IKKI.png'
        },
        post: function (e) {
            $.ajax({
                type: 'post',
                data: JSON.stringify({
                    perception: {
                        inputText: {
                            text: e.text
                        }
                    },
                    userInfo: {
                        apiKey: '73e3544b57fb47e3a2545ea0b47dc474', // 请替换成自己的 Key
                        userId: 'demo'
                    }
                }),
                url: 'http://openapi.tuling123.com/openapi/api/v2',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                success: function (res) {
                    $.each(res.results, function (i, items) {
                        if (items.resultType === 'text') {
                            $('#botChat').data('kendoChat').renderMessage(
                                {
                                    type: 'text',
                                    text: res.results[i].values.text
                                },
                                {
                                    id: kendo.guid(),
                                    name: '🌸小艾',
                                    iconUrl: 'img/temp/Esmerarda.png'
                                }
                            );
                        } else if (items.resultType === 'url') {
                            var urlTemp = kendo.template(
                                '<div class="card mt-3">' +
                                    '<div class="card-body">' +
                                        '<a class="card-link" href="#: url #" target="_blank">#: url #</a>' +
                                    '</div>' +
                                '</div>'
                            );
                            kendo.chat.registerTemplate('url_card', urlTemp);
                            $('#botChat').data('kendoChat').renderAttachments(
                                {
                                    attachments: [{
                                        contentType: 'url_card',
                                        content: {
                                            url: res.results[i].values.url
                                        }
                                    }],
                                    attachmentLayout: 'list'
                                },
                                {
                                    id: kendo.guid(),
                                    name: '🌸小艾',
                                    iconUrl: 'img/temp/Esmerarda.png'
                                }
                            );
                        } else if (items.resultType === 'image') {
                            var imageTemp = kendo.template(
                                '<div class="text-center mt-3">' +
                                    '<img class="img-thumbnail img-fluid" src="#: image #" alt="">' +
                                '</div>'
                            );
                            kendo.chat.registerTemplate('image_card', imageTemp);
                            $('#botChat').data('kendoChat').renderAttachments(
                                {
                                    attachments: [{
                                        contentType: 'image_card',
                                        content: {
                                            image: res.results[i].values.image
                                        }
                                    }],
                                    attachmentLayout: 'list'
                                },
                                {
                                    id: kendo.guid(),
                                    name: '🌸小艾',
                                    iconUrl: 'img/temp/Esmerarda.png'
                                }
                            );
                        }
                    });
                }
            });
        }
    }).data('kendoChat').renderMessage(
        {
            type: 'text',
            text: '亲~ 由于GitHub和码云使用的是HTTPS协议~ 而图灵机器人使用的是HTTP协议~ 所以想看对话效果的亲们请部署到本地开启Chrome跨域模式调试~ 谢谢~ ❤️'
        },
        {
            id: kendo.guid(),
            name: '🌸小艾',
            iconUrl: 'img/temp/Esmerarda.png'
        }
    );
    // 天气预报
    $('body').append('<button class="k-button k-state-selected" id="weather" onclick="getWeather();"><i class="wi wi-na"></i></button>');
    tipMsg($('#weather'), '天气预报', 'left');
    $.ajax({
        type: 'get',
        data: {
            version: 'v6'
        },
        url: 'https://www.tianqiapi.com/api/',
        dataType: 'json',
        success: function (res) {
            var weatherImg = res.wea_img,
                weatherTime = res.update_time.substr(0, 2);
            if (weatherTime >= 6 && weatherTime < 18) {
                if (weatherImg === 'qing') {
                    $('#weather').html('<i class="fas fa-sun"></i>');
                } else if (weatherImg === 'yun') {
                    $('#weather').html('<i class="fas fa-cloud-sun"></i>');
                } else if (weatherImg === 'yin') {
                    $('#weather').html('<i class="fas fa-cloud"></i>');
                } else if (weatherImg === 'yu') {
                    $('#weather').html('<i class="fas fa-cloud-sun-rain"></i>');
                } else if (weatherImg === 'lei') {
                    $('#weather').html('<i class="fas fa-bolt"></i>');
                } else if (weatherImg === 'bingbao') {
                    $('#weather').html('<i class="fas fa-cloud-meatball"></i>');
                } else if (weatherImg === 'xue') {
                    $('#weather').html('<i class="fas fa-snowflake"></i>');
                } else if (weatherImg === 'wu') {
                    $('#weather').html('<i class="fas fa-smog"></i>');
                } else if (weatherImg === 'shachen') {
                    $('#weather').html('<i class="fas fa-wind"></i>');
                } else {
                    $('#weather').html('<i class="wi wi-na"></i>');
                }
            } else {
                if (weatherImg === 'qing') {
                    $('#weather').html('<i class="fas fa-moon"></i>');
                } else if (weatherImg === 'yun') {
                    $('#weather').html('<i class="fas fa-cloud-moon"></i>');
                } else if (weatherImg === 'yin') {
                    $('#weather').html('<i class="fas fa-cloud"></i>');
                } else if (weatherImg === 'yu') {
                    $('#weather').html('<i class="fas fa-cloud-moon-rain"></i>');
                } else if (weatherImg === 'lei') {
                    $('#weather').html('<i class="fas fa-bolt"></i>');
                } else if (weatherImg === 'bingbao') {
                    $('#weather').html('<i class="fas fa-cloud-meatball"></i>');
                } else if (weatherImg === 'xue') {
                    $('#weather').html('<i class="fas fa-snowflake"></i>');
                } else if (weatherImg === 'wu') {
                    $('#weather').html('<i class="fas fa-smog"></i>');
                } else if (weatherImg === 'shachen') {
                    $('#weather').html('<i class="fas fa-wind"></i>');
                } else {
                    $('#weather').html('<i class="wi wi-na"></i>');
                }
            }
        },
        error: function (res) {
            alertMsg('获取天气数据出错！', 'error');
        }
    });
    // 万年历
    $('body').append('<button class="k-button k-state-selected" id="lunar" onclick="getLunar();"><i class="fas fa-calendar-alt"></i></button>');
    tipMsg($('#lunar'), '万年历', 'left');
    // 便签
    $('body').append('<button class="k-button k-state-selected" id="note" onclick="getNote();"><i class="fas fa-sticky-note"></i></button>');
    tipMsg($('#note'), '便签', 'left');
    // 回到顶部
    $('#section').append('<button class="k-button k-state-selected" id="goTop"><i class="fas fa-arrow-up"></i></button>').scroll(function () {
        if ($(this).scrollTop() > 800) {
            $('#goTop').fadeIn();
        } else {
            $('#goTop').fadeOut();
        }
    });
    tipMsg($('#goTop'), '回到顶部', 'left');
    $('#goTop').click(function () {
        $('#section').animate({ scrollTop: 0 }, 500);
    });
});

// 发送 Token 验证
function tokenAuth() {
    $.fn.ajaxPost({
        ajaxAsync: false,
        ajaxData: {
            userId: sessionStorage.getItem('userId')
        },
        ajaxUrl: tokenUrl,
        succeed: function (res) {
            if (sessionStorage.getItem('locked')) {
                lockScreen();
            }
        },
        failed: function (res) {
            logout();
        }
    });
}

// 面包屑导航
function showPath(hash) {
    $('#path').html('');
    $.each($('#navPanelBar, #menuH, #menuV').find('.links-'+ hash).children('.k-link').parents('.k-item'), function (i, doms) {
        $('#path').prepend('<span><i class="fas fa-angle-double-right"></i>' + $(doms).children('.k-link').html() + '</span>');
    });
    if (hash === 'search') {
        $('#path').prepend('<span><i class="fas fa-angle-double-right"></i><i class="fas fa-search"></i>搜索结果<small>Search Result</small></span>');
    }
    if (hash === '404') {
        $('#path').prepend('<span><i class="fas fa-angle-double-right"></i><i class="fas fa-info-circle"></i>404<small>Error</small></span>');
    }
    var homePath = '';
    if ($('iframe').length === 1) {
        homePath = 'javascript:linkTo(\'/\', \'home\');';
    } else {
        homePath = webType + '/#/home';
    }
    $('#path').prepend('<a href="' + homePath + '"><i class="fas fa-home"></i>首页<span><small>Home</small></span></a>');
    // 展开导航并定位
    if ($('#navPanelBar').data('kendoPanelBar')) {
        $('#navPanelBar .k-link').removeClass('k-state-selected');
        $('#navPanelBar').data('kendoPanelBar').expand($('.links-'+ hash).parents('.k-group').parent());
        $('.links-'+ hash).find('a.k-link').addClass('k-state-selected');
    }
    // 判断面包屑长度
    if ($(window).width() > 767) {
        $('#menuH').show();
        $('#header > label[for="menuCkb"], #menuV').hide();
        if ($('#header > label[for="navCkb"]').width() + $('#path').width() + $('#menuH').width() > $('#header').width()) {
            $('#header > label[for="menuCkb"], #menuV').show();
            $('#menuH').hide();
        }
        if ($('#header > label[for="navCkb"]').width() + $('#path').width() > $('#header').width() - $('#header > label[for="menuCkb"]').width()) {
            $('#path').html('<a href="' + homePath + '"><i class="fas fa-home"></i>首页<span><small>Home</small></span></a>');
        }
    }
}

// 全局搜索
function globalSearch() {
    $('#globalSearch:visible').kendoComboBox({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxUrl: 'json/search.json',
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
                data: 'data'
            },
            group: {
                field: 'group',
                dir: 'desc'
            }
        },
        dataValueField: 'value',
        dataTextField: 'text',
        height: 300,
        filter: 'contains',
        delay: 300,
        minLength: 2,
        fixedGroupTemplate: '<div class="text-center theme-m-bg">当前：<i class="fas fa-folder-open mr-2"></i>#: data #</div>',
        groupTemplate: '#: data #',
        template: '<i class="#: icon #"></i>#: text #<small>#: small #</small>',
        footerTemplate: '<div class="p-1 text-center theme-s-bg"><small>-= 已找到<strong class="mx-1">#: instance.dataSource.total() #</strong>项 =-</small></div>',
        dataBound: function (e) {
            if ($(e.sender.wrapper).find('.fa-search').length < 1) {
                $(e.sender.wrapper).find('.k-dropdown-wrap').prepend('<i class="fas fa-search theme-m"></i>');
            }
        },
        change: function (e) {
            if (e.sender._old !== '') {
                if (e.sender._oldIndex !== -1) {
                    linkTo(this.value().split('|')[0], this.value().split('|')[1]);
                } else {
                    linkTo('/', 'search');
                    $('#path').html('<a href="' + webType + '/#/home"><i class="fas fa-home"></i>首页<span><small>Home</small></span></a><span><i class="fas fa-angle-double-right"></i><i class="fas fa-search"></i>搜索结果<small>Search Result</small></span>');
                }
            }
        }
    });
}

// 进入全屏
function enterFullscreen(element) {
    var el = element instanceof HTMLElement ? element : document.documentElement;
    var infs = el.requestFullscreen       ||
               el.webkitRequestFullscreen ||
               el.mozRequestFullScreen    ||
               el.msRequestFullscreen;
    if (infs) {
        infs.call(el);
    } else if (window.ActiveXObject) {
        var ws = new ActiveXObject('WScript.Shell');
        ws && ws.SendKeys('{F11}');
    }
}

// 退出全屏
function exitFullscreen() {
    var outfs = document.exitFullscreen       ||
                document.webkitExitFullscreen ||
                document.mozCancelFullScreen  ||
                document.msExitFullscreen;
    if (outfs) {
        outfs.call(document);
    } else if (window.ActiveXObject) {
        var ws = new ActiveXObject('WScript.Shell');
        ws && ws.SendKeys('{F11}');
    }
}

// 锁屏
function lockScreen() {
    document.onkeydown = function () {
        var e = window.event || arguments[0];
        // 屏蔽 F12
        if (e.keyCode === 123) {
            return false;
        // 屏蔽 Ctrl+Shift+I
        } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode === 73)) {
            return false;
        // 屏蔽 Shift+F10
        } else if ((e.shiftKey) && (e.keyCode === 121)) {
            return false;
        }
    };
    // 屏蔽右键单击
    document.oncontextmenu = function () {
        return false;
    };
    $('#locking').remove();
    if (sessionStorage.getItem("avatar")) {
        $('body').append('<div id="locking"><figure onclick="lockInput(this);"><img src="' + sessionStorage.getItem("avatar") + '" alt="' + sessionStorage.getItem("userName") + '"></figure><h3>' + sessionStorage.getItem("userName") + '</h3></div>');
    } else {
        $('body').append('<div id="locking"><figure onclick="logout();"><img src="img/avatar.png" alt="IKKI"></figure><h3>你没有正常登录哦~</h3></div>');
    }
    setTimeout(function () {
        $('#locking').addClass('lock-ani');
    }, 200);
    sessionStorage.setItem('locked', true);
}

// 锁屏输入
function lockInput(dom) {
    $(dom).find('img').unwrap();
    $('#locking').append('<div class="input-group"><input class="form-control form-control-lg" type="password" placeholder="请输入登录密码解锁"><div class="input-group-append" onclick="unlockScreen();"><span class="input-group-text"><i class="fas fa-key"></i></span></div></div>');
    setTimeout(function () {
        $('#locking .input-group').addClass('lock-input-ani');
    }, 200);
    $('#locking input').focus();
}

// 解锁
function unlockScreen() {
    if ($('#locking input').val() === sessionStorage.getItem('password')) {
        $('#locking').fadeOut(300, function () {
            $('#locking').remove();
        });
        sessionStorage.removeItem('locked');
        document.onkeydown = function () {
            var e = window.event || arguments[0];
            // 屏蔽 F12
            if (e.keyCode === 123) {
                return true;
                // 屏蔽 Ctrl+Shift+I
            } else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode === 73)) {
                return true;
                // 屏蔽 Shift+F10
            } else if ((e.shiftKey) && (e.keyCode === 121)) {
                return true;
            }
        };
        // 屏蔽右键单击
        document.oncontextmenu = function () {
            return true;
        };
    } else {
        noticeMsg('密码错误！请重新输入~', 'error', 'top', 3000);
    }
}

// 配色
function changeColor(color, accent, minor) {
    $('#Amikoko').attr('href', 'css/themes/theme_' + color + '.min.css');
    if ($('#hasChart').length > 0) {
        setTimeout(function () {
            kendo.dataviz.autoTheme(true);
            refresh();
        }, 300);
    }
    localStorage.setItem('colorName', color);
    localStorage.setItem('accentColor', accent);
    accentColor = accent;
    localStorage.setItem('minorColor', minor);
    minorColor = minor;
}

// 语言
function changeLang(lang) {
    $.getScript('js/global/kendo.' + lang + '.js', function () {
        kendo.culture(lang);
        refresh();
    });
}

// 退出登录
function logout() {
    sessionStorage.clear();
    if (location.href.indexOf('gitee') !== -1) {
        location.href = path + webType + '/login_gitee.html';
    } else {
        location.href = path + webType + '/login.html';
    }
}

// 天气预报
function getWeather() {
    var divWindow = $('<div class="window-box" id="weatherBox"></div>').kendoWindow({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        title: '天气预报',
        width: 360,
        modal: true,
        pinned: true,
        resizable: false,
        open: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        getWeatherInfo(position.coords.longitude + ',' + position.coords.latitude);
                    },
                    function (positionError) {
                        getWeatherInfo('auto_ip');
                    },
                    {
                        enableHighAcuracy: true,
                        maximumAge: 86400000,
                        timeout: 3000
                    }
                );
            }
        },
        close: function () {
            divWindow.destroy();
        }
    }).data('kendoWindow'),
        weatherHtml =
            '<div class="card">' +
                '<div class="card-header"><i class="fas fa-map-marker-alt theme-m"></i><span class="loc"><span class="skeleton"></span></div>' +
                '<div class="card-body">' +
                    '<time><span class="skeleton"></span></time>' +
                    '<div class="d-flex">' +
                        '<span class="tmp theme-m"><span class="skeleton skeleton-round"></span></span>' +
                        '<i class="wi wi-celsius theme-m"></i>' +
                        '<span class="cond_txt"><span class="skeleton"></span></span>' +
                        '<i class="cond_code wi wi-na theme-s"></i>' +
                    '</div>' +
                    '<hr>' +
                    '<div class="row">' +
                        '<div class="col-12 air"><span class="skeleton"></span></div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-6 tmp_m"><i class="wi wi-thermometer theme-m"></i><span class="skeleton"></span></div>' +
                        '<div class="col-6 wind"><i class="wi wi-strong-wind theme-m"></i><span class="skeleton"></span></div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-6 hum"><i class="wi wi-humidity theme-m"></i><span class="skeleton"></span></div>' +
                        '<div class="col-6 uv_index"><i class="wi wi-umbrella theme-m"></i><span class="skeleton"></span></div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-6 sr"><i class="wi wi-sunrise theme-m"></i><span class="skeleton"></span></div>' +
                        '<div class="col-6 ss"><i class="wi wi-sunset theme-m"></i><span class="skeleton"></span></div>' +
                    '</div>' +
                    '<div class="row">' +
                        '<div class="col-6 mr"><i class="wi wi-moonrise theme-m"></i><span class="skeleton"></span></div>' +
                        '<div class="col-6 ms"><i class="wi wi-moonset theme-m"></i><span class="skeleton"></span></div>' +
                    '</div>' +
                    '<div id="weatherChart"><div class="px-3"><span class="skeleton"></span></div></div>' +
                '</div>' +
                '<div class="card-footer">' +
                    '<div class="row">' +
                        '<div class="col-4 today"><span>今天</span><span class="skeleton"></span></div>' +
                        '<div class="col-4 tomorrow"><span>明天</span><span class="skeleton"></span></div>' +
                        '<div class="col-4 after_tomorrow"><span>后天</span><span class="skeleton"></span></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    divWindow.content(weatherHtml).center().open();
}

function getWeatherInfo(location) {
    $.ajax({
        type: 'get',
        data: {
            key: 'd2ae781d61744d65a2ef2156eef2cb64', // 请替换成自己的 Key
            location: location
        },
        url: 'https://free-api.heweather.net/s6/weather',
        dataType: 'json',
        success: function (res) {
            var basic = res.HeWeather6[0].basic,
                now = res.HeWeather6[0].now,
                daily_forecast = res.HeWeather6[0].daily_forecast,
                hourly = res.HeWeather6[0].hourly,
                lifestyle = res.HeWeather6[0].lifestyle,
                update = res.HeWeather6[0].update,
                weatherCode = res.HeWeather6[0].now.cond_code;
            $('#weatherBox .loc').html(basic.cnty + ' - ' + basic.admin_area + ' - ' + basic.parent_city + ' - ' + basic.location + '<i class="flag-icon flag-icon-' + basic.cid.substr(0, 2).toLowerCase() + '"></i>');
            $('#weatherBox time').html('更新于：' + update.loc);
            $('#weatherBox .tmp').html(now.tmp);
            $('#weatherBox .cond_txt').html(now.cond_txt);
            $('#weatherBox .cond_code').removeClass('wi-na').addClass(getWeatherIcon(kendo.toString(kendo.parseDate(update.loc), 'HH'), weatherCode));
            if (lifestyle) {
                $.ajax({
                    type: 'get',
                    data: {
                        key: 'd2ae781d61744d65a2ef2156eef2cb64', // 请替换成自己的 Key
                        location: basic.parent_city
                    },
                    url: 'https://free-api.heweather.net/s6/air/now',
                    dataType: 'json',
                    success: function (res) {
                        var qlty = res.HeWeather6[0].air_now_city.qlty,
                            qltyColor;
                        if (qlty === '优') {
                            qltyColor = 'success';
                        } else if (qlty === '良') {
                            qltyColor = 'info';
                        } else if (qlty === '轻度污染' || qlty === '中度污染') {
                            qltyColor = 'warning';
                        } else if (qlty === '重度污染' || qlty === '严重污染') {
                            qltyColor = 'error';
                        }
                        $('#weatherBox .air').html('空气质量：' + res.HeWeather6[0].air_now_city.aqi + '<span class="badge k-notification-' + qltyColor + '">' + qlty + '</span>');
                    },
                    error: function (res) {
                        alertMsg('获取空气质量数据出错！', 'error');
                    }
                });
            } else {
                $('#weatherBox .air').parent().remove();
            }
            $('#weatherBox .tmp_m').html('<i class="wi wi-thermometer theme-m"></i>' + daily_forecast[0].tmp_min + '℃~' + daily_forecast[0].tmp_max + '℃');
            $('#weatherBox .wind').html('<i class="wi wi-strong-wind theme-m"></i>' + now.wind_dir + now.wind_sc + '级');
            $('#weatherBox .hum').html('<i class="wi wi-humidity theme-m"></i>湿度：' + daily_forecast[0].hum + '%');
            if (basic.cnty === '中国') {
                $('#weatherBox .uv_index').html('<i class="wi wi-umbrella theme-m"></i>紫外线：' + lifestyle[5].brf);
            } else {
                $('#weatherBox .uv_index').html('<i class="wi wi-umbrella theme-m"></i>紫外线：' + daily_forecast[0].uv_index + '级');
            }
            $('#weatherBox .sr').html('<i class="wi wi-sunrise theme-m"></i>日升：' + daily_forecast[0].sr);
            $('#weatherBox .ss').html('<i class="wi wi-sunset theme-m"></i>日落：' + daily_forecast[0].ss);
            $('#weatherBox .mr').html('<i class="wi wi-moonrise theme-m"></i>月升：' + daily_forecast[0].mr);
            $('#weatherBox .ms').html('<i class="wi wi-moonset theme-m"></i>月落：' + daily_forecast[0].ms);
            $('#weatherChart').kendoChart({
                theme: 'sass',
                chartArea: {
                    height: 100
                },
                dataSource: {
                    data: hourly,
                    schema: {
                        model: {
                            fields: {
                                time: { type: 'string' },
                                tmp: { type: 'number' }
                            }
                        }
                    }
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: 'area',
                    area: {
                        line: {
                            width: 1,
                            style: 'smooth'
                        }
                    },
                    markers: {
                        visible: true,
                        size: 5
                    }
                },
                series: [
                    {
                        field: 'tmp'
                    }
                ],
                categoryAxis: {
                    field: 'time',
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        template: '#: kendo.toString(kendo.parseDate(value), "HH点") #'
                    }
                },
                valueAxis: {
                    majorGridLines: {
                        step: 2
                    },
                    labels: {
                        format: '{0}℃',
                        font: '9px arial, helvetica, sans-serif',
                        color: '#999',
                        step: 2
                    }
                },
                tooltip: {
                    visible: true,
                    template: '#= value #℃'
                }
            });
            $('#weatherBox .today').html('<span>今天</span><span class="icon"><i class="wi ' + getWeatherIcon(8, daily_forecast[0].cond_code_d) + ' theme-m"></i><i class="wi ' + getWeatherIcon(20, daily_forecast[0].cond_code_n) + ' theme-s"></i></span><span>' + daily_forecast[0].tmp_min + '℃ ~ ' + daily_forecast[0].tmp_max + '℃</span><span>日：' + daily_forecast[0].cond_txt_d + '</span><span>夜：' + daily_forecast[0].cond_txt_n + '</span>');
            $('#weatherBox .tomorrow').html('<span>明天</span><span class="icon"><i class="wi ' + getWeatherIcon(8, daily_forecast[1].cond_code_d) + ' theme-m"></i><i class="wi ' + getWeatherIcon(20, daily_forecast[1].cond_code_n) + ' theme-s"></i></span><span>' + daily_forecast[1].tmp_min + '℃ ~ ' + daily_forecast[1].tmp_max + '℃</span><span>日：' + daily_forecast[1].cond_txt_d + '</span><span>夜：' + daily_forecast[1].cond_txt_n + '</span>');
            $('#weatherBox .after_tomorrow').html('<span>后天</span><span class="icon"><i class="wi ' + getWeatherIcon(8, daily_forecast[2].cond_code_d) + ' theme-m"></i><i class="wi ' + getWeatherIcon(20, daily_forecast[2].cond_code_n) + ' theme-s"></i></span><span>' + daily_forecast[2].tmp_min + '℃ ~ ' + daily_forecast[2].tmp_max + '℃</span><span>日：' + daily_forecast[2].cond_txt_d + '</span><span>夜：' + daily_forecast[2].cond_txt_n + '</span>');
        },
        error: function (res) {
            alertMsg('获取天气数据出错！', 'error');
        }
    });
}

function getWeatherIcon(time, weatherCode) {
    if (time >= 6 && time < 18) {
        if (weatherCode === '100') {
            return 'wi-day-sunny';
        } else if (weatherCode === '101') {
            return 'wi-cloudy';
        } else if (weatherCode === '102') {
            return 'wi-day-sunny-overcast';
        } else if (weatherCode === '103') {
            return 'wi-day-cloudy';
        } else if (weatherCode === '104') {
            return 'wi-cloud';
        } else if (weatherCode === '200') {
            return 'wi-windy';
        } else if (weatherCode === '201') {
            return 'wi-day-cloudy-windy';
        } else if (weatherCode === '202') {
            return 'wi-cloudy-windy';
        } else if (weatherCode === '203') {
            return 'wi-day-cloudy-gusts';
        } else if (weatherCode === '204') {
            return 'wi-cloudy-gusts';
        } else if (weatherCode === '205') {
            return 'wi-strong-wind';
        } else if (weatherCode === '206') {
            return 'wi-strong-wind';
        } else if (weatherCode === '207') {
            return 'wi-strong-wind';
        } else if (weatherCode === '208') {
            return 'wi-strong-wind';
        } else if (weatherCode === '209') {
            return 'wi-strong-wind';
        } else if (weatherCode === '210') {
            return 'wi-strong-wind';
        } else if (weatherCode === '211') {
            return 'wi-hurricane';
        } else if (weatherCode === '212') {
            return 'wi-tornado';
        } else if (weatherCode === '213') {
            return 'wi-hurricane';
        } else if (weatherCode === '300') {
            return 'wi-day-sprinkle';
        } else if (weatherCode === '301') {
            return 'wi-day-showers';
        } else if (weatherCode === '302') {
            return 'wi-day-storm-showers';
        } else if (weatherCode === '303') {
            return 'wi-storm-showers';
        } else if (weatherCode === '304') {
            return 'wi-day-sleet-storm';
        } else if (weatherCode === '305') {
            return 'wi-day-rain';
        } else if (weatherCode === '306') {
            return 'wi-showers';
        } else if (weatherCode === '307') {
            return 'wi-hail';
        } else if (weatherCode === '308') {
            return 'wi-rain-wind';
        } else if (weatherCode === '309') {
            return 'wi-raindrops';
        } else if (weatherCode === '310') {
            return 'wi-rain';
        } else if (weatherCode === '311') {
            return 'wi-rain';
        } else if (weatherCode === '312') {
            return 'wi-rain';
        } else if (weatherCode === '313') {
            return 'wi-sleet';
        } else if (weatherCode === '314') {
            return 'wi-showers';
        } else if (weatherCode === '315') {
            return 'wi-hail';
        } else if (weatherCode === '316') {
            return 'wi-rain';
        } else if (weatherCode === '317') {
            return 'wi-rain';
        } else if (weatherCode === '318') {
            return 'wi-rain';
        } else if (weatherCode === '399') {
            return 'wi-raindrop';
        } else if (weatherCode === '400') {
            return 'wi-day-snow-wind';
        } else if (weatherCode === '401') {
            return 'wi-snow';
        } else if (weatherCode === '402') {
            return 'wi-snow-wind';
        } else if (weatherCode === '403') {
            return 'wi-snow-wind';
        } else if (weatherCode === '404') {
            return 'wi-rain-mix';
        } else if (weatherCode === '405') {
            return 'wi-rain-mix';
        } else if (weatherCode === '406') {
            return 'wi-day-snow-thunderstorm';
        } else if (weatherCode === '407') {
            return 'wi-day-snow';
        } else if (weatherCode === '408') {
            return 'wi-snow';
        } else if (weatherCode === '409') {
            return 'wi-snow-wind';
        } else if (weatherCode === '410') {
            return 'wi-snow-wind';
        } else if (weatherCode === '499') {
            return 'wi-snowflake-cold';
        } else if (weatherCode === '500') {
            return 'wi-day-fog';
        } else if (weatherCode === '501') {
            return 'wi-day-fog';
        } else if (weatherCode === '502') {
            return 'wi-smoke';
        } else if (weatherCode === '503') {
            return 'wi-dust';
        } else if (weatherCode === '504') {
            return 'wi-dust';
        } else if (weatherCode === '507') {
            return 'wi-sandstorm';
        } else if (weatherCode === '508') {
            return 'wi-sandstorm';
        } else if (weatherCode === '509') {
            return 'wi-fog';
        } else if (weatherCode === '510') {
            return 'wi-fog';
        } else if (weatherCode === '511') {
            return 'wi-smog';
        } else if (weatherCode === '512') {
            return 'wi-smog';
        } else if (weatherCode === '513') {
            return 'wi-smog';
        } else if (weatherCode === '514') {
            return 'wi-fog';
        } else if (weatherCode === '515') {
            return 'wi-fog';
        } else if (weatherCode === '900') {
            return 'wi-hot';
        } else if (weatherCode === '901') {
            return 'wi-snowflake-cold';
        } else if (weatherCode === '999') {
            return 'wi-na';
        } else {
            return 'wi-na';
        }
    } else {
        if (weatherCode === '100') {
            return 'wi-night-clear';
        } else if (weatherCode === '101') {
            return 'wi-cloudy';
        } else if (weatherCode === '102') {
            return 'wi-night-alt-partly-cloudy';
        } else if (weatherCode === '103') {
            return 'wi-night-alt-cloudy';
        } else if (weatherCode === '104') {
            return 'wi-cloud';
        } else if (weatherCode === '200') {
            return 'wi-windy';
        } else if (weatherCode === '201') {
            return 'wi-night-alt-cloudy-windy';
        } else if (weatherCode === '202') {
            return 'wi-cloudy-windy';
        } else if (weatherCode === '203') {
            return 'wi-night-alt-cloudy-gusts';
        } else if (weatherCode === '204') {
            return 'wi-cloudy-gusts';
        } else if (weatherCode === '205') {
            return 'wi-strong-wind';
        } else if (weatherCode === '206') {
            return 'wi-strong-wind';
        } else if (weatherCode === '207') {
            return 'wi-strong-wind';
        } else if (weatherCode === '208') {
            return 'wi-strong-wind';
        } else if (weatherCode === '209') {
            return 'wi-strong-wind';
        } else if (weatherCode === '210') {
            return 'wi-strong-wind';
        } else if (weatherCode === '211') {
            return 'wi-hurricane';
        } else if (weatherCode === '212') {
            return 'wi-tornado';
        } else if (weatherCode === '213') {
            return 'wi-hurricane';
        } else if (weatherCode === '300') {
            return 'wi-night-alt-sprinkle';
        } else if (weatherCode === '301') {
            return 'wi-night-alt-showers';
        } else if (weatherCode === '302') {
            return 'wi-night-alt-storm-showers';
        } else if (weatherCode === '303') {
            return 'wi-storm-showers';
        } else if (weatherCode === '304') {
            return 'wi-night-alt-sleet-storm';
        } else if (weatherCode === '305') {
            return 'wi-night-alt-rain';
        } else if (weatherCode === '306') {
            return 'wi-showers';
        } else if (weatherCode === '307') {
            return 'wi-hail';
        } else if (weatherCode === '308') {
            return 'wi-rain-wind';
        } else if (weatherCode === '309') {
            return 'wi-raindrops';
        } else if (weatherCode === '310') {
            return 'wi-rain';
        } else if (weatherCode === '311') {
            return 'wi-rain';
        } else if (weatherCode === '312') {
            return 'wi-rain';
        } else if (weatherCode === '313') {
            return 'wi-sleet';
        } else if (weatherCode === '314') {
            return 'wi-showers';
        } else if (weatherCode === '315') {
            return 'wi-hail';
        } else if (weatherCode === '316') {
            return 'wi-rain';
        } else if (weatherCode === '317') {
            return 'wi-rain';
        } else if (weatherCode === '318') {
            return 'wi-rain';
        } else if (weatherCode === '399') {
            return 'wi-raindrop';
        } else if (weatherCode === '400') {
            return 'wi-night-alt-snow-wind';
        } else if (weatherCode === '401') {
            return 'wi-snow';
        } else if (weatherCode === '402') {
            return 'wi-snow-wind';
        } else if (weatherCode === '403') {
            return 'wi-snow-wind';
        } else if (weatherCode === '404') {
            return 'wi-rain-mix';
        } else if (weatherCode === '405') {
            return 'wi-rain-mix';
        } else if (weatherCode === '406') {
            return 'wi-night-alt-snow-thunderstorm';
        } else if (weatherCode === '407') {
            return 'wi-night-alt-snow';
        } else if (weatherCode === '408') {
            return 'wi-snow';
        } else if (weatherCode === '409') {
            return 'wi-snow-wind';
        } else if (weatherCode === '410') {
            return 'wi-snow-wind';
        } else if (weatherCode === '499') {
            return 'wi-snowflake-cold';
        } else if (weatherCode === '500') {
            return 'wi-night-fog';
        } else if (weatherCode === '501') {
            return 'wi-night-fog';
        } else if (weatherCode === '502') {
            return 'wi-smoke';
        } else if (weatherCode === '503') {
            return 'wi-dust';
        } else if (weatherCode === '504') {
            return 'wi-dust';
        } else if (weatherCode === '507') {
            return 'wi-sandstorm';
        } else if (weatherCode === '508') {
            return 'wi-sandstorm';
        } else if (weatherCode === '509') {
            return 'wi-fog';
        } else if (weatherCode === '510') {
            return 'wi-fog';
        } else if (weatherCode === '511') {
            return 'wi-smog';
        } else if (weatherCode === '512') {
            return 'wi-smog';
        } else if (weatherCode === '513') {
            return 'wi-smog';
        } else if (weatherCode === '514') {
            return 'wi-fog';
        } else if (weatherCode === '515') {
            return 'wi-fog';
        } else if (weatherCode === '900') {
            return 'wi-hot';
        } else if (weatherCode === '901') {
            return 'wi-snowflake-cold';
        } else if (weatherCode === '999') {
            return 'wi-na';
        } else {
            return 'wi-na';
        }
    }
}

// 农历数据
var lunarData = {
    lunarInfo: [
        0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
        0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
        0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
        0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
        0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
        0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
        0x0d520
    ],
    solarMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    tianGan: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    diZhi: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
    zodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
    solarTerm: ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'],
    sTermInfo: [
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',
        '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',
        'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',
        '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',
        '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',
        '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',
        '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',
        '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',
        '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',
        '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',
        '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',
        '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',
        '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',
        '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',
        '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',
        '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',
        '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',
        '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',
        '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',
        '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',
        '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',
        '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',
        '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',
        '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',
        '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',
        '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'
    ],
    lunarFestival: [
        '0101 春节',
        '0115 元宵节',
        '0202 龙头节',
        '0303 上巳节',
        '0505 端午节',
        '0707 七夕节',
        '0715 中元节',
        '0815 中秋节',
        '0909 重阳节',
        '1001 寒衣节',
        '1015 下元节',
        '1208 腊八节',
        '1223 北小年',
        '1224 南小年'
    ],
    solarFestival: [
        '0101 元旦',
        '0214 情人节',
        '0308 妇女节',
        '0312 植树节',
        '0401 愚人节',
        '0501 劳动节',
        '0504 青年节',
        '0601 儿童节',
        '0701 建党节',
        '0801 建军节',
        '0910 教师节',
        '1001 国庆节',
        '1101 万圣节',
        '1213 国家公祭',
        '1225 圣诞节',
        '1226 主席诞辰'
    ],
    dayChina: ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
    tenDayChina: ['初', '十', '廿', '卅'],
    monthChina: ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'],
    lunarYearDays: function (y) {
        var i,
            sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) {
            sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
        }
        return (sum + this.leapDays(y));
    },
    leapMonth: function (y) {
        return (this.lunarInfo[y - 1900] & 0xf);
    },
    leapDays: function (y) {
        if (this.leapMonth(y)) {
            return ((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        }
        return 0;
    },
    lunarMonthDays: function (y, m) {
        if (m > 12 || m < 1) {
            return -1;
        } else if (y === 1899) {
            return 30;
        }
        return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29 );
    },
    solarMonthDays: function (y, m) {
        if (m > 12 || m < 1) {
            return -1;
        }
        var ms = m - 1;
        if (ms === 1) {
            return (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28);
        } else {
            return (this.solarMonth[ms]);
        }
    },
    toGanZhiYear: function (lYear) {
        var ganKey = (lYear - 3) % 10;
        var zhiKey = (lYear - 3) % 12;
        if (ganKey === 0) ganKey = 10;
        if (zhiKey === 0) zhiKey = 12;
        return this.tianGan[ganKey - 1] + this.diZhi[zhiKey - 1];
    },
    toGanZhi: function (offset) {
        return this.tianGan[offset % 10] + this.diZhi[offset % 12];
    },
    toChinaMonth: function (m) {
        if (m > 12 || m < 1) {
            return -1;
        }
        var s = this.monthChina[m - 1];
        s += '月';
        return s;
    },
    toChinaDay: function (d) {
        var s;
        switch (d) {
            case 10:
                s = '初十';
                break;
            case 20:
                s = '二十';
                break;
            case 30:
                s = '三十';
                break;
            default:
                s = this.tenDayChina[Math.floor(d / 10)];
                s += this.dayChina[d % 10];
        }
        return s;
    },
    getZodiac: function (y) {
        return this.zodiac[(y - 4) % 12];
    },
    toConstellation: function (cMonth, cDay) {
        var s = '山羊水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手山羊';
        var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
        return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '座';
    },
    getTerm: function (y, n) {
        if (y < 1900 || y > 2100) {
            return -1;
        }
        if (n < 1 || n > 24) {
            return -1;
        }
        var _table = this.sTermInfo[y - 1900];
        var _info = [
            parseInt('0x' + _table.substr(0, 5)).toString(),
            parseInt('0x' + _table.substr(5, 5)).toString(),
            parseInt('0x' + _table.substr(10, 5)).toString(),
            parseInt('0x' + _table.substr(15, 5)).toString(),
            parseInt('0x' + _table.substr(20, 5)).toString(),
            parseInt('0x' + _table.substr(25, 5)).toString()
        ];
        var _calday = [
            _info[0].substr(0, 1),
            _info[0].substr(1, 2),
            _info[0].substr(3, 1),
            _info[0].substr(4, 2),
            _info[1].substr(0, 1),
            _info[1].substr(1, 2),
            _info[1].substr(3, 1),
            _info[1].substr(4, 2),
            _info[2].substr(0, 1),
            _info[2].substr(1, 2),
            _info[2].substr(3, 1),
            _info[2].substr(4, 2),
            _info[3].substr(0, 1),
            _info[3].substr(1, 2),
            _info[3].substr(3, 1),
            _info[3].substr(4, 2),
            _info[4].substr(0, 1),
            _info[4].substr(1, 2),
            _info[4].substr(3, 1),
            _info[4].substr(4, 2),
            _info[5].substr(0, 1),
            _info[5].substr(1, 2),
            _info[5].substr(3, 1),
            _info[5].substr(4, 2)
        ];
        return parseInt(_calday[n - 1]);
    },
    getFestival: function (y, m, d, type) {
        var festival;
        if (type === 'lunar') {
            festival = this.lunarFestival;
            if (m === 12 && d === this.lunarMonthDays(y, m)) {
                return '除夕';
            }
        } else if (type === 'solar') {
            festival = this.solarFestival;
        }
        for (var i = 0; i < festival.length; i++) {
            if (m === parseInt(festival[i].substr(0, 2)) && d === parseInt(festival[i].substr(2, 2))) {
                return festival[i].substr(5);
            }
        }
        return null;
    },
    solar2lunar: function (y, m, d) {
        if (y < 1900 || y > 2100) {
            return -1;
        }
        if (!y) {
            var objDate = new Date();
        } else {
            var objDate = new Date(y, parseInt(m) - 1, d);
        }
        var i,
            leap = 0,
            temp = 0;
        var y = objDate.getFullYear(),
            m = objDate.getMonth() + 1,
            d = objDate.getDate();
        if (y === 1900 && m === 1 && d < 31) {
            var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 1)) / 86400000;
        } else {
            var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
        }
        for (i = 1900; i < 2101 && offset > 0; i++) {
            temp = this.lunarYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp;
            i--;
        }
        var isTodayObj = new Date(),
            isToday = false;
        if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {
            isToday = true;
        }
        var nWeek = objDate.getDay(),
            cWeek = this.dayChina[nWeek];
        if (nWeek === 0) {
            nWeek = 7;
        }
        if (y === 1900 && m === 1 && d < 31) {
            var year = 1899;
        } else {
            var year = i;
        }
        var leap = this.leapMonth(i);
        var isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i === (leap + 1) && isLeap === false) {
                --i;
                isLeap = true;
                temp = this.leapDays(year);
            } else {
                temp = this.lunarMonthDays(year, i);
            }
            if (isLeap === true && i === (leap + 1)) {
                isLeap = false;
            }
            offset -= temp;
        }
        if (offset === 0 && leap > 0 && i === leap + 1) {
            if (isLeap) {
                isLeap = false;
            } else {
                isLeap = true;
                --i;
            }
        }
        if (offset < 0) {
            offset += temp;
            --i;
        }
        if (y === 1900 && m === 1 && d < 31) {
            var month = 12;
        } else {
            var month = i;
        }
        if (y === 1900 && m === 1 && d === 30) {
            var day = 30;
        } else {
            var day = offset + 1;
        }
        var sm = m - 1;
        var gzY = this.toGanZhiYear(year);
        var firstNode = this.getTerm(y, (m * 2 - 1));
        var secondNode = this.getTerm(y, (m * 2));
        var gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
        if (d >= firstNode) {
            gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
        }
        var isTerm = false;
        var Term = null;
        if (firstNode === d) {
            isTerm = true;
            Term = this.solarTerm[m * 2 - 2];
        }
        if (secondNode === d) {
            isTerm = true;
            Term = this.solarTerm[m * 2 - 1];
        }
        var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
        var gzD = this.toGanZhi(dayCyclical + d - 1);
        var constellation = this.toConstellation(m, d);
        var isFestival = false;
        if (this.getFestival(y, m, d, 'solar') || this.getFestival(year, month, day, 'lunar')) {
            isFestival = true;
        }
        return {
            'solarYear': y,
            'solarMonth': m,
            'solarDay': d,
            'week': nWeek,
            'weekCn': '星期' + cWeek,
            'gzYear': gzY,
            'gzMonth': gzM,
            'gzDay': gzD,
            'lunarYear': year,
            'lunarMonth': month,
            'lunarDay': day,
            'lunarMonthCn': (isLeap ? '闰' : '') + this.toChinaMonth(month),
            'lunarDayCn': this.toChinaDay(day),
            'zodiac': this.getZodiac(year),
            'constellation': constellation,
            'isToday': isToday,
            'isLeap': isLeap,
            'isTerm': isTerm,
            'term': Term,
            'isFestival': isFestival,
            'lunarFestival': this.getFestival(year, month, day, 'lunar'),
            'solarFestival': this.getFestival(y, m, d, 'solar')
        };
    },
    lunar2solar: function (y, m, d, isLeapMonth) {
        var isLeapMonth = !!isLeapMonth;
        var leapOffset = 0;
        var leapMonth = this.leapMonth(y);
        var leapDay = this.leapDays(y);
        if (isLeapMonth && (leapMonth !== m)) {
            return -1;
        }
        if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
            return -1;
        }
        var day = this.lunarMonthDays(y, m);
        var _day = day;
        if (isLeapMonth) {
            _day = this.leapDays(y, m);
        }
        if (y < 1900 || y > 2100 || d > _day) {
            return -1;
        }
        var offset = 0;
        for (var i = 1900; i < y; i++) {
            offset += this.lunarYearDays(i);
        }
        var leap = 0,
            isAdd = false;
        for(var i = 1; i < m; i++) {
            leap = this.leapMonth(y);
            if (!isAdd) {
                if (leap <= i && leap > 0) {
                    offset += this.leapDays(y);
                    isAdd = true;
                }
            }
            offset += this.lunarMonthDays(y, i);
        }
        if (isLeapMonth) {
            offset += day;
        }
        var stmap = Date.UTC(1900, 1, 30, 0, 0, 0);
        var calObj = new Date((offset + d - 31) * 86400000 + stmap);
        var cY = calObj.getUTCFullYear();
        var cM = calObj.getUTCMonth() + 1;
        var cD = calObj.getUTCDate();
        return this.solar2lunar(cY, cM, cD);
    }
};

// 是否节假日
function isHoliday(date, dates) {
    for (var i = 0; i < dates.length; i++) {
        if (date.getMonth() === dates[i].getMonth() && date.getDate() === dates[i].getDate()) {
            return true;
        }
    }
    return false;
}

// 万年历
function getLunar() {
    var divWindow = $('<div class="window-box" id="lunarBox"></div>').kendoWindow({
            animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
            title: '万年历',
            width: '90%',
            maxWidth: 800,
            modal: true,
            pinned: true,
            resizable: false,
            open: function () {
                $('#perpetualCalendar').kendoCalendar({
                    footer: '今天：#= kendo.toString(data, "yyyy年MM月dd日") #',
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
                    value: new Date(),
                    change: function () {
                        setLunar(this.value());
                    }
                });
                setLunar($('#perpetualCalendar').data('kendoCalendar').value());
            },
            close: function () {
                divWindow.destroy();
            }
        }).data('kendoWindow'),
        lunarHtml =
            '<div class="card">' +
                '<div class="row no-gutters">' +
                    '<div class="col-md-4 theme-m-bg" id="lunarShow">' +
                        '<div class="month"></div>' +
                        '<div class="day theme-s-bg"></div>' +
                        '<div class="week"></div>' +
                        '<div class="lunarDay"></div>' +
                        '<div class="festival"></div>' +
                        '<div class="lunarYear"></div>' +
                    '</div>' +
                    '<div class="col-md-8">' +
                        '<div id="perpetualCalendar"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    divWindow.content(lunarHtml).center().open();
}

function setLunar(date) {
    var lunar = lunarData.solar2lunar(date.getFullYear(), (date.getMonth() + 1), date.getDate());
    $('#lunarShow .month').html(kendo.toString(date, "yyyy年MM月"));
    $('#lunarShow .day').html(kendo.toString(date, "dd"));
    if (lunar.isTerm) {
        $('#lunarShow .week').html(kendo.toString(date, "dddd") + '【' + lunar.term + '】');
    } else {
        $('#lunarShow .week').html(kendo.toString(date, "dddd"));
    }
    $('#lunarShow .lunarDay').html(lunar.zodiac + '年：' + lunar.lunarMonthCn + lunar.lunarDayCn);
    $('#lunarShow .festival').html('');
    if (lunar.lunarFestival) {
        $('#lunarShow .festival').show().append('<span>' + lunar.lunarFestival + '</span>');
    }
    if (lunar.solarFestival) {
        $('#lunarShow .festival').show().append('<span>' + lunar.solarFestival + '</span>');
    }
    $('#lunarShow .festival').prepend('--=').append('=--');
    if (!(lunar.lunarFestival) && !(lunar.solarFestival)) {
        $('#lunarShow .festival').hide();
    }
    $('#lunarShow .lunarYear').html('<span>' + lunar.gzYear + '年</span><span>' + lunar.gzMonth + '月</span><span>' + lunar.gzDay + '日</span>');
}

// 便签
function getNote() {
    if (window.indexedDB) {
        var req = window.indexedDB.open('noteDB'),
            db,
            divWindow = $('<div class="window-box" id="noteBox"></div>').kendoWindow({
                animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
                title: '便签',
                width: '90%',
                maxWidth: 360,
                height: 540,
                modal: true,
                pinned: true,
                resizable: false,
                open: function () {
                    $('#noteListView').kendoListView({
                        dataSource: {
                            transport: {
                                create: function (options) {
                                    delete options.data.id;
                                    var createResult = db.transaction(['list'], 'readwrite').objectStore('list').add(options.data);
                                    createResult.onsuccess = function (e) {
                                        options.success(e.target);
                                        refreshNote();
                                    };
                                    createResult.onerror = function () {
                                        alertMsg('便签新增出错！', 'error');
                                    };
                                },
                                destroy: function (options) {
                                    var destroyResult = db.transaction(['list'], 'readwrite').objectStore('list').delete(options.data.id);
                                    destroyResult.onsuccess = function (e) {
                                        options.success(e.target);
                                        refreshNote();
                                    };
                                    destroyResult.onerror = function () {
                                        alertMsg('便签删除出错！', 'error');
                                    };
                                },
                                update: function (options) {
                                    var updateResult = db.transaction(['list'], 'readwrite').objectStore('list').put(options.data);
                                    updateResult.onsuccess = function (e) {
                                        options.success(e.target);
                                        refreshNote();
                                    };
                                    updateResult.onerror = function () {
                                        alertMsg('便签编辑出错！', 'error');
                                    };
                                },
                                read: function (options) {
                                    var readResult = db.transaction(['list']).objectStore('list').getAll();
                                    readResult.onsuccess = function (e) {
                                        options.success(e.target);
                                        if (e.target.result.length === 0) {
                                            $('#noteListView').html('<div class="blank"><p class="lead">无便签</p></div>');
                                        }
                                    };
                                    readResult.onerror = function () {
                                        alertMsg('便签查询出错！', 'error');
                                    };
                                }
                            },
                            schema: {
                                data: 'result',
                                model: {
                                    id: 'id',
                                    fields: {
                                        noteContent: { type: 'string' },
                                        noteTime: { type: 'string' }
                                    }
                                }
                            },
                            pageSize: 5
                        },
                        height: 400,
                        scrollable: 'endless',
                        template: kendo.template($('#noteListTemplate').html()),
                        editTemplate: kendo.template($('#noteEditTemplate').html()),
                        save: function (e) {
                            e.model.set('noteTime', kendo.toString(new Date(), 'yyyy-MM-dd HH:mm:ss'));
                        },
                        dataBound: function () {
                            $('#noteListView .alert:nth-child(6n+1)').addClass('alert-primary');
                            $('#noteListView .alert:nth-child(6n+2)').addClass('alert-secondary');
                            $('#noteListView .alert:nth-child(6n+3)').addClass('alert-success');
                            $('#noteListView .alert:nth-child(6n+4)').addClass('alert-danger');
                            $('#noteListView .alert:nth-child(6n+5)').addClass('alert-warning');
                            $('#noteListView .alert:nth-child(6n+6)').addClass('alert-info');
                        }
                    });
                    $('#noteBox .k-add-button').click(function (e) {
                        $('#noteListView').data('kendoListView').add();
                        e.preventDefault();
                    });
                    $('#noteSearch').keyup(function () {
                        $('#noteListView').data('kendoListView').dataSource.filter({
                            logic: 'or',
                            filters: [
                                { field: 'noteContent', operator: 'contains', value: $(this).val() },
                                { field: 'noteTime', operator: 'contains', value: $(this).val() }
                            ]
                        });
                    });
                    $('#noteBox .k-refresh-button').click(function (e) {
                        refreshNote();
                    });
                    $('#noteBox .k-clear-button').click(function (e) {
                        confirmMsg('清空确认', '你确定要清空便签吗？', 'question', function () {
                            db.transaction(['list'], 'readwrite').objectStore('list').clear();
                            refreshNote();
                        });
                    });
                },
                close: function () {
                    db.close();
                    divWindow.destroy();
                }
            }).data('kendoWindow'),
            noteHtml =
                '<div class="noteTools">' +
                    '<span class="k-textbox"><i class="fas fa-search theme-m"></i><input id="noteSearch" type="text"></span>' +
                    '<a class="k-link k-refresh-button" href="javascript:;" title="刷新"><i class="fas fa-redo-alt"></i></a>' +
                    '<a class="k-link k-clear-button" href="javascript:;" title="清空"><i class="fas fa-trash-alt"></i></a>' +
                '</div>' +
                '<div id="noteListView"></div>' +
                '<div class="noteTools">' +
                    '<a class="k-button theme-m-box k-add-button" href="javascript:;" title="新增"><span class="k-icon k-i-add"></span></a>' +
                '</div>' +
                '<script id="noteListTemplate" type="text/x-kendo-template">' +
                    '<div class="alert">' +
                        '<p>#= noteContent #</p>' +
                        '<hr>' +
                        '<time>' +
                            '<small>#= noteTime #</small>' +
                            '<span>' +
                                '<a class="k-button theme-m-box k-edit-button" href="javascript:;" title="编辑"><span class="k-icon k-i-edit"></span></a>' +
                                '<a class="k-button k-delete-button" href="javascript:;" title="删除"><span class="k-icon k-i-x"></span></a>' +
                            '</span>' +
                        '</time>' +
                    '</div>' +
                '</script>' +
                '<script id="noteEditTemplate" type="text/x-kendo-template">' +
                    '<div class="alert">' +
                        '<textarea class="k-textarea w-100" name="noteContent"></textarea>' +
                        '<hr>' +
                        '<time>' +
                            '<small>#= kendo.toString(new Date(), "yyyy-MM-dd HH:mm:ss") #</small>' +
                            '<span>' +
                                '<a class="k-button theme-m-box k-update-button" href="javascript:;" title="更新"><span class="k-icon k-i-check"></span></a>' +
                                '<a class="k-button k-cancel-button" href="javascript:;" title="取消"><span class="k-icon k-i-cancel"></span></a>' +
                            '</span>' +
                        '</time>' +
                    '</div>' +
                '</script>';
        req.onupgradeneeded = function (e) {
            db = e.target.result;
            if (!db.objectStoreNames.contains('list')) {
                db.createObjectStore('list', { keyPath: 'id', autoIncrement: true });
            }
        };
        req.onsuccess = function (e) {
            db = req.result;
            divWindow.content(noteHtml).center().open();
        };
        req.onerror = function (e) {
            alertMsg('获取便签数据出错！', 'error');
        };
    } else {
        alertMsg('您的浏览器不支持便签功能！', 'error');
    }
}

function refreshNote() {
    $('#noteListView').data('kendoListView').dataSource.read();
}