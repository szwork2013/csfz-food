module.exports = {
    calcuPosition: function (el) {
        var winWidth = $(window).width();
        var winHeight = $(window).height();

        var elWidth = el.width();
        var elHeight = el.height();

        el.css({
            position: 'fixed',
            top: (winHeight - elHeight) / 2,
            left: (winWidth - elWidth) / 2
        });
    }
};
