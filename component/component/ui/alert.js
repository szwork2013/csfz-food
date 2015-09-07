var $ = require('jquery');
var utils = require('./utils');

module.exports = function (options) {

    var $alert = $('<div class="ui-alert">' +
    '<div class="alert-alpha"></div>' +
    '    <div class="modal-content">' +
    '           <div class="modal-header">           ' +
    '               <button type="button" class="close" >×</button>' +
    '               <h4 class="modal-title">' + options.title + '</h4>' +
    '           </div>' +
    '           <div class="modal-body">' + options.content + '</div>' +
    '           <div class="modal-footer">' +
    '               <button type="button" class="btn btn-default btn-sm">取消</button>' +
    '               <button type="button" class="btn btn-primary btn-sm">确定</button>' +
    '           </div>' +
    '        </div>' +
    '</div>').appendTo('body').addClass(options.addClass);

    var $alpha = $alert.find('.alert-alpha');
    var $content = $alert.find('.modal-content');

    $content.on('click', '.modal-footer .btn-default', function () {
        $alert.remove();
        options && options.onCancel && options.onCancel();
    });

    $content.on('click', '.modal-footer .btn-primary', function () {
        $alert.remove();
        options && options.onCertain && options.onCertain();
    });

    $content.on('click', '.close', function () {
        $alert.remove();
    });


    $alpha.css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2,
        backgroundColor: 'black'
    });

    utils.calcuPosition($content);


    $(window).on('resize scroll', function () {
        if ($alert.is(':visible')) {
            utils.calcuPosition($content);
        }
    });
};
