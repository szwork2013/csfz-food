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
    /**
     * 通过ID查询店铺信息
     * @param storeId
     * @returns {*|Promise|Array|{index: number, input: string}}
     */
    queryStoreById: function (storeId) {
        return storeDao.findById(storeId);

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
    /**
     * 校验修改店铺
     * @param params
     * @returns {*}
     */
    checkUpdateStore: function (params) {
        return this.queryStore({name: params.name, _id: {$ne: params._id}})
            .then(function (store) {
                if (store) {
                    return {name: '店铺名称已存在'};
                } else {
                    return this.checkStore(params);
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
            errors.telephone = '联系方式格式错误';
        }

        if (!params.address || params.address.length === 0) {
            errors.address = '请输入店铺地址';
        } else if (params.address.length > 40) {
            errors.address = '店铺地址40个字符以内';
        }

        if (!params.minPrice || params.minPrice.length === 0) {
            errors.minPrice = '请输入起送价';
        } else if (!Constants.regexp.PRICE.test(params.minPrice)) {
            errors.minPrice = '起送价格式错误';
        }

        return errors;
    }
};
