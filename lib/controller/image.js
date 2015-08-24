/**
 * Created by yuyangyang on 2015/7/23.
 */
var imageService = require('../service/image');

module.exports = {
    mapping: '/image',
    get: {},
    post: {
        /**
         * 上传图片
         */
        '/upload': function (req, res) {

            var response = {
                channel: 'index',
                seo: {
                    title: '首页'
                }
            };

            res.json(response);

        }
    }
};