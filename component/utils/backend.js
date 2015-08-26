var $ = require('jquery');

module.exports = {
    get: {
        signup: function () {
            return $.get('/signup');
        },
        signin: function () {
            return $.get('/signin');
        },
        accountMessage: function () {
            return $.get('/account/message');
        },
        accountPassword: function () {
            return $.get('/account/password');
        },
        groupMessage: function () {
            return $.get('/group/message');
        },
        home: function () {
            return $.get('/');
        }
    },
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
        groupMessage: function (data) {
            return $.post('/group/message', data);
        }
    }
};
