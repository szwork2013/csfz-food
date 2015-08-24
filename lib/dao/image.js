/**
 * Created by yuyangyang on 2015/5/19.
 */
var imageModel = require('../model/image');

module.exports = {
    createImage: function (params) {
        return imageModel.create(params);
    }
};