var fileDao = require('../dao/file');

module.exports = {
    /**
     * 新增文件
     * @param params
     * @returns {*}
     */
    addFile: function (params) {
        return fileDao.create(params);
    },
    /**
     * 通过ID查询文件信息
     * @param fileId
     * @returns {*|Promise|Array|{index: number, input: string}}
     */
    queryFileById: function (fileId) {
        return fileDao.findById(fileId);

    }
};

