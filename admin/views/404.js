$(function () {
    // 返回首页
    var sec = 3,
        intervalID = setInterval(function () {
            if (sec > 1) {
                sec = sec - 1;
                $('#countdown').text(sec);
            } else {
                clearInterval(intervalID);
                linkTo('/', 'home');
            }
        }, 1000);
    $('#countdown').text(sec);
    router.bind('change', function () {
        clearInterval(intervalID);
    });
});