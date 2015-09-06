var _ = require('underscore');

var storeService = require('../service/store');
var Constants = require('../utils/constants');

module.exports = {
    mapping: '/manage',
    get: {
        /**
         * 店铺列表
         */
        '/store': function (req, res) {
            storeService.queryStoreList()
                .then(function (stores) {
                    res.render(req.url, {
                        channel: 'manage',
                        data: stores,
                        seo: {
                            title: '所有店铺'
                        }
                    });
                });
        },
        /**
         * 新增店铺
         */
        '/store/new': function (req, res) {
            res.render(req.url, {
                channel: 'manage',
                seo: {
                    title: '新增店铺'
                }
            });
        },
        /**
         * 修改店铺
         */
        '/store/edit/:storeId': function (req, res) {
            storeService.queryStoreById(req.params.storeId).then(function (store) {
                res.render(req.url, {
                    data: store,
                    channel: 'manage',
                    seo: {
                        title: '修改店铺'
                    }
                });
            });

        }
    },
    post: {
        /**
         * 新增店铺
         */
        '/store/new': function (req, res) {
            var currUser = req.session.user;
            var userId = currUser._id;
            var reqStore = req.body;

            storeService.checkAddStore(reqStore).then(function (errors) {
                if (!_.isEmpty(errors)) {
                    res.render(req.url, {
                        code: Constants.resCode.VALIDATOR_ERROR,
                        errors: errors
                    });

                    return;
                }

                storeService.addStore(_.extend(reqStore, {adder: userId, updater: userId})).then(function (store) {
                    res.render(req.url, {
                        code: Constants.resCode.COMMON,
                        data: store
                    });
                });
            });
        }
    }
};