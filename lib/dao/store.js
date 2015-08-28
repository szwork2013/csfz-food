var storeModel = require('../model/store');

module.exports = {
    /**
     * 新增店铺
     * @param params
     * @returns {Promise.<T>|*}
     */
    create: function (params) {
        return storeModel.create(params).then(function (store) {
            return this.findById(store._id);
        }.bind(this));
    },
    /**
     * 查询多个店铺信息
     * @param params
     * @returns {*}
     */
    find: function (params) {
        return storeModel.find(params)
            .populate('adder')
            .populate('updater')
            .populate('group')
            .sort({'addTime': 'desc'})
            .exec();
    },
    /**
     * 查询单个店铺信息
     * @param params
     * @returns {*}
     */
    findOne: function (params) {
        return storeModel.findOne(params)
            .populate('adder')
            .populate('updater')
            .populate('group')
            .exec();
    },
    /**
     * 通过ID查询店铺信息
     * @param storeId
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findById: function (storeId) {
        return storeModel
            .findById(storeId)
            .populate('adder')
            .populate('updater')
            .populate('group')
            .exec();
    },
    updateStore: function (condition, params) {
        return storeModel.findByIdAndUpdate(condition, params)
            .populate('adder')
            .populate('updater')
            .populate('group')
            .exec();
    },
    deleteStore: function (condition) {
        return storeModel.remove(condition).exec();
    }
};