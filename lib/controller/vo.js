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
    },
    post: {
        /**
         * 基本信息
         */
        '/message': function (req, res) {
            var params = req.body;
            var userId = req.session.user._id;

            var errors = userService.checkUpdate(params);

            if (!_.isEmpty(errors)) {
                res.render(req.url, {
                    code: Constants.resCode.VALIDATOR_ERROR,
                    errors: errors
                });

                return;
            }

            userService.updateUser({_id: userId}, _.extend({updater: userId}, params)).then(function (user) {
                req.session.user = user;
                res.render(req.url, {
                    code: Constants.resCode.COMMON,
                    data: user
                });
            });
        },
        /**
         * 修改密码
         */
        '/password': function (req, res) {
            var params = req.body;
            var curUser = req.session.user;
            var userId = curUser._id;

            var errors = userService.checkUpdatePassword(params, curUser);

            if (!_.isEmpty(errors)) {
                res.render(req.url, {
                    code: Constants.resCode.VALIDATOR_ERROR,
                    errors: errors
                });

                return;
            }

            userService.updateUser({_id: userId}, _.extend({updater: userId}, {password: params.password})).then(function (user) {
                req.session.user = user;
                res.render(req.url, {
                    code: Constants.resCode.COMMON,
                    data: user
                });
            });
        }
    }
};