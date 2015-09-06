var userModel = require('../model/user');

module.exports = {
    /**
     * 新增用户
     * @param params
     * @returns {Promise.<T>|*}
     */
    create: function (params) {
        return userModel.create(params).then(function (user) {
            return this.findById(user._id);
        }.bind(this));
    },
    /**
     * 查询单个用户信息
     * @param params
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findOne: function (params) {
        return userModel.findOne(params).exec();
    },
    /**
     * 查询多个用户，安装添加时间倒叙排列
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    find: function () {
        return userModel.find()
            .sort({'addTime': 'desc'})
            .populate('image')
            .populate('adder')
            .populate('updater')
            .exec();
    },
    /**
     * 通过ID查询用户
     * @param userId
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findById: function (userId) {
        return userModel.findById(userId)
            .populate('image')
            .populate('adder')
            .populate('updater')
            .exec();
    },
    /**
     * 更新并查询用户信息
     * @param condition
     * @param params
     * @returns {Promise|*|Array|{index: number, input: string}}
     */
    findByIdAndUpdate: function (condition, params) {
        return userModel.findByIdAndUpdate(condition, params)
            .populate('image')
            .populate('adder')
            .populate('updater')
            .exec();
    },
    remove: function (condition) {
        return userModel.remove(condition)
            .exec();
    }
};