var groupDao = require('../dao/group');
var Constants = require('../utils/constants');
var _ = require('underscore');

module.exports = {
    /**
     * 新增餐组
     * @param params {Object}
     * @returns {*|Promise.<T>}
     */
    addGroup: function (params) {
        return groupDao.create(params);
    },
    /**
     * 查询单个餐组信息
     * @param params {Object}
     * @returns {*|Promise.<T>}
     */
    queryGroup: function (params) {
        return groupDao.findOne(params);
    },
    /**
     * 通过ID查询单个餐组信息
     * @param params
     * @returns {*}
     */
    queryGroupById: function (params) {
        return groupDao.findById(params);
    },
    /**
     * 查询多个餐组信息
     * @param params
     * @returns {*}
     */
    queryGroupList: function (params) {
        return groupDao.find(params);
    },
    //deleteUser: function (params) {
    //    return groupDao.deleteUser(params);
    //},
    /**
     * 更新餐组信息
     * @param condition
     * @param params
     * @returns {*|Promise|Array|{index: number, input: string}}
     */
    updateGroup: function (condition, params) {
        _.extend(params, {updateTime: new Date()});
        return groupDao.findByIdAndUpdate(condition, params);
    },
    /**
     * 校验更新餐组信息
     * @param params
     * @param user
     * @returns {*}
     */
    checkUpdate: function (params) {
        return this.checkGroup(params, {groupName: true});
    },
    ///**
    // * 校验更新基本信息
    // * @param params
    // * @returns {*|{}}
    // */
    //checkUpdate: function (params) {
    //    return this.checkUser(params, {realName: true});
    //},
    ///**
    // * 校验修改密码信息
    // * @param params
    // * @param user
    // * @returns {*}
    // */
    //checkUpdatePassword: function (params, user) {
    //    if (params.oldPassword !== user.password) {
    //        return {password: '原密码错误'};
    //    }
    //
    //    return this.checkUser(params, {password: true, confirmPassword: true});
    //},
    /**
     * 校验餐组信息
     * @param params {Object}    基本信息
     * @param condition {Object} 需要校验的信息
     * @returns {{}}
     */
    checkGroup: function (params, condition) {
        var errors = {};

        if (condition.groupName) {
            if (!params.groupName || params.groupName.length === 0) {
                errors.email = '请输入餐组名称';
            } else if (params.groupName.length > 20) {
                errors.email = '餐组名称长度过长';
            }
        }

        return errors;
    }
};