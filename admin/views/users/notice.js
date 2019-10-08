$(function () {
    $('#noticeTabStripPage').kendoTabStrip({
        animation: false
    }).data('kendoTabStrip').select($('#noticeTabStrip').data('kendoTabStrip').select().index());
});