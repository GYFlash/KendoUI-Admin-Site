<h1 align="center">🌸 Kendo UI Admin &amp; Site 🐱</h1>
<p align="center">Kendo UI Admin &amp; Site base on Kendo UI for jQuery and Bootstrap 4.</p>

## 🌟 特点

* 无工程化零配置
* 下载无安装开箱即用
* 前后端分离
* MVVM 视图模型（by Kendo UI for jQuery）
* SPA 单页面应用（by Kendo UI for jQuery）
* Router 页面路由（by Kendo UI for jQuery）
* Templates 模版渲染（by Kendo UI for jQuery）
* Data Source 统一数据源（by Kendo UI for jQuery）
* PC 端移动端自适应（by Bootstrap 4）
* 配套前台网站和后台管理
* 后台模式支持 6 种组合框架布局
* Sass 样式预处理
* 5 套配色皮肤可选

## 🌐 浏览器支持

* 现代浏览器和 IE10 及以上

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="IE / Edge"><br>IE / Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"><br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"><br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"><br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"><br>Opera |
| :----------: | :----------: | :----------: | :----------: | :----------: |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📖 使用指南

1. [下载](https://github.com/IKKI2000/KendoUI-Admin-Site/archive/master.zip)并解压至项目根目录~
2. 将 `index.html`、`admin/login.html`、`admin/index.html`、`site/login.html`、`site/index.html`
    这 5 个文件头部 `<base>` 标签内的 `href` 修改为前端本地的开发根路径，形如：
    `<base href="http://localhost:8888/YourProject/">`
    > 注意：最后的 `/` 不要漏掉~
3. 将 `js/ikki.js` 里的 `apiPath` 修改为后端服务器 API 接口根路径，形如：
    `var apiPath = 'https://dev.YourDomain.com/api/';`
    两处 `ajaxType: 'get'` 恢复为 `ajaxType: 'post'`
    一处 `urlType: 'static'` 恢复为 `urlType: 'api'`
4. 用编辑器（如：WebStorm）启动本地环境运行 `index.html` 即可~

> 另：在 `view` 目录下建立子页面时必须包含同名的 `xxx.html` 和 `xxx.js` 两个文件~ 并且 HTML 页面第一行的模版 ID 必须形如： `<script id="xxxTemp" type="text/x-kendo-template">`

## 📜 目录结构

### 完整版：

> 后台默认使用的是路由版~ 如需使用框架版、标签版和布局版，请直接将对应的 `index_xxx.html` 启动或直接改名为 `index.html` 即可~

```text
ROOT/··················································（项目根目录）
├── admin/·············································（后台管理目录）
│   ├── pages/·········································（iFrame 框架版目录）
│   │   ├── 404.html···································（404 页面）
│   │   ├── home.html··································（主页）
│   ├── views/·········································（SPA 路由版和标签版目录）
│   │   ├── xxx/·······································（后台管理子目录）
│   │   │   ├── xxx.html·······························（后台管理子页面及样式）
│   │   │   └── xxx.js·································（后台管理子页面脚本）
│   │   ├── 404.html···································（404页面及样式）
│   │   ├── 404.js·····································（404页面脚本）
│   │   ├── home.html··································（主页页面及样式）
│   │   └── home.js····································（主页页面脚本）
│   ├── index.html·····································（后台登录后首页）
│   ├── index_iframe.html······························（首页框架版）
│   ├── index_router.html······························（首页路由版）
│   ├── index_splitter_iframe.html·····················（首页布局框架版）
│   ├── index_splitter_router.html·····················（首页布局路由版）
│   ├── index_splitter_tabstrip.html···················（首页布局标签版）
│   ├── index_tabstrip.html····························（首页标签版）
│   └── login.html·····································（后台登录页）
├── css/···············································（样式表目录）
│   ├── themes/········································（配色皮肤目录）
│   ├── amikoko.admin.css······························（后台管理样式）
│   ├── amikoko.site.css·······························（前台网站样式）
│   ├── bootstrap.min.css······························（Bootstrap 4）
│   ├── flag-icon.min.css······························（矢量国旗图标）
│   ├── fontawesome-all.min.css························（字体图标）
│   └── kendo.ui.widgets.icon.css······················（Kendo UI 组件图标）
├── flags/·············································（矢量国旗图标目录）
├── fonts/·············································（字体图标目录）
├── img/···············································（图片目录）
│   ├── avatar.png·····································（默认头像）
│   ├── favicon.png····································（浏览器标签及收藏夹图标）
│   ├── IKKI.png·······································（用户头像）
│   ├── lock_bg.jpg····································（锁屏背景）
│   ├── logo.png·······································（标准 LOGO）
│   └── logo_s.png·····································（左侧导航折叠后 LOGO）
├── js/················································（公用脚本目录）
│   ├── global/········································（多语言目录）
│   ├── countUp.min.js·································（数字跳动）
│   ├── ikki.iframe.js·································（框架版脚本）
│   ├── ikki.js········································（公用脚本）
│   ├── ikki.layout.js·································（后台公用脚本）
│   ├── ikki.router.js·································（路由脚本）
│   ├── ikki.splitter.js·······························（布局版脚本）
│   ├── ikki.tabstrip.js·······························（标签版脚本）
│   ├── ikki.website.js································（前台公用脚本）
│   ├── jquery.min.js··································（jQuery 库）
│   ├── jquery.particleground.js·······················（登录页背景动画）
│   ├── jquery.verify.js·······························（登录页滑动验证）
│   ├── jszip.min.js···································（Excel 导出）
│   └── kendo.all.min.js·······························（Kendo UI 库）
├── json/··············································（本地 Mock 数据目录）
│   └── geo/···········································（地图 GEO 数据目录）
├── resource/··········································（其他静态资源目录）
├── site/··············································（前台网站目录）
│   ├── pages/·········································（iFrame 框架版目录）
│   │   ├── 404.html···································（404 页面）
│   │   ├── home.html··································（主页）
│   ├── views/·········································（SPA 路由版和标签版目录）
│   │   ├── xxx/·······································（前台网站子目录）
│   │   │   ├── xxx.html·······························（前台网站子页面及样式）
│   │   │   └── xxx.js·································（前台网站子页面脚本）
│   │   ├── 404.html···································（404页面及样式）
│   │   ├── 404.js·····································（404页面脚本）
│   │   ├── home.html··································（主页页面及样式）
│   │   └── home.js····································（主页页面脚本）
│   └── index.html·····································（前台首页）
├── index.html·········································（项目首页）
├── LICENSE············································（MIT）
└── README.md··········································（本说明文档）
```
### 纯后台管理路由精简版：

> 如果只需要后台管理界面的路由版~ 可将原 `admin` 目录下的文件移动至根目录并按照如下目录结构删除多余的文件~ 且将 `login.html` 和 `index.html` 头部 `<base>` 标签内的 `type` 置空即可~

```text
ROOT/··················································（项目根目录）
├── css/···············································（样式表目录）
│   ├── themes/········································（配色皮肤目录）
│   │   └── theme_default.min.css······················（只保留默认样式）
│   ├── amikoko.admin.css······························（后台管理样式）
│   ├── bootstrap.min.css······························（Bootstrap 4）
│   └── fontawesome-all.min.css························（字体图标）
├── fonts/·············································（字体图标目录）
├── img/···············································（图片目录）
│   ├── avatar.png·····································（默认头像）
│   ├── favicon.png····································（浏览器标签及收藏夹图标）
│   ├── logo.png·······································（标准 LOGO）
│   └── logo_s.png·····································（左侧导航折叠后 LOGO）
├── js/················································（公用脚本目录）
│   ├── global/········································（多语言目录）
│   │   └── kendo.zh-CHS.js····························（只保留简体中文）
│   ├── countUp.min.js·································（数字跳动）
│   ├── ikki.js········································（后台管理脚本）
│   ├── ikki.layout.js·································（框架脚本）
│   ├── ikki.router.js·································（路由脚本）
│   ├── jquery.min.js··································（jQuery 库）
│   ├── jquery.verify.js·······························（登录页滑动验证）
│   ├── jszip.min.js···································（Excel 导出）
│   └── kendo.all.min.js·······························（Kendo UI 库）
├── json/··············································（本地 Mock 数据目录）
├── views/·············································（SPA 页面目录）
│   ├── xxx/···········································（子目录）
│   │   ├── xxx.html···································（子页面及样式）
│   │   └── xxx.js·····································（子页面脚本）
│   ├── 404.html·······································（404页面及样式）
│   ├── 404.js·········································（404页面脚本）
│   ├── home.html······································（主页页面及样式）
│   └── home.js········································（主页页面脚本）
├── index.html·········································（登录后首页）
└── login.html·········································（后台入口登录页）
```

## 📁 功能列表

### 顶部菜单

* 导航折叠
* 面包屑
* 刷新
* 全屏
* 锁屏
* 配色
* 语言
* 消息
* 提醒
* 用户名头像显示
* 前台切换
* 用户中心
* 修改密码
* 系统设置
* 退出登录

### 左侧导航

* 综合 Dashboard
    * 表单 Forms
        * 表单 Post 提交
        * 表单 Ajax 提交
        * 范围选择
        * 下拉分组多选级联
        * 地图联动选择
    * 表格 Grids
        * 全功能搜索及自定义编辑
        * 弹出框带校验编辑
        * 行内带校验编辑
        * 单元格带校验编辑
        * 复制新增及数据联动编辑
        * 自定义功能按钮
        * 自定义选择提交
        * 分组合计排序筛选
        * 子表详情及滚动翻页
        * 合并表头及行内拆分
    * 树形 Trees
        * 敬请期待……
    * 列表 Lists
        * 敬请期待……
    * 分配 Assigns
        * 敬请期待……
* 框架 Framework
    * 全球化 Globalization
    * 视图模型 MVVM
    * 数据源 DataSource
    * 模版 Templates
    * 绘图 Drawing
    * 单页应用 SPA
    * PDF导出 PDF Export
    * 触摸事件 Touch Events
    * 整合 Integration
* 布局 Layout
    * 页面布局 Splitter
    * 响应面板 Responsive Panel
    * 模态框 Window
    * 对话框 Dialog
    * 通知框 Notification
    * 提示框 Tooltip
* 导航 Navigation
    * 菜单 Menu
    * 折叠面板 PanelBar
    * 选项卡 TabStrip
    * 工具栏 ToolBar
    * 树形视图 TreeView
    * 按钮 Button
    * 按钮组 ButtonGroup
* 表单 Forms
    * 转换框 Switch
    * 数字框 NumericTextBox
    * 日期框 DatePicker
    * 日期范围框 DateRangePicker
    * 时间框 TimePicker
    * 时日框 DateTimePicker
    * 时日掩码框 DateInput
    * 掩码框 MaskedTextBox
    * 自动完成框 AutoComplete
    * 单选下拉框 DropDownList
    * 输入下拉框 ComboBox
    * 表格下拉框 MultiColumnComboBox
    * 多选下拉框 MultiSelect
    * 树形下拉框 DropDownTree
    * 颜色框 ColorPicker
    * 滑块框 Slider
    * 进度框 ProgressBar
    * 穿梭框 ListBox
    * 富文本框 Editor
    * 上传框 Upload
    * 验证 Validator
* 数据 Data
    * 表格 Grid
    * 树形列表 TreeList
    * 列表视图 ListView
    * 电子表格 Spreadsheet
    * 透视表格 PivotGrid
* 日程 Scheduling
    * 日历 Calendar
    * 多重日历 MultiViewCalendar
    * 日程表 Scheduler
    * 甘特图 Gantt
* 会话 Conversational
    * 聊天 Chat
* 媒体 Media
    * 媒体播放器 MediaPlayer
    * 滚动视图 ScrollView
* 交互 Interactivity
    * 拖放 Drag and Drop
    * 拖放排序 Sortable
    * 样式 Styling
    * 特效 Effects
    * 波纹效果 Ripple Container
* 图表 Charts
    * 区域图 Area Charts
    * 条形图 Bar Charts
    * 箱线图 Box Plot Charts
    * 气泡图 Bubble Charts
    * 子弹图 Bullet Charts
    * 环形图 Donut Charts
    * 漏斗图 Funnel Charts
    * 折线图 Line Charts
    * 饼图 Pie Charts
    * 极坐标图 Polar Charts
    * 雷达图 Radar Charts
    * 散点图 Scatter Charts
    * 波形图 Sparklines
    * 股票图 Stock Charts
    * 树图 TreeMap
    * 瀑布图 Waterfall Charts
    * 范区域图 Range Area Charts
    * 范条形图 Range Bar Charts
    * 量规 Gauges
        * 线性计 Linear Gauge
        * 径向计 Radial Gauge
        * 弧形计 Arc Gauge
    * 条码 Barcodes
        * 条形码 Barcode
        * 二维码 QR Code
    * 地图 Maps
        * 架构图 Diagram
        * 地图 Map
* 移动端 Hybrid
    * 敬请期待……

## 🔗 相关链接

* [jQuery](https://github.com/jquery/jquery) (v1.12.4)
* [Kendo UI for jQuery 官网](https://www.telerik.com/kendo-jquery-ui) (v2019.1.115)
* [Kendo UI themes](https://github.com/telerik/kendo-themes) (v3.3.1)
* [Bootstrap](https://github.com/twbs/bootstrap) (v4.3.1)
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome) (v5.7.2)
* [Flag Icon Css](https://github.com/lipis/flag-icon-css) (v3.3.0)
* [Count Up](https://github.com/inorganik/countUp.js) (v1.9.3)
* [Verify](https://github.com/Hibear/verify) (v0.1.0)
* [Particleground](https://requestlab.fr/) (v1.1.0)