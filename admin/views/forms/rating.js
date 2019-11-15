$(function () {
    // DOM 评级框
    $('#domRating').kendoRating();
    // 普通评级框
    $('#generalRating').kendoRating({
        min: 1,
        max: 5,
        selectValueOnFocus: 3
    });
    // 只读评级框
    $('#readonlyRating').kendoRating({
        value: 3
    }).data('kendoRating').readonly();
    // 禁用评级框
    $('#disabledRating').kendoRating().data('kendoRating').enable(false);
    // 默认值评级框
    $('#defaultValueRating').kendoRating({
        value: 3
    });
    // 单一选择评级框
    $('#selectionRating').kendoRating({
        selection: 'single',
        value: 3
    });
    // 半选评级框
    $('#precisionRating').kendoRating({
        precision: 'half',
        value: 2.5
    });
    // 无标签评级框
    $('#noLabelRating').kendoRating({
        label: false
    });
    // 无提示评级框
    $('#noTipRating').kendoRating({
        tooltip: false
    });
    // 自定义标签评级框
    $('#labelRating').kendoRating({
        label: {
            template:
                '# if (value === 1) { #' +
                    '有点喜欢' +
                '# } else if (value === 2) { #' +
                    '比较喜欢' +
                '# } else if (value === 3) { #' +
                    '很喜欢' +
                '# } else if (value === 4) { #' +
                    '非常喜欢' +
                '# } else if (value === 5) { #' +
                    '超级喜欢' +
                '# } #'
        }
    });
    // 自定义提示评级框
    $('#tipRating').kendoRating().data('kendoRating').wrapper.kendoTooltip({
        filter: '.k-rating-item',
        content: function (e) {
            if (e.target.data('value') === 1) {
                return '有点喜欢';
            } else if (e.target.data('value') === 2) {
                return '比较喜欢';
            } else if (e.target.data('value') === 3) {
                return '很喜欢';
            } else if (e.target.data('value') === 4) {
                return '非常喜欢';
            } else if (e.target.data('value') === 5) {
                return '超级喜欢';
            }
        }
    });
    // 自定义评级框
    $('#customRating').kendoRating({
        itemTemplate: '<i class="k-icon k-i-heart-outline"></i>',
        selectedTemplate: '<i class="k-icon k-i-heart"></i>',
        hoveredTemplate: '<i class="k-icon k-i-heart"></i>'
    });
    // 等宽评级框
    $('#widthRating').kendoRating();
});