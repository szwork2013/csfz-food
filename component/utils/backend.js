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
        group: function () {
            return $.get('/group');
        },
        groupMessage: function (data) {
            return $.post('/group/message', data);
        },
        storeNew: function (data) {
            return $.post('/store/new', data);
        }
    }
};
