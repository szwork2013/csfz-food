var fileModel = require('../model/file');

module.exports = {
    /**
     * 新增文件
     * @param params
     * @returns {Promise.<T>|*}
     */
    create: function (params) {
        return fileModel.create(params).then(function (file) {
            return this.findById(file._id);
        }.bind(this));
    },
    /**
     * 通过ID查询文件信息
     * @param fileId
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findById: function (fileId) {
        return fileModel
            .findById(fileId)
            .exec();
    }
};
