var $ = require('jquery');
var utils = require('./utils');


module.exports = function (content, callback) {
    var $tip = $('<div><div class="tip-alpha"></div><div class="alert alert-success">' + content + '</div></div>').appendTo('body').hide();

    var $alpha = $tip.find('.tip-alpha');
    var $content = $tip.find('.alert');

    $alpha.css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0
    });

    utils.calcuPosition($content);
    $tip.show();

    setTimeout(
        function () {
            $tip.remove();
            if (typeof(callback) === 'function') {
                callback();
            }
        },
        1000
    )
    ;

    $(window).on('resize scroll', function () {
        if ($tip.is(':visible')) {
            utils.calcuPosition($content);
        }
    });
};