/**
 * 权限控制中间件
 */

var notNeedLoginUrls = [
    /^\/signin?.*$/,
    /^\/signup?.*$/
];

function matchPattern(url, list) {
    var match = false;
    list.forEach(function (regex) {
        if (regex.test(url)) {
            match = true;
        }
    });

    return match;
}


module.exports = {
    filter: function (req, res, next) {
        var notNeedLogins = matchPattern(req.url, notNeedLoginUrls);
        var session = req.session;

        if ((!session || !session.user) && !notNeedLogins) {
            res.redirect('/signin');
            return;
        }

        next();

    }
};

