<h1 align="center">🌸 Kendo UI Admin &amp; Site 🐱</h1>
<p align="center">Kendo UI Admin &amp; Site base on Kendo UI for jQuery and Bootstrap 4.</p>
<p align="center"><a href="https://ikki2000.github.io/KendoUI-Admin-Site/">https://ikki2000.github.io/KendoUI-Admin-Site/</a></p>

![Home](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/home_pc.png)

![Forms](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/forms.png)

![Grid](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/grid.png)

![Themes](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/themes.png)

## 🌟 特点 <small>Features</small>

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

## 🌐 浏览器支持 <small>Browser Support</small>

* 现代浏览器和 IE10 及以上

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_32x32.png" alt="IE"><br>IE | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_32x32.png" alt="Edge"><br>Edge | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_32x32.png" alt="Firefox"><br>Firefox | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_32x32.png" alt="Chrome"><br>Chrome | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_32x32.png" alt="Safari"><br>Safari | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_32x32.png" alt="Opera"><br>Opera |
| :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| 10, 11 | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 📖 使用指南 <small>Initialization</small>

1. [下载](https://github.com/IKKI2000/KendoUI-Admin-Site/archive/master.zip)并解压至项目**根**目录~
2. 将下列 **5** 个 HTML 文件的 `<base>` 修改为前端本地的开发**根**路径~
    ```diff
    index.html
    --- <base href="https://ikki2000.github.io/KendoUI-Admin-Site/">
    +++ <base href="http://localhost:8888/YourProject/">
    
    admin/login.html & admin/index.html
    --- <base href="https://ikki2000.github.io/KendoUI-Admin-Site/" type="admin">
    +++ <base href="http://localhost:8888/YourProject/" type="admin">
    
    site/login.html & site/index.html
    --- <base href="https://ikki2000.github.io/KendoUI-Admin-Site/" type="site">
    +++ <base href="http://localhost:8888/YourProject/" type="site">
    ```
    > 注意：最后的 `/` 不要漏掉~
3. 将下列 JS 文件的 `apiPath` 修改为后端服务器的 API 接口**根**路径~ 并恢复 **3** 个默认参数~
    ```diff
    js/ikki.js
    
    // 配置接口路径
    --- var apiPath = 'https://ikki2000.github.io/KendoUI-Admin-Site/';
    +++ var apiPath = 'https://dev.YourDomain.com/api/';
    
    // Ajax 提交
    --- ajaxType: 'get', // GitHub Pages 演示只支持 get 请求，正常使用请改回 post 请求
    +++ ajaxType: 'post',
    --- urlType: 'static', // GitHub Pages 演示接口为静态 json 文件，正常使用请改回 api 类型
    +++ urlType: 'api',
    
    // 带二进制流的 Ajax 提交
    --- ajaxType: 'get', // GitHub Pages 演示只支持 get 请求，正常使用请改回 post 请求
    +++ ajaxType: 'post',
    ```
4. 用 IDE 编辑器（如：WebStorm）打开 `index.html` 并选择浏览器启动本地服务即可~
    ```text
    http://localhost:8888/YourProject/index.html
    ```

## 🔨 开发指南 <small>Developer's Guide</small>

* 所有的子页面模块均存放在 `views` 目录或其自定义的子目录下
* 每一个子页面模块均由同名的 `xxx.html` 和 `xxx.js` 两个文件组成
* 每一个子页面模块的 HTML 页面第一行的模版 ID 由文件名 `xxx` 和 `Temp` 组成
    ```html
    <script id="xxxTemp" type="text/x-kendo-template">
    ```
* 只应用于当前子页面模块的样式写在模块的 HTML 文件中
    ```html
    <style scoped>
        ···
    </style>
    ```
* 子页面模块的 HTML 文件基本结构如下：
    ```html
    <script id="xxxTemp" type="text/x-kendo-template">
        <div>
            ···
        </div>
        <script id="otherTemplate" type="text/x-kendo-template">
            ···
        </script>
        <style scoped>
            ···
        </style>
    </script>
    ```
* 顶部菜单本地 Mock 数据位于 `json/menu.json` 其数据结构同左侧导航
* 左侧导航本地 Mock 数据位于 `json/nav.json` 其中 `text` 键值说明如下：
    * `<i>` 为图标
    * `<sup>` 为折叠后的角标
    * `<abbr>` 包裹折叠后一级导航不显示的文字部分
    * `<small>` 为可选次级文字
    * `<sub>` 为角标
* 左侧导航 `url` 键值包含的 `linkTo` 方法为路由函数<br>其中第一个参数为子页面模块相对于 `views` 目录所在的目录<br>第二个参数为子页面模块的名称<br>`cssClass` 键值为面包屑要用到的 DOM 定位，由 `links-模块名称` 组成
* 顶部菜单及左侧导航的 API 接口地址位于 `ikki.layout.js` 文件内
* `ikki.js` 文件内封装了一些公用方法，具体参数及说明如下：

    | 方法 | 参数 | 类型 | 默认值 | 说明 |
    | ----- | ----- | ----- | ----- | ----- |
    | **$.fn.ajaxPost** | --- | --- | --- | 封装的带 **token** 的 ajax 提交 |
    |  | *ajaxAsync* | boolean | true | ajax 的 async 属性 |
    |  | *ajaxType* | string | 'post' | ajax 的 type 属性 |
    |  | *ajaxData* | string | '' | 用 **JSON.stringify()** 封装的 ajax 的 data 属性 |
    |  | *urlType* | string | 'api' | 读取本地 json 的时候换成 'static' |
    |  | *ajaxUrl* | string | '' | ajax 的 url 属性 |
    |  | *ajaxContentType* | string | 'application/json; charset=UTF-8' | ajax 的 contentType 属性 |
    |  | *finished* | function | {} | ajax 请求完成时的回调 |
    |  | *succeed* | function | {} | ajax 请求完成并且 result === 'y' 时的回调 |
    |  | *failed* | function | {} | ajax 请求完成并且 result === 'n' 时的回调 |
    |  | *isMsg* | boolean | false | result === 'y' 时是否需要消息提示 |
    | **$.fn.ajaxPostBlob** | --- | --- | --- | 封装的带 **token** 的二进制流 ajax 提交 |
    |  | *ajaxAsync* | boolean | true | ajax 的 async 属性 |
    |  | *ajaxType* | string | 'post' | ajax 的 type 属性 |
    |  | *ajaxData* | string | '' | 用 **new FormData()** 封装的 ajax 的 data 属性 |
    |  | *ajaxUrl* | string | '' | ajax 的 url 属性 |
    |  | *finished* | function | {} | ajax 请求完成时的回调 |
    |  | *succeed* | function | {} | ajax 请求完成并且 result === 'y' 时的回调 |
    |  | *failed* | function | {} | ajax 请求完成并且 result === 'n' 时的回调 |
    |  | *isMsg* | boolean | true | result === 'y' 时是否需要消息提示 |
    | **tipMsg** | --- | --- | --- | 提示框 |
    |  | *dom* | object | --- | 触发提示框的 DOM 对象 |
    |  | *msg* | string | --- | 提示框显示的内容 |
    |  | *position* | string | --- | 提示框的位置：<br>'top'<br>'bottom'<br>'left'<br>'right'<br>'center' |
    | **noticeMsg** | --- | --- | --- | 通知框 |
    |  | *msg* | string | --- | 通知框显示的内容 |
    |  | *type* | string | --- | 通知框的类型：<br>'info'<br>'success'<br>'warning'<br>'error' |
    |  | *position* | string | --- | 通知框的位置：<br>'center'<br>'top'<br>'left'<br>'right'<br>'bottom'<br>'left top'<br>'right top'<br>'left bottom'<br>'right bottom' |
    |  | *time* | number | --- | 自动消失的时间<br>单位：ms |
    |  | *hided* | function | --- | 通知框消失后的回调 |
    | **alertMsg** | --- | --- | --- | 警告框 |
    | **alertMsgBtn** | --- | --- | --- | 警告框小按钮 |
    | **alertMsgNoBtn** | --- | --- | --- | 警告框无按钮 |
    |  | *msg* | string | --- | 警告框显示的内容 |
    |  | *type* | string | --- | 警告框的类型：<br>'success'<br>'info'<br>'question'<br>'warning'<br>'error' |
    |  | *closed* | function | --- | 警告框关闭后的回调 |
    | **confirmMsg** | --- | --- | --- | 确认框 |
    | **confirmMsgBtn** | --- | --- | --- | 确认框小按钮 |
    |  | *title* | string | --- | 确认框显示的标题 |
    |  | *msg* | string | --- | 确认框显示的内容 |
    |  | *type* | string | --- | 确认框的类型：<br>'success'<br>'info'<br>'question'<br>'warning'<br>'error' |
    |  | *confirmed* | function | --- | 确认框确认后的回调 |
    | **divWindow** | --- | --- | --- | 弹出层 |
    |  | *title* | string | --- | 弹出层显示的标题 |
    |  | *width* | string | --- | 弹出层宽度<br>单位：px 或 % |
    |  | *height* | string | --- | 弹出层高度<br>单位：px 或 % |
    |  | *content* | object | --- | 弹出层显示的 DOM 对象 |
    | **iframeWindow** | --- | --- | --- | 弹出页 |
    |  | *title* | string | --- | 弹出页显示的标题 |
    |  | *width* | string | --- | 弹出页宽度<br>单位：px 或 % |
    |  | *height* | string | --- | 弹出页高度<br>单位：px 或 % |
    |  | *url* | string | --- | 弹出页显示的 iFrame 链接地址 |
    | **showBigPic** | --- | --- | --- | 大图预览 |
    |  | *url* | string | --- | 大图的绝对路径 |
    | **numericRange** | --- | --- | --- | 数字型范围 |
    |  | *rangeStart* | object | --- | 开始的 DOM 对象 |
    |  | *rangeEnd* | object | --- | 结束的 DOM 对象 |
    |  | *format* | string | --- | 格式 |
    |  | *decimals* | number | --- | 保留几位小数 |
    |  | *step* | number | --- | 步进 |
    |  | *min* | number | --- | 最小值 |
    |  | *max* | number | --- | 最大值 |
    | **dateRange** | --- | --- | --- | 日期型范围 |
    | **dateInputRange** | --- | --- | --- | 日期输入型范围 |
    |  | *rangeStart* | object | --- | 开始的 DOM 对象 |
    |  | *rangeEnd* | object | --- | 结束的 DOM 对象 |
    |  | *type* | string | --- | 日期的类型：<br>'Year'<br>'Month'<br>'Time'<br>'DateTime'<br>'Date' |
    | **serializeObject** | --- | --- | --- | 表单序列化 json 对象 |

#### 前后端交互规范：

* 前后端交互全部采用 Ajax 方式提交
* 前端提交给后端的数据格式分为标准的 `json` 格式和带二进制流的 `form data` 格式两种
* 后端返回给前端的 `json` 格式标准如下：
    ```json
    {
        "result": "y",
        "msg": "操作成功！",
        "data": []
    }
    ```
* 所有日期 `date` 类型的数据全部转换成字符串 `string` 类型进行交互，即前端给到后端和后端给到前端的数据均为字符串
    ```json
    {
        "year": "2019",
        "month": "2019-02",
        "date": "2019-02-03",
        "time": "12:00", 
        "datetime": "2019-02-03 12:00" 
    }
    ```
* 所有组件交互的数据格式请参考前端 Mock 数据目录 `json/`

## 📜 目录结构 <small>Directory Structure</small>

#### 完整版：

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
#### 纯后台管理路由精简版：

> 如果只需要后台管理界面的路由版~ 可将原 `admin` 目录下的文件移动至根目录并按照如下目录结构删除多余的文件~ 且将 `login.html` 和 `index.html` 头部 `<base>` 标签内的 `type` 置空即可~

```html
    <base href="http://localhost:8888/YourProject/" type="">
```

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

## 📁 功能列表 <small>Function List</small>

#### 顶部菜单 <small>[ Menu ]</small>

* 导航折叠 <small>[ Navigation Drawer ]</small>
* 面包屑 <small>[ Breadcrumb ]</small>
* 刷新 <small>[ Refresh ]</small>
* 全屏 <small>[ Full Screen ]</small>
* 锁屏 <small>[ Lock Screen ]</small>
* 配色 <small>[ Theme ]</small>
* 语言 <small>[ Localization ]</small>
* 消息 <small>[ Message ]</small>
* 提醒 <small>[ Notice ]</small>
* 用户名头像显示 <small>[ User Name & Avatar ]</small>
* 前台切换 <small>[ Goto Website ]</small>
* 用户中心 <small>[ User Center ]</small>
* 修改密码 <small>[ Change Password ]</small>
* 系统设置 <small>[ Setting ]</small>
* 退出登录 <small>[ Sign Out ]</small>

#### 左侧导航 <small>[ Navigation ]</small>

* 综合 <small>[ Dashboard ]</small>
    * 表单 <small>[ Forms ]</small>
        * 表单 Post 提交
        * 表单 Ajax 提交
        * 范围选择
        * 下拉分组多选级联
        * 地图联动选择
    * 表格 <small>[ Grids ]</small>
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
    * 树形 <small>[ Trees ]</small>
        * 敬请期待……
    * 列表 <small>[ Lists ]</small>
        * 敬请期待……
    * 分配 <small>[ Assigns ]</small>
        * 敬请期待……
* 框架 <small>[ Framework ]</small>
    * 全球化 <small>[ Globalization ]</small>
    * 视图模型 <small>[ MVVM ]</small>
    * 数据源 <small>[ DataSource ]</small>
    * 模版 <small>[ Templates ]</small>
    * 绘图 <small>[ Drawing ]</small>
    * 单页应用 <small>[ SPA ]</small>
    * PDF导出 <small>[ PDF Export ]</small>
    * 触摸事件 <small>[ Touch Events ]</small>
    * 整合 <small>[ Integration ]</small>
* 布局 <small>[ Layout ]</small>
    * 页面布局 <small>[ Splitter ]</small>
    * 响应面板 <small>[ Responsive Panel ]</small>
    * 模态框 <small>[ Window ]</small>
    * 对话框 <small>[ Dialog ]</small>
    * 通知框 <small>[ Notification ]</small>
    * 提示框 <small>[ Tooltip ]</small>
* 导航 <small>[ Navigation ]</small>
    * 菜单 <small>[ Menu ]</small>
    * 折叠面板 <small>[ PanelBar ]</small>
    * 选项卡 <small>[ TabStrip ]</small>
    * 工具栏 <small>[ ToolBar ]</small>
    * 树形视图 <small>[ TreeView ]</small>
    * 按钮 <small>[ Button ]</small>
    * 按钮组 <small>[ ButtonGroup ]</small>
* 表单 <small>[ Forms ]</small>
    * 转换框 <small>[ Switch ]</small>
    * 数字框 <small>[ NumericTextBox ]</small>
    * 日期框 <small>[ DatePicker ]</small>
    * 日期范围框 <small>[ DateRangePicker ]</small>
    * 时间框 <small>[ TimePicker ]</small>
    * 时日框 <small>[ DateTimePicker ]</small>
    * 时日掩码框 <small>[ DateInput ]</small>
    * 掩码框 <small>[ MaskedTextBox ]</small>
    * 自动完成框 <small>[ AutoComplete ]</small>
    * 单选下拉框 <small>[ DropDownList ]</small>
    * 输入下拉框 <small>[ ComboBox ]</small>
    * 表格下拉框 <small>[ MultiColumnComboBox ]</small>
    * 多选下拉框 <small>[ MultiSelect ]</small>
    * 树形下拉框 <small>[ DropDownTree ]</small>
    * 颜色框 <small>[ ColorPicker ]</small>
    * 滑块框 <small>[ Slider ]</small>
    * 进度框 <small>[ ProgressBar ]</small>
    * 穿梭框 <small>[ ListBox ]</small>
    * 富文本框 <small>[ Editor ]</small>
    * 上传框 <small>[ Upload ]</small>
    * 验证 <small>[ Validator ]</small>
* 数据 <small>[ Data ]</small>
    * 表格 <small>[ Grid ]</small>
    * 树形列表 <small>[ TreeList ]</small>
    * 列表视图 <small>[ ListView ]</small>
    * 电子表格 <small>[ Spreadsheet ]</small>
    * 透视表格 <small>[ PivotGrid ]</small>
* 日程 <small>[ Scheduling ]</small>
    * 日历 <small>[ Calendar ]</small>
    * 多重日历 <small>[ MultiViewCalendar ]</small>
    * 日程表 <small>[ Scheduler ]</small>
    * 甘特图 <small>[ Gantt ]</small>
* 会话 <small>[ Conversational ]</small>
    * 聊天 <small>[ Chat ]</small>
* 媒体 <small>[ Media ]</small>
    * 媒体播放器 <small>[ MediaPlayer ]</small>
    * 滚动视图 <small>[ ScrollView ]</small>
* 交互 <small>[ Interactivity ]</small>
    * 拖放 <small>[ Drag and Drop ]</small>
    * 拖放排序 <small>[ Sortable ]</small>
    * 样式 <small>[ Styling ]</small>
    * 特效 <small>[ Effects ]</small>
    * 波纹效果 <small>[ Ripple Container ]</small>
* 图表 <small>[ Charts ]</small>
    * 区域图 <small>[ Area Charts ]</small>
    * 条形图 <small>[ Bar Charts ]</small>
    * 箱线图 <small>[ Box Plot Charts ]</small>
    * 气泡图 <small>[ Bubble Charts ]</small>
    * 子弹图 <small>[ Bullet Charts ]</small>
    * 环形图 <small>[ Donut Charts ]</small>
    * 漏斗图 <small>[ Funnel Charts ]</small>
    * 折线图 <small>[ Line Charts ]</small>
    * 饼图 <small>[ Pie Charts ]</small>
    * 极坐标图 <small>[ Polar Charts ]</small>
    * 雷达图 <small>[ Radar Charts ]</small>
    * 散点图 <small>[ Scatter Charts ]</small>
    * 波形图 <small>[ Sparklines ]</small>
    * 股票图 <small>[ Stock Charts ]</small>
    * 树图 <small>[ TreeMap ]</small>
    * 瀑布图 <small>[ Waterfall Charts ]</small>
    * 范区域图 <small>[ Range Area Charts ]</small>
    * 范条形图 <small>[ Range Bar Charts ]</small>
    * 量规 <small>[ Gauges ]</small>
        * 线性计 <small>[ Linear Gauge ]</small>
        * 径向计 <small>[ Radial Gauge ]</small>
        * 弧形计 <small>[ Arc Gauge ]</small>
    * 条码 <small>[ Barcodes ]</small>
        * 条形码 <small>[ Barcode ]</small>
        * 二维码 <small>[ QR Code ]</small>
    * 地图 <small>[ Maps ]</small>
        * 架构图 <small>[ Diagram ]</small>
        * 地图 <small>[ Map ]</small>
* 移动端 <small>[ Hybrid ]</small>
    * 敬请期待……

## 🔗 相关链接 <small>Thanks for</small>

* [jQuery](https://github.com/jquery/jquery) ( v1.12.4 )
* [Kendo UI for jQuery 官网](https://www.telerik.com/kendo-jquery-ui) ( v2019.1.115 )
* [Kendo UI themes](https://github.com/telerik/kendo-themes) ( v3.3.1 )
* [Bootstrap](https://github.com/twbs/bootstrap) ( v4.3.1 )
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome) ( v5.7.2 )
* [Flag Icon Css](https://github.com/lipis/flag-icon-css) ( v3.3.0 )
* [Count Up](https://github.com/inorganik/countUp.js) ( v1.9.3 )
* [Verify](https://github.com/Hibear/verify) ( v0.1.0 )
* [Particleground](https://requestlab.fr/) ( v1.1.0 )

## 📷 界面预览 <small>Screenshot</small>

<h3 align="center">- PC -</h3>

![PC](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/home_pc.png)

<h3 align="center">- PAD -</h3>

![PAD](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/home_pad.png)

<h3 align="center">- PHONE -</h3>

![PHONE](https://raw.githubusercontent.com/IKKI2000/KendoUI-Admin-Site/master/img/screenshot/home_phone.png)