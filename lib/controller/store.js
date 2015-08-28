var _ = require('underscore');

var storeService = require('../service/store');
var foodService = require('../service/food');
var Constants = require('../utils/constants');

module.exports = {
    mapping: '/store',
    get: {
        /**
         * 店铺列表
         */
        '/': function (req, res) {
            storeService.queryStoreList()
                .then(function (stores) {
                    var response = {
                        data: stores,
                        channel: 'store',
                        seo: {
                            title: '店铺列表'
                        }
                    };

                    res.render(req.url, response);
                });
        },
        /**
         * 新增店铺
         */
        '/new': function (req, res) {
            res.render(req.url, {
                channel: 'store',
                seo: {
                    title: '新增店铺'
                }
            });
        }
    },
    post: {
        /**
         * 新增店铺
         */
        '/new': function (req, res) {
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