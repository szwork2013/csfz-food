var _ = require('underscore');

var storeService = require('../service/store');
var foodService = require('../service/food');

module.exports = {
    mapping: '/manage',
    get: {
        /**
         * 店铺列表
         */
        '/store': function (req, res) {
            storeService.queryStoreList()
                .then(function (stores) {
                    var response = {
                        data: stores,
                        channel: 'manage',
                        seo: {
                            title: '店铺管理'
                        }
                    };

                    res.render(req.url, response);
                });
        },
        /**
         * 新增店铺
         */
        '/store/new': function (req, res) {
            var response = {
                channel: 'manage',
                seo: {
                    title: '新增店铺'
                }
            };

            req.isXmlHttpRequest ? res.json(response) : res.render(req.url, response);
        }
    }
};
