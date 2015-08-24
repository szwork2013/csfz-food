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
    queryUserList: function () {
        return userDao.findUserList();
    },
    queryUserById: function (params) {
        return userDao.findUserById(params);
    },
    deleteUser: function (params) {
        return userDao.deleteUser(params);
    },
    updateUser: function (condition, params) {
        _.extend(params, {updateTime: new Date()});
        return userDao.updateUserById(condition, params);
    },
    checkUpdateUser: function (params) {
        var self = this;
        return this.queryUser({email: params.email, _id: {$ne: params.id}}).then(function (user) {
            if (user) {
                return {email: '邮箱已存在'};
            } else {
                return self.checkUser(params);
            }
        });
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


        //if (!params.realname || params.realname.length === 0) {
        //    errors.realname = '请输入中文';
        //} else if (params.realname.length > 10) {
        //    errors.realname = '姓名长度过长';
        //} else if (!Constants.regexp.REALNAME.test(params.realname)) {
        //    errors.realname = '姓名格式错误';
        //}
        //
        //if (!params.dept || params.dept.length === 0) {
        //    errors.dept = '请输入部门';
        //} else if (params.dept.length > 20) {
        //    errors.dept = '部门长度过长';
        //}
        //
        //if (!params.duty || params.duty.length === 0) {
        //    errors.duty = '请输入职位';
        //} else if (params.duty.length > 20) {
        //    errors.duty = '职位长度过长';
        //}
        //
        //if (params.mobile.length > 0 && !Constants.regexp.MOBILE.test(params.mobile)) {
        //    errors.mobile = '手机号码格式错误';
        //}
        //
        //if (params.telephone.length > 0 && !Constants.regexp.TELEPHONE.test(params.telephone)) {
        //    errors.telephone = '电话号码格式错误';
        //}

        return errors;
    }
};