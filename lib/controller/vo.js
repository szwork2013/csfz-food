var _ = require('underscore');

var userService = require('../service/user');
var Constants = require('../utils/constants');

module.exports = {
    mapping: '/vo',
    get: {
        /**
         * 基本信息
         */
        '/message': function (req, res) {
            userService.queryUserById(req.session.user._id).then(function (user) {
                res.render(req.url, {
                    channel: 'vo',
                    seo: {
                        title: '基本信息'
                    },
                    data: user
                });
            });
        },
        /**
         * 修改密码
         */
        '/password': function (req, res) {
            res.render(req.url, {
                channel: 'vo',
                seo: {
                    title: '修改密码'
                }
            });
        }
    }
};