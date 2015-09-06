var $ = require('jquery');
var utils = require('./utils');

var $tip = $('<div class="alpha"><div class="alert alert-success"></div></div>').appendTo('body').hide();

module.exports = function (content) {
    $tip.find('.alert').html(content);
    utils.calcuPosition($tip);
    $tip.show();

    setTimeout(
        function () {
            $tip.hide();
        },
        1000
    );

    $(window).on('resize scroll', function () {
        if($tip.is(':visible')){
            utils.calcuPosition($tip);
        }
    });
};