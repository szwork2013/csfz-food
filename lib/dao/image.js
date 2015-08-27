/**
 * Created by yuyangyang on 2015/5/19.
 */
var imageModel = require('../model/image');

module.exports = {
    /**
     * 添加图片
     * @param params
     * @returns {params}
     */
    create: function (params) {
        return imageModel.create(params);
    },
    /**
     * 通过ID查询图片
     * @param imageId
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findById: function (imageId) {
        return imageModel.findById(imageId)
            .exec();
    }
};