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
    findOne: function (params) {
        return userModel.findOne(params).exec();
    },
    find: function () {
        return userModel.find()
            .sort({'createTime': 'desc'})
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
            .populate('adder')
            .populate('updater')
            .exec();
    },
    findByIdAndUpdate: function (condition, params) {
        return userModel.findByIdAndUpdate(condition, params)
            .populate('adder')
            .populate('updater')
            .exec();
    },
    remove: function (condition) {
        return userModel.remove(condition)
            .exec();
    }
};