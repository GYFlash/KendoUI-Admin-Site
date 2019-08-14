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