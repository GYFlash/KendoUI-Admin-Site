$(function () {
    // 获取搜索关键字
    if ($('#menuH .global-search input[type=search]').prev().find('.k-input').val() !== '') {
        $('#searchKeywords').val($('#menuH .global-search input[type=search]').prev().find('.k-input').val());
    } else {
        $('#searchKeywords').val($('#menuV .global-search input[type=search]').prev().find('.k-input').val());
    }
    // 生成工具栏
    $('#toolbar').kendoToolBar({
        resizable: false,
        items: [
            { template: '<a class="k-button k-button-icontext orderBtn" href="javascript:;" onclick="order(\'desc\');"><span class="k-icon k-i-sort-asc-sm"></span>升序</a><a class="k-button k-button-icontext orderBtn hide" href="javascript:;" onclick="order(\'asc\');"><span class="k-icon k-i-sort-desc-sm"></span>降序</a>' },
            { template: '<input class="k-textbox w-100" id="search" name="search" type="text" placeholder="结果内查找...">' },
            { template: '<select class="w-100" id="filter" name="filter"></select>' },
            { type: 'spacer' },
            { template: '<a class="k-button k-button-icontext theme-m-box" href="javascript:;" onclick="switchView(\'list\', this)"><span class="k-icon k-i-grid-layout"></span>列表</a>' },
            { template: '<a class="k-button k-button-icontext" href="javascript:;" onclick="switchView(\'pic\', this);"><span class="k-icon k-i-group"></span>大图</a>' }
        ]
    });
    // 筛选
    $('#filter').kendoDropDownList({
        dataSource: {
            data: [
                { text: '男', value: '1' },
                { text: '女', value: '2' }
            ]
        },
        optionLabel: "- 筛选 -",
        dataValueField: 'value',
        dataTextField: 'text',
        change: function (e) {
            $('#listView').data('kendoListView').dataSource.filter({
                field: 'gender',
                operator: 'contains',
                value: this.value()
            });
            $('#toolbar .k-i-grid-layout').parent().click();
        }
    });
    // 定义数据源
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) { readItem(options, 'json/list.json') }
        },
        schema: {
            total: 'total',
            data: 'data',
            model: {
                id: 'id',
                fields: {
                    userName: { type: 'string' },
                    realName: { type: 'string' },
                    nickName: { type: 'string' },
                    password: { type: 'string' },
                    confirmPassword: { type: 'string' },
                    online: { type: 'boolean' },
                    gender: { type: 'string' },
                    age: { type: 'number' },
                    height: { type: 'number' },
                    bloodType: { type: 'string' },
                    birthday: { type: 'date',
                        parse: function (e) {
                            return kendo.toString(kendo.parseDate(e), 'yyyy-MM-dd');
                        }
                    },
                    mateBirthday: { type: 'date',
                        parse: function (e) {
                            return kendo.toString(kendo.parseDate(e), 'yyyy-MM-dd');
                        }
                    },
                    creditCard: { type: 'string' },
                    asset: { type: 'number' },
                    nativePlace: { type: 'object' },
                    domicile: { type: 'object' },
                    nation: { type: 'object' },
                    zodiac: { type: 'object' },
                    language: { type: 'string' },
                    education: { type: 'object' },
                    graduation: { type: 'date',
                        parse: function (e) {
                            return kendo.toString(new Date(e), 'yyyy');
                        }
                    },
                    firstJob: { type: 'date',
                        parse: function (e) {
                            return kendo.toString(new Date(e), 'yyyy-MM');
                        }
                    },
                    mobile: { type: 'string' },
                    email: { type: 'string' },
                    homepage: { type: 'string' },
                    getUp: { type: 'date',
                        parse: function (e) {
                            return kendo.toString(kendo.parseDate(e), 'HH:mm');
                        }
                    },
                    importantMoment: { type: 'date',
                        parse: function (e) {
                            return kendo.toString(kendo.parseDate(e), 'yyyy-MM-dd HH:mm');
                        }
                    },
                    character: { type: 'number' },
                    color: { type: 'string' },
                    constellation: { type: 'object' },
                    tourism: { type: 'object' },
                    evaluation: { type: 'number' },
                    summary: { type: 'string' },
                    photo: { type: 'object' },
                    sign: { type: 'string' }
                }
            }
        },
        pageSize: 12
    });
    // 获取数据源生成列表
    $('#listView').kendoListView({
        dataSource: dataSource,
        template: kendo.template($('#listTemplate').html())
    });
    // 获取数据源并分页
    $('#pager').kendoPager({
        dataSource: dataSource,
        buttonCount: 5,
        input: true,
        pageSizes: [5, 10, 15, 20, 25, 30, 50, 100, 'all'],
        refresh: true
    });
    // 搜索
    $('#search').keyup(function () {
        $('#listView').data('kendoListView').dataSource.filter({
            logic: 'or',
            filters: [
                { field: 'userName', operator: 'contains', value: $(this).val() },
                { field: 'realName', operator: 'contains', value: $(this).val() },
                { field: 'nickName', operator: 'contains', value: $(this).val() },
                { field: 'age', operator: 'eq', value: $(this).val() },
                { field: 'height', operator: 'eq', value: $(this).val() },
                { field: 'birthday', operator: 'contains', value: $(this).val() },
                { field: 'creditCard', operator: 'contains', value: $(this).val() },
                { field: 'asset', operator: 'contains', value: $(this).val() },
                { field: 'language', operator: 'contains', value: $(this).val() },
                { field: 'mobile', operator: 'contains', value: $(this).val() },
                { field: 'email', operator: 'contains', value: $(this).val() },
                { field: 'homepage', operator: 'contains', value: $(this).val() }
            ]
        });
        $('#toolbar .k-i-grid-layout').parent().click();
    });
});

// 排序
function order(dir) {
    $('#listView').data('kendoListView').dataSource.sort({
        field: 'id',
        dir: dir
    });
    $('.orderBtn').toggle();
    $('#toolbar .k-i-grid-layout').parent().click();
}

// 切换
function switchView(type, dom) {
    if (type === 'list') {
        $('.picArea').hide();
        $('#listView').removeClass('row mx-0 d-flex');
        $('.listArea').show();
        $('#toolbar .k-button').removeClass('theme-m-box');
        $(dom).addClass('theme-m-box');
    } else if (type === 'pic') {
        $('.listArea').hide();
        $('#listView').addClass('row mx-0 d-flex');
        $('.picArea').show();
        $('#toolbar .k-button').removeClass('theme-m-box');
        $(dom).addClass('theme-m-box');
    }
}