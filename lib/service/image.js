var imageDao = require('../dao/image');

module.exports = {
    /**
     * 添加图片
     * @param params
     * @returns {*|params}
     */
    addImage: function (params) {
        return imageDao.create(params);
    },
    /**
     * 通过ID查询单个图片信息
     * @param params
     * @returns {*}
     */
    queryImageById: function (params) {
        return imageDao.findById(params);
    }
};
