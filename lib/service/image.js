var imageDao = require('../dao/image');

module.exports = {
    addOrder: function (params) {
        return imageDao.createImage(params);
    }
};
