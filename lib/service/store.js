var storeDao = require('../dao/store');
var Constants = require('../utils/constants');
var _ = require('underscore');

module.exports = {
    addStore: function (params) {
        return storeDao.createStore(params);
    },
    queryStoreList: function () {
        return storeDao.findStoreList();
    },
    queryStore: function (params) {
        return storeDao.findStore(params);
    },
    queryStoreById: function (params) {
        return storeDao.findStoreById(params);

    },
    updateStore: function (condition, params) {
        _.extend(params, {updateTime: new Date()});
        return storeDao.updateStore(condition, params);
    },
    deleteStore: function (condition) {
        return storeDao.deleteStore(condition);
    },
    checkCreateStore: function (params) {
        var self = this;
        return this.queryStore({name: params.name})
            .then(function (store) {
                if (store) {
                    return {name: '店铺名称已存在'};
                } else {
                    return self.checkStore(params);
                }
            });
    },
    checkUpdateStore: function (params) {
        var self = this;
        return this.queryStore({name: params.name, _id: {$ne: params.id}})
            .then(function (store) {
                if (store) {
                    return {name: '店铺名称已存在'};
                } else {
                    return self.checkStore(params);
                }
            });
    },
    checkStore: function (params) {
        var errors = {};

        if (!params.name || params.name.length === 0) {
            errors.name = '请输入店铺名称';
        } else if (params.name.length > 50) {
            errors.name = '店铺名称过长';
        }

        if (!params.mainProduct || params.mainProduct.length === 0) {
            errors.mainProduct = '请输入主营产品';
        } else if (params.mainProduct.length > 50) {
            errors.mainProduct = '主营产品过长';
        }

        if (!params.telephone || params.telephone.length === 0) {
            errors.telephone = '请输入联系电话';
        } else if (!Constants.regexp.TELEPHONE.test(params.telephone)) {
            errors.telephone = '联系电话格式错误';
        }

        if (!params.address || params.address.length === 0) {
            errors.address = '请输入店铺地址';
        } else if (params.address.length > 50) {
            errors.address = '店铺地址过长';
        }

        return errors;
    }
};
