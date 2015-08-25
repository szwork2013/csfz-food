var userDao = require('../dao/user');
var Constants = require('../utils/constants');
var _ = require('underscore');

module.exports = {
    /**
     * 新增用户
     * @param params {Object}
     * @returns {*|Promise.<T>}
     */
    addUser: function (params) {
        return userDao.create(params);
    },
    /**
     * 查询单个用户信息
     * @param params {Object}
     * @returns {*|Promise.<T>}
     */
    queryUser: function (params) {
        return userDao.findOne(params);
    },
    /**
     * 通过ID查询单个用户信息
     * @param params
     * @returns {*}
     */
    queryUserById: function (params) {
        return userDao.findById(params);
    },
    queryUserList: function () {
        return userDao.findUserList();
    },
    deleteUser: function (params) {
        return userDao.deleteUser(params);
    },
    /**
     * 更新用户信息
     * @param condition
     * @param params
     * @returns {*|Promise|Array|{index: number, input: string}}
     */
    updateUser: function (condition, params) {
        _.extend(params, {updateTime: new Date()});
        return userDao.findByIdAndUpdate(condition, params);
    },
    /**
     * 校验注册用户信息
     * @param params
     * @returns {*}
     */
    checkRegister: function (params) {
        return this.queryUser({email: params.email}).then(function (user) {
            if (user) {
                return {email: '邮箱已存在'};
            } else {
                return this.checkUser(params, {email: true, password: true, confirmPassword: true, realName: true});
            }
        }.bind(this));
    },
    /**
     * 校验更新基本信息
     * @param params
     * @returns {*|{}}
     */
    checkUpdate: function (params) {
        return this.checkUser(params, {realName: true});
    },
    /**
     * 校验修改密码信息
     * @param params
     * @param user
     * @returns {*}
     */
    checkUpdatePassword: function (params, user) {
        if (params.oldPassword !== user.password) {
            return {password: '原密码错误'};
        }

        return this.checkUser(params, {password: true, confirmPassword: true});
    },
    /**
     * 校验用户信息
     * @param params {Object}    基本信息
     * @param condition {Object} 需要校验的信息
     * @returns {{}}
     */
    checkUser: function (params, condition) {
        var errors = {};

        if (condition.email) {
            if (!params.email || params.email.length === 0) {
                errors.email = '请输入邮箱';
            } else if (!Constants.regexp.EMAIL.test(params.email)) {
                errors.email = '邮箱格式错误';
            }
        }

        if (condition.password) {
            if (!params.password || params.password.length === 0) {
                errors.password = '请输入密码';
            } else if (!Constants.regexp.PASSWORD.test(params.password)) {
                errors.password = '密码格式错误';
            }
        }

        if (condition.confirmPassword) {
            if (params.confirmPassword !== params.password) {
                errors.confirmPassword = '两次密码输入不一致';
            }
        }

        if (params.telephone && params.telephone.length > 0 && !Constants.regexp.TELEPHONE.test(params.telephone)) {
            errors.telephone = '电话格式错误';
        }

        if (params.mobile && params.mobile.length > 0 && !Constants.regexp.MOBILE.test(params.mobile)) {
            errors.mobile = '手机格式错误';
        }

        return errors;
    }
};