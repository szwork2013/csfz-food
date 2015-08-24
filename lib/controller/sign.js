var _ = require('underscore');

var userService = require('../service/user');
var Constants = require('../utils/constants');

module.exports = {
    get: {
        /**
         * 注册
         */
        '/signup': function (req, res) {
            res.render(req.url, {
                layout: 'empty',
                seo: {
                    title: '用户注册'

                }
            });
        },
        /**
         * 登录
         */
        '/signin': function (req, res) {
            res.render(req.url, {
                layout: 'empty',
                seo: {
                    title: '用户登录'

                }
            });
        }
    },
    post: {
        /**
         * 注册
         */
        '/signup': function (req, res) {
            userService.checkRegister(req.body)
                .then(function (errors) {
                    /**
                     * 校验失败
                     */
                    if (!_.isEmpty(errors)) {
                        res.render(req.url, {
                            code: Constants.resCode.VALIDATOR_ERROR,
                            errors: errors
                        });

                        return;
                    }

                    userService.addUser(req.body).then(function (user) {
                        req.session.user = user;
                        res.render(req.url, {
                            code: Constants.resCode.COMMON,
                            data: user
                        });
                    });

                })
                .end(function (err) {
                    throw err;
                });
        },
        /**
         * 登录
         */
        '/signin': function (req, res) {
            userService.queryUser(req.body)
                .then(function (user) {
                    if (user) {
                        req.session.user = user;
                        res.render(req.url, {
                            code: Constants.resCode.COMMON,
                            data: user
                        });
                    } else {
                        res.render(req.url, {
                            code: Constants.resCode.VALIDATOR_ERROR,
                            errors: {email: '邮箱或密码错误'}
                        });
                    }
                })
                .end(function (err) {
                    throw err;
                });
        }
    }
};
