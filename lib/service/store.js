var storeDao = require('../dao/store');
var Constants = require('../utils/constants');
var _ = require('underscore');

module.exports = {
    /**
     * 新增店铺
     * @param params
     * @returns {*}
     */
    addStore: function (params) {
        return storeDao.create(params);
    },
    /**
     * 查询店铺列表
     * @param params
     * @returns {*}
     */
    queryStoreList: function (params) {
        return storeDao.find(params);
    },
    /**
     * 查询单个店铺信息
     * @param params
     * @returns {*}
     */
    queryStore: function (params) {
        return storeDao.findOne(params);
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
    /**
     * 校验新增店铺
     * @param params
     * @param userId
     * @returns {*}
     */
    checkAddStore: function (params) {
        return this.queryStore({name: params.name, group: params.group})
            .then(function (store) {
                if (store) {
                    return {name: '店铺名称已存在'};
                } else {
                    return this.checkStore(params);
                }
            }.bind(this));
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
        } else if (params.name.length > 40) {
            errors.name = '店铺名称40个字符以内';
        }

        if (!params.description || params.name.description === 0) {
            errors.description = '请输入店铺描述';
        } else if (params.description.length > 200) {
            errors.description = '店铺描述200个字符以内';
        }

        if (!params.mainProduct || params.mainProduct.length === 0) {
            errors.mainProduct = '请输入主营产品';
        } else if (params.mainProduct.length > 20) {
            errors.mainProduct = '主营产品过20个字符以内';
        }

        if (!params.telephone || params.telephone.length === 0) {
            errors.telephone = '请输入联系方式';
        } else if (!Constants.regexp.TELEPHONE.test(params.telephone)) {
            errors.telephone = '联系电话方式错误';
        }

        if (!params.address || params.address.length === 0) {
            errors.address = '请输入店铺地址';
        } else if (params.address.length > 40) {
            errors.address = '店铺地址40个字符以内';
        }

        return errors;
    }
};
