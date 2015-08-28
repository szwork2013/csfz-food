var _ = require('underscore');

var storeService = require('../service/store');
var groupService = require('../service/group');

module.exports = {
    mapping: '/manage',
    get: {
        /**
         * 餐组列表
         */
        '/group': function (req, res) {
            groupService.queryGroupList().then(function (groups) {
                res.render(req.url, {
                    data: groups,
                    channel: 'manage',
                    seo: {
                        title: '所有餐组'
                    }
                });
            });
        },
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
        }
    }
};
