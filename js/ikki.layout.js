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
    tokenUrl = 'json/logout.json', // Token 验证接口
    navUrl = 'json/nav.json', // 左侧导航数据接口
    menuUrl = 'json/menu.json', // 顶部菜单数据接口
    searchUrl = 'json/search.json', // 全局搜索自动填充数据接口
    messageUrl = 'json/message.json', // 新消息数量获取接口
    noticeUrl = 'json/notice.json', // 新提醒数量获取接口
    systemNotificationUrl = 'json/notice.json', // 系统通知列表获取接口
    userUpdatingUrl = 'json/notice.json', // 个人动态列表获取接口
    toDoItemsUrl = 'json/notice.json', // 待办事项列表获取接口
    noticeReadUrl = 'json/response.json', // 提醒单条已读标记接口
    noticeReadAllUrl = 'json/response.json'; // 提醒全部已读标记接口

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
                    $('#menuV .links-message, #menuV .links-notice').find('span.k-menu-expand-arrow, div.k-content').remove();
                }
            });
            $('#menuH').kendoMenu({
                closeOnClick: false,
                dataSource: res.data,
                dataBound: function () {
                    globalSearch();
                    initMessage();
                    initNotice();
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
    // 新消息数量
    getMessage();
    // 新提醒数量
    getNotice();
    // 每半分钟获取一次
    setInterval(function () {
        if ($('#menuH div.k-animation-container[aria-hidden=false]').length === 0) {
            getMessage();
            getNotice();
        }
    }, 30000);
    // 工具箱图标
    $('body').append('<div id="toolBox"><button class="k-button k-state-selected" id="tools"><i class="fas fa-tools"></i></button></div>');
    // 聊天机器人图标
    $('#toolBox').append('<button class="k-button k-state-selected" id="bot"><label for="botCkb"><i class="fas fa-robot"></i></label></button>');
    $('body').append('<input id="botCkb" type="checkbox"><label for="botCkb"><span id="botMask"></span></label><div id="botChat"></div>');
    // 聊天机器人提示
    tipMsg($('#bot'), '聊天机器人', 'left');
    // 聊天机器人
    $('#botChat').kendoChat({
        user: { // 用户名称及头像
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
                        if (items.resultType === 'text') { // 文本
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
                        } else if (items.resultType === 'url') { // 链接
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
                        } else if (items.resultType === 'image') { // 图片
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
    }).data('kendoChat').renderMessage( // 初始化对话
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
    // 天气预报图标
    $('#toolBox').append('<button class="k-button k-state-selected" id="weather" onclick="getWeather();"><i class="wi wi-na"></i></button>');
    // 天气预报提示
    tipMsg($('#weather'), '天气预报', 'left');
    // 天气预报动态图标
    $.ajax({
        type: 'get',
        data: {
            version: 'v6',
            appid: '97987729', // 请替换成自己的 ID
            appsecret: 'f2Wfm53j' // 请替换成自己的 Key
        },
        url: 'https://www.tianqiapi.com/api/',
        dataType: 'json',
        success: function (res) {
            var weatherImg = res.wea_img,
                weatherTime = res.update_time.substr(0, 2);
            if (weatherTime >= 6 && weatherTime < 18) {
                // 白天
                if (weatherImg === 'qing') { // 晴
                    $('#weather').html('<i class="fas fa-sun"></i>');
                } else if (weatherImg === 'yun') { // 多云
                    $('#weather').html('<i class="fas fa-cloud-sun"></i>');
                } else if (weatherImg === 'yin') { // 阴
                    $('#weather').html('<i class="fas fa-cloud"></i>');
                } else if (weatherImg === 'yu') { // 雨
                    $('#weather').html('<i class="fas fa-cloud-sun-rain"></i>');
                } else if (weatherImg === 'lei') { // 雷
                    $('#weather').html('<i class="fas fa-bolt"></i>');
                } else if (weatherImg === 'bingbao') { // 冰雹
                    $('#weather').html('<i class="fas fa-cloud-meatball"></i>');
                } else if (weatherImg === 'xue') { // 雪
                    $('#weather').html('<i class="fas fa-snowflake"></i>');
                } else if (weatherImg === 'wu') { // 雾
                    $('#weather').html('<i class="fas fa-smog"></i>');
                } else if (weatherImg === 'shachen') { // 沙尘
                    $('#weather').html('<i class="fas fa-wind"></i>');
                } else {
                    $('#weather').html('<i class="wi wi-na"></i>');
                }
            } else {
                // 黑夜
                if (weatherImg === 'qing') { // 晴
                    $('#weather').html('<i class="fas fa-moon"></i>');
                } else if (weatherImg === 'yun') { // 多云
                    $('#weather').html('<i class="fas fa-cloud-moon"></i>');
                } else if (weatherImg === 'yin') { // 阴
                    $('#weather').html('<i class="fas fa-cloud"></i>');
                } else if (weatherImg === 'yu') { // 雨
                    $('#weather').html('<i class="fas fa-cloud-moon-rain"></i>');
                } else if (weatherImg === 'lei') { // 雷
                    $('#weather').html('<i class="fas fa-bolt"></i>');
                } else if (weatherImg === 'bingbao') { // 冰雹
                    $('#weather').html('<i class="fas fa-cloud-meatball"></i>');
                } else if (weatherImg === 'xue') { // 雪
                    $('#weather').html('<i class="fas fa-snowflake"></i>');
                } else if (weatherImg === 'wu') { // 雾
                    $('#weather').html('<i class="fas fa-smog"></i>');
                } else if (weatherImg === 'shachen') { // 沙尘
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
    // 万年历图标
    $('#toolBox').append('<button class="k-button k-state-selected" id="lunar" onclick="getLunar();"><i class="fas fa-calendar-alt"></i></button>');
    // 万年历提示
    tipMsg($('#lunar'), '万年历', 'left');
    // 便签图标
    $('#toolBox').append('<button class="k-button k-state-selected" id="note" onclick="getNote();"><i class="fas fa-sticky-note"></i></button>');
    // 便签提示
    tipMsg($('#note'), '便签', 'left');
    // 回到顶部图标
    $('#section').append('<button class="k-button k-state-selected" id="goTop"><i class="fas fa-arrow-up"></i></button>').scroll(function () {
        if ($(this).scrollTop() > 800) {
            $('#goTop').fadeIn();
        } else {
            $('#goTop').fadeOut();
        }
    });
    // 回到顶部提示
    tipMsg($('#goTop'), '回到顶部', 'left');
    // 回到顶部动画
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
                        ajaxUrl: searchUrl,
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

// 消息初始化
function initMessage() {
    var messageHTML =
        '<div class="card">' +
            '<div class="card-header">' +
                '<button class="k-button" id="messageDrawerBtn" type="button"><i class="fas fa-indent"></i></button>' +
                '<strong>站内信及短信息</strong>' +
            '</div>' +
            '<div class="card-body">' +
                '<div id="messageDrawer">' +
                    '<div id="messageDrawerContent">' +
                        '<div id="inbox">' +
                            '<div class="row no-gutters">' +
                                '<div class="col-4">' +
                                    '<div class="blank"><span class="k-icon k-i-loading"></span>载入中······</div>' +
                                '</div>' +
                                '<div class="col-8">' +
                                    '<div class="blank"><i class="fas fa-couch"></i>空空如也</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="hide" id="writeMail">' +
                            '<div class="row no-gutters">' +
                                '<div class="col-12">' +
                                    '<div class="blank"><span class="k-icon k-i-loading"></span>载入中······</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="hide" id="outbox">' +
                            '<div class="row no-gutters">' +
                                '<div class="col-4">' +
                                    '<div class="blank"><span class="k-icon k-i-loading"></span>载入中······</div>' +
                                '</div>' +
                                '<div class="col-8">' +
                                    '<div class="blank"><i class="fas fa-couch"></i>空空如也</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="hide"></div>' +
                        '<div class="hide" id="sms">' +
                            '<div class="row no-gutters">' +
                                '<div class="col-4">' +
                                    '<div class="blank"><span class="k-icon k-i-loading"></span>载入中······</div>' +
                                '</div>' +
                                '<div class="col-8">' +
                                    '<div class="blank"><i class="fas fa-couch"></i>空空如也</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="hide"></div>' +
                        '<div class="hide" id="addressBook">' +
                            '<div class="row no-gutters">' +
                                '<div class="col-4">' +
                                    '<div class="blank"><span class="k-icon k-i-loading"></span>载入中······</div>' +
                                '</div>' +
                                '<div class="col-8">' +
                                    '<div class="blank"><i class="fas fa-couch"></i>空空如也</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    $('#messageBox').html(messageHTML);
    $('#messageDrawer').kendoDrawer({
        mode: 'push',
        template:
            '<ul>' +
                '<li class="k-state-selected" data-role="drawer-item"><i class="fas fa-inbox" title="收件箱"></i>收件箱</li>' +
                '<li data-role="drawer-item"><i class="fas fa-feather" title="写邮件"></i>写邮件</li>' +
                '<li data-role="drawer-item"><i class="fas fa-envelope" title="发件箱"></i>发件箱</li>' +
                '<li data-role="drawer-separator"></li>' +
                '<li data-role="drawer-item"><i class="fas fa-comments" title="短信息"></i>短信息</li>' +
                '<li data-role="drawer-separator"></li>' +
                '<li data-role="drawer-item"><i class="fas fa-address-book" title="通讯录"></i>通讯录</li>' +
            '</ul>',
        mini: {
            width: 40
        },
        width: 120,
        show: function(e) {
            $('#messageDrawerBtn i').removeClass('fa-indent').addClass('fa-outdent');
        },
        hide: function(e) {
            $('#messageDrawerBtn i').removeClass('fa-outdent').addClass('fa-indent');
        },
        itemClick: function (e) {
            $('#messageDrawerContent > div').addClass('hide');
            $('#messageDrawerContent > div').eq(e.item.index()).removeClass('hide');
        }
    });
    $('#messageDrawerBtn').click(function () {
        if ($('#messageDrawer').data('kendoDrawer').drawerContainer.hasClass('k-drawer-expanded')) {
            $('#messageDrawer').data('kendoDrawer').hide();
            $('#messageDrawerBtn i').removeClass('fa-outdent').addClass('fa-indent');
        } else {
            $('#messageDrawer').data('kendoDrawer').show();
            $('#messageDrawerBtn i').removeClass('fa-indent').addClass('fa-outdent');
        }
    });
}

// 消息获取
function getMessage() {
    $.fn.ajaxPost({
        ajaxUrl: messageUrl,
        succeed: function (res) {
            $('#menuH, #menuV').find('.links-message sup').remove();
            if (res.total > 0 && res.total < 100) {
                $('#menuH, #menuV').find('.links-message > .k-link .fa-envelope').after('<sup class="theme-m-bg">' + res.total + '</sup>');
            } else if (res.total >= 100) {
                $('#menuH, #menuV').find('.links-message > .k-link .fa-envelope').after('<sup class="theme-m-bg font-weight-bold">&middot;&middot;&middot;</sup>');
            }
        }
    });
}

// 提醒初始化
function initNotice() {
    var noticeHTML =
        '<div id="noticeTabStrip">' +
            '<ul>' +
                '<li id="notificationTab"><i class="fas fa-volume-up"></i>通知</li>' +
                '<li id="updatingTab"><i class="fas fa-user-clock"></i>动态</li>' +
                '<li id="toDoTab"><i class="fas fa-calendar-check"></i>待办</li>' +
            '</ul>' +
            '<div>' +
                '<div id="systemNotification"></div>' +
                '<div class="noticeTools">' +
                    '<a href="javascript:;"><i class="fas fa-history"></i>查看历史</a>' +
                    '<a href="javascript:noticeReadAll(\'systemNotification\', \'notificationTab\');"><i class="fas fa-eye"></i>全部已读</a>' +
                '</div>' +
            '</div>' +
            '<div>' +
                '<div id="userUpdating"></div>' +
                '<div class="noticeTools">' +
                    '<a href="javascript:;"><i class="fas fa-history"></i>查看历史</a>' +
                    '<a href="javascript:noticeReadAll(\'userUpdating\', \'updatingTab\');"><i class="fas fa-eye"></i>全部已读</a>' +
                '</div>' +
            '</div>' +
            '<div>' +
                '<div id="toDoItems"></div>' +
                '<div class="noticeTools">' +
                    '<a href="javascript:;"><i class="fas fa-history"></i>查看历史</a>' +
                    '<a href="javascript:noticeReadAll(\'toDoItems\', \'toDoTab\');"><i class="fas fa-eye"></i>全部已读</a>' +
                '</div>' +
            '</div>' +
        '</div>';
    $('#noticeBox').html(noticeHTML);
    $('#noticeTabStrip').kendoTabStrip({
        animation: false,
        select: function (e) {
            var noticeType = $(e.contentElement).find('div').first().attr('id');
            if (noticeType === 'systemNotification') {
                getSystemNotification();
            } else if (noticeType === 'userUpdating') {
                getUserUpdating();
            } else if (noticeType === 'toDoItems') {
                getToDoItems();
            }
        }
    }).data('kendoTabStrip').select(0);
}

// 提醒获取
function getNotice() {
    $.fn.ajaxPost({
        ajaxUrl: noticeUrl,
        succeed: function (res) {
            $('#menuH, #menuV').find('.links-notice sup').remove();
            $('#noticeTabStrip').find('.k-tabstrip-items .badge').remove();
            var total = res.systemNotificationTotal + res.userUpdatingTotal + res.toDoItemsTotal;
            if (total > 0 && total < 100) {
                $('#menuH, #menuV').find('.links-notice > .k-link .fa-bell').after('<sup class="theme-m-bg">' + total + '</sup>');
            } else if (total >= 100) {
                $('#menuH, #menuV').find('.links-notice > .k-link .fa-bell').after('<sup class="theme-m-bg font-weight-bold">&middot;&middot;&middot;</sup>');
            }
            if (res.systemNotificationTotal > 0) {
                $('#notificationTab > .k-link').append('<span class="badge theme-s-bg">' + res.systemNotificationTotal + '</span>');
            }
            if (res.userUpdatingTotal > 0) {
                $('#updatingTab > .k-link').append('<span class="badge theme-s-bg">' + res.userUpdatingTotal + '</span>');
            }
            if (res.toDoItemsTotal > 0) {
                $('#toDoTab > .k-link').append('<span class="badge theme-s-bg">' + res.toDoItemsTotal + '</span>');
            }
        }
    });
}

// 新提醒数量计算
function getNoticeNum() {
    var noticeNum = 0;
    $.each($('#noticeTabStrip').find('.k-tabstrip-items .badge'), function () {
        noticeNum += Number($(this).text());
    });
    if ($('#menuH, #menuV').find('.links-notice sup').length === 0) {
        $('#menuH, #menuV').find('.links-notice > .k-link .fa-bell').after('<sup class="theme-m-bg"></sup>');
    }
    if (noticeNum > 0 && noticeNum < 100) {
        $('#menuH, #menuV').find('.links-notice sup').removeClass('font-weight-bold').text(noticeNum);
    } else if (noticeNum >= 100) {
        $('#menuH, #menuV').find('.links-notice sup').addClass('font-weight-bold').text('&middot;&middot;&middot;');
    } else {
        $('#menuH, #menuV').find('.links-notice sup').remove();
    }
}

// 系统通知获取
function getSystemNotification() {
    if ($('#systemNotification').data('kendoListView')) {
        $('#systemNotification').data('kendoListView').destroy();
    }
    $('#systemNotification').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'systemNotification'
                        },
                        ajaxUrl: systemNotificationUrl,
                        succeed: function (res) {
                            $('#notificationTab').find('.badge').remove();
                            options.success(res);
                            if (res.systemNotification.length > 0) {
                                $('#notificationTab > .k-link').append('<span class="badge theme-s-bg">' + res.systemNotification.length + '</span>');
                                getNoticeNum();
                            } else {
                                $('#systemNotification').html('<div class="blank">暂时没有新的系统通知~</div>');
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
            pageSize: 6
        },
        height: 500,
        scrollable: 'endless',
        selectable: true,
        template:
            '<div class="media">' +
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
            if ($(e.sender.select()).find('.media-body').hasClass('unread')) {
                $.fn.ajaxPost({
                    ajaxData: {
                        id: e.sender.dataItem(e.sender.select()).id,
                        type: 'systemNotification'
                    },
                    ajaxUrl: noticeReadUrl,
                    succeed: function () {
                        $(e.sender.select()).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                        var badgeDom = $('#notificationTab').find('.badge');
                        if (badgeDom.text() === '1') {
                            badgeDom.remove();
                        } else {
                            badgeDom.text(Number(badgeDom.text()) - 1);
                        }
                        getNoticeNum();
                    },
                    failed: function () {
                        alertMsg('标记已读出错！', 'error');
                    }
                });
            }
        }
    });
}

// 个人动态获取
function getUserUpdating() {
    if ($('#userUpdating').data('kendoListView')) {
        $('#userUpdating').data('kendoListView').destroy();
    }
    $('#userUpdating').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'userUpdating'
                        },
                        ajaxUrl: userUpdatingUrl,
                        succeed: function (res) {
                            $('#updatingTab').find('.badge').remove();
                            options.success(res);
                            if (res.userUpdating.length > 0) {
                                $('#updatingTab > .k-link').append('<span class="badge theme-s-bg">' + res.userUpdating.length + '</span>');
                                getNoticeNum();
                            } else {
                                $('#userUpdating').html('<div class="blank">暂时没有新的个人动态~</div>');
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
            pageSize: 6
        },
        height: 500,
        scrollable: 'endless',
        selectable: true,
        template:
            '<div class="media">' +
                '<img src="#= avatar #" alt="#= nickName #">' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            if ($(e.sender.select()).find('.media-body').hasClass('unread')) {
                $.fn.ajaxPost({
                    ajaxData: {
                        id: e.sender.dataItem(e.sender.select()).id,
                        type: 'userUpdating'
                    },
                    ajaxUrl: noticeReadUrl,
                    succeed: function () {
                        $(e.sender.select()).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                        var badgeDom = $('#updatingTab').find('.badge');
                        if (badgeDom.text() === '1') {
                            badgeDom.remove();
                        } else {
                            badgeDom.text(Number(badgeDom.text()) - 1);
                        }
                        getNoticeNum();
                    },
                    failed: function () {
                        alertMsg('标记已读出错！', 'error');
                    }
                });
            }
        }
    });
}

// 待办事项获取
function getToDoItems() {
    if ($('#toDoItems').data('kendoListView')) {
        $('#toDoItems').data('kendoListView').destroy();
    }
    $('#toDoItems').kendoListView({
        dataSource: {
            transport: {
                read: function (options) {
                    $.fn.ajaxPost({
                        ajaxData: {
                            type: 'toDoItems'
                        },
                        ajaxUrl: toDoItemsUrl,
                        succeed: function (res) {
                            $('#toDoTab').find('.badge').remove();
                            options.success(res);
                            if (res.toDoItems.length > 0) {
                                $('#toDoTab > .k-link').append('<span class="badge theme-s-bg">' + res.toDoItems.length + '</span>');
                                getNoticeNum();
                            } else {
                                $('#toDoItems').html('<div class="blank">暂时没有新的待办事项~</div>');
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
            pageSize: 6
        },
        height: 500,
        scrollable: 'endless',
        selectable: true,
        template:
            '<div class="media">' +
                '<div class="media-body# if (unread) { # unread# } #">' +
                    '<h5><em class="k-notification-# if (stateType === \'1\') { #success# } else if (stateType === \'2\') { #info# } else if (stateType === \'3\') { #warning# } else if (stateType === \'4\') { #error# } else { #normal# } #">#= state #</em>#= title #</h5>' +
                    '<p>#= content #</p>' +
                    '<time>#= time #</time>' +
                '</div>' +
            '</div>',
        change: function (e) {
            if ($(e.sender.select()).find('.media-body').hasClass('unread')) {
                $.fn.ajaxPost({
                    ajaxData: {
                        id: e.sender.dataItem(e.sender.select()).id,
                        type: 'toDoItems'
                    },
                    ajaxUrl: noticeReadUrl,
                    succeed: function () {
                        $(e.sender.select()).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
                        var badgeDom = $('#toDoTab').find('.badge');
                        if (badgeDom.text() === '1') {
                            badgeDom.remove();
                        } else {
                            badgeDom.text(Number(badgeDom.text()) - 1);
                        }
                        getNoticeNum();
                    },
                    failed: function () {
                        alertMsg('标记已读出错！', 'error');
                    }
                });
            }
        }
    });
}

// 提醒全部已读
function noticeReadAll(type, tab) {
    $.fn.ajaxPost({
        ajaxData: {
            type: type
        },
        ajaxUrl: noticeReadAllUrl,
        succeed: function () {
            $('#' + type).find('.media-body').removeClass('unread').find('.theme-m').removeClass('theme-m');
            $('#' + tab).find('.badge').remove();
            getNoticeNum();
        },
        failed: function () {
            alertMsg('标记全部已读出错！', 'error');
        }
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

// 天气预报弹窗
function getWeather() {
    var divWindow = $('<div class="window-box" id="weatherBox"></div>').kendoWindow({
        animation: {open: {effects: 'fade:in'}, close: {effects: 'fade:out'}},
        title: '天气预报',
        width: 360,
        modal: true,
        pinned: true,
        resizable: false,
        open: function () {
            // 获取定位信息
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        getWeatherInfo(position.coords.longitude + ',' + position.coords.latitude); // 经纬度定位
                    },
                    function (positionError) {
                        getWeatherInfo('auto_ip'); // 自动 IP 定位
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

// 天气预报信息
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
            var basic = res.HeWeather6[0].basic, // 基础信息
                now = res.HeWeather6[0].now, // 实况天气
                daily_forecast = res.HeWeather6[0].daily_forecast, // 3-10天天气预报
                hourly = res.HeWeather6[0].hourly, // 逐小时预报
                lifestyle = res.HeWeather6[0].lifestyle, // 生活指数
                update = res.HeWeather6[0].update, // 更新时间
                weatherCode = res.HeWeather6[0].now.cond_code; // 天气状况代码
            // 位置信息
            $('#weatherBox .loc').html(basic.cnty + ' - ' + basic.admin_area + ' - ' + basic.parent_city + ' - ' + basic.location + '<i class="flag-icon flag-icon-' + basic.cid.substr(0, 2).toLowerCase() + '"></i>');
            // 更新时间
            $('#weatherBox time').html('更新于：' + update.loc);
            // 温度
            $('#weatherBox .tmp').html(now.tmp);
            // 天气描述
            $('#weatherBox .cond_txt').html(now.cond_txt);
            // 天气图标
            $('#weatherBox .cond_code').removeClass('wi-na').addClass(getWeatherIcon(kendo.toString(kendo.parseDate(update.loc), 'HH'), weatherCode));
            // 空气质量
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
            // 温度区间
            $('#weatherBox .tmp_m').html('<i class="wi wi-thermometer theme-m"></i>' + daily_forecast[0].tmp_min + '℃~' + daily_forecast[0].tmp_max + '℃');
            // 风向风力
            $('#weatherBox .wind').html('<i class="wi wi-strong-wind theme-m"></i>' + now.wind_dir + now.wind_sc + '级');
            // 相对湿度
            $('#weatherBox .hum').html('<i class="wi wi-humidity theme-m"></i>湿度：' + daily_forecast[0].hum + '%');
            // 紫外线强度
            if (basic.cnty === '中国') {
                // 国内
                $('#weatherBox .uv_index').html('<i class="wi wi-umbrella theme-m"></i>紫外线：' + lifestyle[5].brf);
            } else {
                // 国外
                $('#weatherBox .uv_index').html('<i class="wi wi-umbrella theme-m"></i>紫外线：' + daily_forecast[0].uv_index + '级');
            }
            // 日升时间
            $('#weatherBox .sr').html('<i class="wi wi-sunrise theme-m"></i>日升：' + daily_forecast[0].sr);
            // 日落时间
            $('#weatherBox .ss').html('<i class="wi wi-sunset theme-m"></i>日落：' + daily_forecast[0].ss);
            // 月升时间
            $('#weatherBox .mr').html('<i class="wi wi-moonrise theme-m"></i>月升：' + daily_forecast[0].mr);
            // 月落时间
            $('#weatherBox .ms').html('<i class="wi wi-moonset theme-m"></i>月落：' + daily_forecast[0].ms);
            // 未来 24 小时温度曲线
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
            // 今天天气
            $('#weatherBox .today').html('<span>今天</span><span class="icon"><i class="wi ' + getWeatherIcon(8, daily_forecast[0].cond_code_d) + ' theme-m"></i><i class="wi ' + getWeatherIcon(20, daily_forecast[0].cond_code_n) + ' theme-s"></i></span><span>' + daily_forecast[0].tmp_min + '℃ ~ ' + daily_forecast[0].tmp_max + '℃</span><span>日：' + daily_forecast[0].cond_txt_d + '</span><span>夜：' + daily_forecast[0].cond_txt_n + '</span>');
            // 明天天气
            $('#weatherBox .tomorrow').html('<span>明天</span><span class="icon"><i class="wi ' + getWeatherIcon(8, daily_forecast[1].cond_code_d) + ' theme-m"></i><i class="wi ' + getWeatherIcon(20, daily_forecast[1].cond_code_n) + ' theme-s"></i></span><span>' + daily_forecast[1].tmp_min + '℃ ~ ' + daily_forecast[1].tmp_max + '℃</span><span>日：' + daily_forecast[1].cond_txt_d + '</span><span>夜：' + daily_forecast[1].cond_txt_n + '</span>');
            // 后天天气
            $('#weatherBox .after_tomorrow').html('<span>后天</span><span class="icon"><i class="wi ' + getWeatherIcon(8, daily_forecast[2].cond_code_d) + ' theme-m"></i><i class="wi ' + getWeatherIcon(20, daily_forecast[2].cond_code_n) + ' theme-s"></i></span><span>' + daily_forecast[2].tmp_min + '℃ ~ ' + daily_forecast[2].tmp_max + '℃</span><span>日：' + daily_forecast[2].cond_txt_d + '</span><span>夜：' + daily_forecast[2].cond_txt_n + '</span>');
        },
        error: function (res) {
            alertMsg('获取天气数据出错！', 'error');
        }
    });
}

// 天气图标
function getWeatherIcon(time, weatherCode) {
    if (time >= 6 && time < 18) {
        if (weatherCode === '100') { // 日间晴
            return 'wi-day-sunny';
        } else if (weatherCode === '101') { // 日间多云
            return 'wi-cloudy';
        } else if (weatherCode === '102') { // 日间少云
            return 'wi-day-sunny-overcast';
        } else if (weatherCode === '103') { // 日间晴间多云
            return 'wi-day-cloudy';
        } else if (weatherCode === '104') { // 日间阴
            return 'wi-cloud';
        } else if (weatherCode === '200') { // 日间有风
            return 'wi-windy';
        } else if (weatherCode === '201') { // 日间平静
            return 'wi-day-cloudy-windy';
        } else if (weatherCode === '202') { // 日间微风
            return 'wi-cloudy-windy';
        } else if (weatherCode === '203') { // 日间和风
            return 'wi-day-cloudy-gusts';
        } else if (weatherCode === '204') { // 日间清风
            return 'wi-cloudy-gusts';
        } else if (weatherCode === '205') { // 日间强风/劲风
            return 'wi-strong-wind';
        } else if (weatherCode === '206') { // 日间疾风
            return 'wi-strong-wind';
        } else if (weatherCode === '207') { // 日间大风
            return 'wi-strong-wind';
        } else if (weatherCode === '208') { // 日间烈风
            return 'wi-strong-wind';
        } else if (weatherCode === '209') { // 日间风暴
            return 'wi-strong-wind';
        } else if (weatherCode === '210') { // 日间狂爆风
            return 'wi-strong-wind';
        } else if (weatherCode === '211') { // 日间飓风
            return 'wi-hurricane';
        } else if (weatherCode === '212') { // 日间龙卷风
            return 'wi-tornado';
        } else if (weatherCode === '213') { // 日间热带风暴
            return 'wi-hurricane';
        } else if (weatherCode === '300') { // 日间阵雨
            return 'wi-day-sprinkle';
        } else if (weatherCode === '301') { // 日间强阵雨
            return 'wi-day-showers';
        } else if (weatherCode === '302') { // 日间雷阵雨
            return 'wi-day-storm-showers';
        } else if (weatherCode === '303') { // 日间强雷阵雨
            return 'wi-storm-showers';
        } else if (weatherCode === '304') { // 日间雷阵雨伴有冰雹
            return 'wi-day-sleet-storm';
        } else if (weatherCode === '305') { // 日间小雨
            return 'wi-day-rain';
        } else if (weatherCode === '306') { // 日间中雨
            return 'wi-showers';
        } else if (weatherCode === '307') { // 日间大雨
            return 'wi-hail';
        } else if (weatherCode === '308') { // 日间极端降雨
            return 'wi-rain-wind';
        } else if (weatherCode === '309') { // 日间毛毛雨/细雨
            return 'wi-raindrops';
        } else if (weatherCode === '310') { // 日间暴雨
            return 'wi-rain';
        } else if (weatherCode === '311') { // 日间大暴雨
            return 'wi-rain';
        } else if (weatherCode === '312') { // 日间特大暴雨
            return 'wi-rain';
        } else if (weatherCode === '313') { // 日间冻雨
            return 'wi-sleet';
        } else if (weatherCode === '314') { // 日间小到中雨
            return 'wi-showers';
        } else if (weatherCode === '315') { // 日间中到大雨
            return 'wi-hail';
        } else if (weatherCode === '316') { // 日间大到暴雨
            return 'wi-rain';
        } else if (weatherCode === '317') { // 日间暴雨到大暴雨
            return 'wi-rain';
        } else if (weatherCode === '318') { // 日间大暴雨到特大暴雨
            return 'wi-rain';
        } else if (weatherCode === '399') { // 日间雨
            return 'wi-raindrop';
        } else if (weatherCode === '400') { // 日间小雪
            return 'wi-day-snow-wind';
        } else if (weatherCode === '401') { // 日间中雪
            return 'wi-snow';
        } else if (weatherCode === '402') { // 日间大雪
            return 'wi-snow-wind';
        } else if (weatherCode === '403') { // 日间暴雪
            return 'wi-snow-wind';
        } else if (weatherCode === '404') { // 日间雨夹雪
            return 'wi-rain-mix';
        } else if (weatherCode === '405') { // 日间雨雪天气
            return 'wi-rain-mix';
        } else if (weatherCode === '406') { // 日间阵雨夹雪
            return 'wi-day-snow-thunderstorm';
        } else if (weatherCode === '407') { // 日间阵雪
            return 'wi-day-snow';
        } else if (weatherCode === '408') { // 日间小到中雪
            return 'wi-snow';
        } else if (weatherCode === '409') { // 日间中到大雪
            return 'wi-snow-wind';
        } else if (weatherCode === '410') { // 日间大到暴雪
            return 'wi-snow-wind';
        } else if (weatherCode === '499') { // 日间雪
            return 'wi-snowflake-cold';
        } else if (weatherCode === '500') { // 日间薄雾
            return 'wi-day-fog';
        } else if (weatherCode === '501') { // 日间雾
            return 'wi-day-fog';
        } else if (weatherCode === '502') { // 日间霾
            return 'wi-smoke';
        } else if (weatherCode === '503') { // 日间扬沙
            return 'wi-dust';
        } else if (weatherCode === '504') { // 日间浮尘
            return 'wi-dust';
        } else if (weatherCode === '507') { // 日间沙尘暴
            return 'wi-sandstorm';
        } else if (weatherCode === '508') { // 日间强沙尘暴
            return 'wi-sandstorm';
        } else if (weatherCode === '509') { // 日间浓雾
            return 'wi-fog';
        } else if (weatherCode === '510') { // 日间强浓雾
            return 'wi-fog';
        } else if (weatherCode === '511') { // 日间中度霾
            return 'wi-smog';
        } else if (weatherCode === '512') { // 日间重度霾
            return 'wi-smog';
        } else if (weatherCode === '513') { // 日间严重霾
            return 'wi-smog';
        } else if (weatherCode === '514') { // 日间大雾
            return 'wi-fog';
        } else if (weatherCode === '515') { // 日间特强浓雾
            return 'wi-fog';
        } else if (weatherCode === '900') { // 日间热
            return 'wi-hot';
        } else if (weatherCode === '901') { // 日间冷
            return 'wi-snowflake-cold';
        } else if (weatherCode === '999') { // 日间未知
            return 'wi-na';
        } else {
            return 'wi-na';
        }
    } else {
        if (weatherCode === '100') { // 夜间晴
            return 'wi-night-clear';
        } else if (weatherCode === '101') { // 夜间多云
            return 'wi-cloudy';
        } else if (weatherCode === '102') { // 夜间少云
            return 'wi-night-alt-partly-cloudy';
        } else if (weatherCode === '103') { // 夜间晴间多云
            return 'wi-night-alt-cloudy';
        } else if (weatherCode === '104') { // 夜间阴
            return 'wi-cloud';
        } else if (weatherCode === '200') { // 夜间有风
            return 'wi-windy';
        } else if (weatherCode === '201') { // 夜间平静
            return 'wi-night-alt-cloudy-windy';
        } else if (weatherCode === '202') { // 夜间微风
            return 'wi-cloudy-windy';
        } else if (weatherCode === '203') { // 夜间和风
            return 'wi-night-alt-cloudy-gusts';
        } else if (weatherCode === '204') { // 夜间清风
            return 'wi-cloudy-gusts';
        } else if (weatherCode === '205') { // 夜间强风/劲风
            return 'wi-strong-wind';
        } else if (weatherCode === '206') { // 夜间疾风
            return 'wi-strong-wind';
        } else if (weatherCode === '207') { // 夜间大风
            return 'wi-strong-wind';
        } else if (weatherCode === '208') { // 夜间烈风
            return 'wi-strong-wind';
        } else if (weatherCode === '209') { // 夜间风暴
            return 'wi-strong-wind';
        } else if (weatherCode === '210') { // 夜间狂爆风
            return 'wi-strong-wind';
        } else if (weatherCode === '211') { // 夜间飓风
            return 'wi-hurricane';
        } else if (weatherCode === '212') { // 夜间龙卷风
            return 'wi-tornado';
        } else if (weatherCode === '213') { // 夜间热带风暴
            return 'wi-hurricane';
        } else if (weatherCode === '300') { // 夜间阵雨
            return 'wi-night-alt-sprinkle';
        } else if (weatherCode === '301') { // 夜间强阵雨
            return 'wi-night-alt-showers';
        } else if (weatherCode === '302') { // 夜间雷阵雨
            return 'wi-night-alt-storm-showers';
        } else if (weatherCode === '303') { // 夜间强雷阵雨
            return 'wi-storm-showers';
        } else if (weatherCode === '304') { // 夜间雷阵雨伴有冰雹
            return 'wi-night-alt-sleet-storm';
        } else if (weatherCode === '305') { // 夜间小雨
            return 'wi-night-alt-rain';
        } else if (weatherCode === '306') { // 夜间中雨
            return 'wi-showers';
        } else if (weatherCode === '307') { // 夜间大雨
            return 'wi-hail';
        } else if (weatherCode === '308') { // 夜间极端降雨
            return 'wi-rain-wind';
        } else if (weatherCode === '309') { // 夜间毛毛雨/细雨
            return 'wi-raindrops';
        } else if (weatherCode === '310') { // 夜间暴雨
            return 'wi-rain';
        } else if (weatherCode === '311') { // 夜间大暴雨
            return 'wi-rain';
        } else if (weatherCode === '312') { // 夜间特大暴雨
            return 'wi-rain';
        } else if (weatherCode === '313') { // 夜间冻雨
            return 'wi-sleet';
        } else if (weatherCode === '314') { // 夜间小到中雨
            return 'wi-showers';
        } else if (weatherCode === '315') { // 夜间中到大雨
            return 'wi-hail';
        } else if (weatherCode === '316') { // 夜间大到暴雨
            return 'wi-rain';
        } else if (weatherCode === '317') { // 夜间暴雨到大暴雨
            return 'wi-rain';
        } else if (weatherCode === '318') { // 夜间大暴雨到特大暴雨
            return 'wi-rain';
        } else if (weatherCode === '399') { // 夜间雨
            return 'wi-raindrop';
        } else if (weatherCode === '400') { // 夜间小雪
            return 'wi-night-alt-snow-wind';
        } else if (weatherCode === '401') { // 夜间中雪
            return 'wi-snow';
        } else if (weatherCode === '402') { // 夜间大雪
            return 'wi-snow-wind';
        } else if (weatherCode === '403') { // 夜间暴雪
            return 'wi-snow-wind';
        } else if (weatherCode === '404') { // 夜间雨夹雪
            return 'wi-rain-mix';
        } else if (weatherCode === '405') { // 夜间雨雪天气
            return 'wi-rain-mix';
        } else if (weatherCode === '406') { // 夜间阵雨夹雪
            return 'wi-night-alt-snow-thunderstorm';
        } else if (weatherCode === '407') { // 夜间阵雪
            return 'wi-night-alt-snow';
        } else if (weatherCode === '408') { // 夜间小到中雪
            return 'wi-snow';
        } else if (weatherCode === '409') { // 夜间中到大雪
            return 'wi-snow-wind';
        } else if (weatherCode === '410') { // 夜间大到暴雪
            return 'wi-snow-wind';
        } else if (weatherCode === '499') { // 夜间雪
            return 'wi-snowflake-cold';
        } else if (weatherCode === '500') { // 夜间薄雾
            return 'wi-night-fog';
        } else if (weatherCode === '501') { // 夜间雾
            return 'wi-night-fog';
        } else if (weatherCode === '502') { // 夜间霾
            return 'wi-smoke';
        } else if (weatherCode === '503') { // 夜间扬沙
            return 'wi-dust';
        } else if (weatherCode === '504') { // 夜间浮尘
            return 'wi-dust';
        } else if (weatherCode === '507') { // 夜间沙尘暴
            return 'wi-sandstorm';
        } else if (weatherCode === '508') { // 夜间强沙尘暴
            return 'wi-sandstorm';
        } else if (weatherCode === '509') { // 夜间浓雾
            return 'wi-fog';
        } else if (weatherCode === '510') { // 夜间强浓雾
            return 'wi-fog';
        } else if (weatherCode === '511') { // 夜间中度霾
            return 'wi-smog';
        } else if (weatherCode === '512') { // 夜间重度霾
            return 'wi-smog';
        } else if (weatherCode === '513') { // 夜间严重霾
            return 'wi-smog';
        } else if (weatherCode === '514') { // 夜间大雾
            return 'wi-fog';
        } else if (weatherCode === '515') { // 夜间特强浓雾
            return 'wi-fog';
        } else if (weatherCode === '900') { // 夜间热
            return 'wi-hot';
        } else if (weatherCode === '901') { // 夜间冷
            return 'wi-snowflake-cold';
        } else if (weatherCode === '999') { // 夜间未知
            return 'wi-na';
        } else {
            return 'wi-na';
        }
    }
}

// 农历基础数据
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

// 万年历弹窗
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
                                '#= getMoonIcon(lunar.lunarDay).substr(0, getMoonIcon(lunar.lunarDay).length - 2) #' +
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
                        '<div class="moonPhase"></div>' +
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

// 万年历显示
function setLunar(date) {
    var lunar = lunarData.solar2lunar(date.getFullYear(), (date.getMonth() + 1), date.getDate());
    // 年月
    $('#lunarShow .month').html(kendo.toString(date, "yyyy年MM月"));
    // 日
    $('#lunarShow .day').html(kendo.toString(date, "dd"));
    // 时间、星期、节气
    if (lunar.isTerm) {
        $('#lunarShow .week').html('<i class="wi wi-time-' + kendo.toString(date, "h") + '"></i>' + kendo.toString(date, "dddd") + '【' + lunar.term + '】');
    } else {
        $('#lunarShow .week').html('<i class="wi wi-time-' + kendo.toString(date, "h") + '"></i>' + kendo.toString(date, "dddd"));
    }
    // 农历年月日
    $('#lunarShow .lunarDay').html(lunar.zodiac + '年：' + lunar.lunarMonthCn + lunar.lunarDayCn);
    // 月相
    $('#lunarShow .moonPhase').html(getMoonIcon(lunar.lunarDay));
    // 节假日
    $('#lunarShow .festival').html('');
    // 农历节假日
    if (lunar.lunarFestival) {
        $('#lunarShow .festival').show().append('<span>' + lunar.lunarFestival + '</span>');
    }
    // 公历节假日
    if (lunar.solarFestival) {
        $('#lunarShow .festival').show().append('<span>' + lunar.solarFestival + '</span>');
    }
    $('#lunarShow .festival').prepend('--=').append('=--');
    if (!(lunar.lunarFestival) && !(lunar.solarFestival)) {
        $('#lunarShow .festival').hide();
    }
    // 天干地支年月日
    $('#lunarShow .lunarYear').html('<span>' + lunar.gzYear + '年</span><span>' + lunar.gzMonth + '月</span><span>' + lunar.gzDay + '日</span>');
}

// 月相图标及名称
function getMoonIcon(lunarDay) {
    if (lunarDay === 1) {
        return '<i class="wi wi-moon-new"></i>朔月';
    } else if (lunarDay === 2) {
        return '<i class="wi wi-moon-waxing-crescent-1"></i>既朔';
    } else if (lunarDay === 3) {
        return '<i class="wi wi-moon-waxing-crescent-2"></i>眉月';
    } else if (lunarDay === 4) {
        return '<i class="wi wi-moon-waxing-crescent-3"></i>眉月';
    } else if (lunarDay === 5) {
        return '<i class="wi wi-moon-waxing-crescent-4"></i>盈眉';
    } else if (lunarDay === 6) {
        return '<i class="wi wi-moon-waxing-crescent-5"></i>夕月';
    } else if (lunarDay === 7) {
        return '<i class="wi wi-moon-waxing-crescent-6"></i>上弦';
    } else if (lunarDay === 8) {
        return '<i class="wi wi-moon-first-quarter"></i>上弦';
    } else if (lunarDay === 9) {
        return '<i class="wi wi-moon-waxing-gibbous-1"></i>九夜';
    } else if (lunarDay === 10) {
        return '<i class="wi wi-moon-waxing-gibbous-2"></i>宵月';
    } else if (lunarDay === 11) {
        return '<i class="wi wi-moon-waxing-gibbous-3"></i>宵月';
    } else if (lunarDay === 12) {
        return '<i class="wi wi-moon-waxing-gibbous-4"></i>宵月';
    } else if (lunarDay === 13) {
        return '<i class="wi wi-moon-waxing-gibbous-5"></i>盈凸';
    } else if (lunarDay === 14) {
        return '<i class="wi wi-moon-waxing-gibbous-6"></i>小望';
    } else if (lunarDay === 15) {
        return '<i class="wi wi-moon-full"></i>望月';
    } else if (lunarDay === 16) {
        return '<i class="wi wi-moon-full"></i>既望';
    } else if (lunarDay === 17) {
        return '<i class="wi wi-moon-waning-gibbous-1"></i>立待';
    } else if (lunarDay === 18) {
        return '<i class="wi wi-moon-waning-gibbous-2"></i>居待';
    } else if (lunarDay === 19) {
        return '<i class="wi wi-moon-waning-gibbous-3"></i>寝待';
    } else if (lunarDay === 20) {
        return '<i class="wi wi-moon-waning-gibbous-4"></i>更待';
    } else if (lunarDay === 21) {
        return '<i class="wi wi-moon-waning-gibbous-5"></i>亏凸';
    } else if (lunarDay === 22) {
        return '<i class="wi wi-moon-waning-gibbous-6"></i>下弦';
    } else if (lunarDay === 23) {
        return '<i class="wi wi-moon-third-quarter"></i>下弦';
    } else if (lunarDay === 24) {
        return '<i class="wi wi-moon-waning-crescent-1"></i>有明';
    } else if (lunarDay === 25) {
        return '<i class="wi wi-moon-waning-crescent-2"></i>有明';
    } else if (lunarDay === 26) {
        return '<i class="wi wi-moon-waning-crescent-3"></i>亏眉';
    } else if (lunarDay === 27) {
        return '<i class="wi wi-moon-waning-crescent-4"></i>亏眉';
    } else if (lunarDay === 28) {
        return '<i class="wi wi-moon-waning-crescent-5"></i>残月';
    } else if (lunarDay === 29) {
        return '<i class="wi wi-moon-waning-crescent-6"></i>晓月';
    } else if (lunarDay === 30) {
        return '<i class="wi wi-moon-new"></i>晦月';
    }
}

// 便签弹窗
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
                                total: function(res) {
                                    return res.result.length;
                                },
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
                            // 自动生成时间
                            e.model.set('noteTime', kendo.toString(new Date(), 'yyyy-MM-dd HH:mm:ss'));
                        },
                        dataBound: function () {
                            // 便签颜色
                            $('#noteListView .alert:nth-child(6n+1)').addClass('alert-primary');
                            $('#noteListView .alert:nth-child(6n+2)').addClass('alert-secondary');
                            $('#noteListView .alert:nth-child(6n+3)').addClass('alert-success');
                            $('#noteListView .alert:nth-child(6n+4)').addClass('alert-danger');
                            $('#noteListView .alert:nth-child(6n+5)').addClass('alert-warning');
                            $('#noteListView .alert:nth-child(6n+6)').addClass('alert-info');
                        }
                    });
                    // 便签新增
                    $('#noteBox .k-add-button').click(function (e) {
                        $('#noteListView').data('kendoListView').add();
                        e.preventDefault();
                    });
                    // 便签查找
                    $('#noteSearch').keyup(function () {
                        $('#noteListView').data('kendoListView').dataSource.filter({
                            logic: 'or',
                            filters: [
                                { field: 'noteContent', operator: 'contains', value: $(this).val() },
                                { field: 'noteTime', operator: 'contains', value: $(this).val() }
                            ]
                        });
                    });
                    // 便签清空
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
                    '<a class="k-link k-order-button" href="javascript:;" title="降序" onclick="orderNote(\'desc\');"><i class="fas fa-sort-amount-down"></i></a>' +
                    '<a class="k-link k-order-button" href="javascript:;" title="升序" onclick="orderNote(\'asc\');"><i class="fas fa-sort-amount-up-alt"></i></a>' +
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
        // 本地数据库新建
        req.onupgradeneeded = function (e) {
            db = e.target.result;
            if (!db.objectStoreNames.contains('list')) {
                db.createObjectStore('list', { keyPath: 'id', autoIncrement: true });
            }
        };
        // 本地数据库读取
        req.onsuccess = function (e) {
            db = req.result;
            divWindow.content(noteHtml).center().open();
        };
        // 本地数据库出错
        req.onerror = function (e) {
            alertMsg('获取便签数据出错！', 'error');
        };
    } else {
        alertMsg('您的浏览器不支持便签功能！', 'error');
    }
}

// 刷新便签
function refreshNote() {
    $('#noteListView').data('kendoListView').dataSource.read();
}

// 排序便签
function orderNote(dir) {
    $('#noteListView').data('kendoListView').dataSource.sort({
        field: 'id',
        dir: dir
    });
    $('#noteBox .k-order-button').toggle();
}