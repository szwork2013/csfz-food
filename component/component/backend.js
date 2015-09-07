var $ = require('jquery');

module.exports = {
    post: {
        signup: function (data) {
            return $.post('/signup', data);
        },
        signin: function (data) {
            return $.post('/signin', data);
        },
        accountMessage: function (data) {
            return $.post('/account/message', data);
        },
        accountPassword: function (data) {
            return $.post('/account/password', data);
        },
        manageStoreNew: function (data) {
            return $.post('/manage/store/new', data);
        },
        manageStoreUpdate: function (data) {
            return $.post('/manage/store/update', data);
        },
        manageStoreDelete: function (data) {
            return $.post('/manage/store/delete', data);
        }
    }
};
