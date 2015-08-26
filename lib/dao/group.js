var groupModel = require('../model/group');

module.exports = {
    /**
     * 新增餐组
     * @param params
     * @returns {Promise.<T>|*}
     */
    create: function (params) {
        return groupModel.create(params).then(function (user) {
            return this.findById(user._id);
        }.bind(this));
    },
    /**
     * 查询单个餐组信息
     * @param params
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findOne: function (params) {
        return groupModel.findOne(params)
            .populate('adder')
            .populate('updater')
            .exec();
    },
    /**
     * 查询多个餐组，安装添加时间倒叙排列
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    find: function () {
        return groupModel.find()
            .sort({'addTime': 'desc'})
            .populate('adder')
            .populate('updater')
            .exec();
    },
    /**
     * 通过ID查询餐组
     * @param userId
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findById: function (groupId) {
        return groupModel.findById(groupId)
            .populate('adder')
            .populate('updater')
            .exec();
    },
    /**
     * 更新并查询餐组信息
     * @param condition
     * @param params
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findByIdAndUpdate: function (condition, params) {
        return groupModel.findByIdAndUpdate(condition, params)
            .populate('adder')
            .populate('updater')
            .exec();
    },
    remove: function (condition) {
        return groupModel.remove(condition)
            .exec();
    }
};