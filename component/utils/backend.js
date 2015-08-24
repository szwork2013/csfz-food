var $ = require('jquery');

module.exports = {
    get: {
        signup: function () {
            return $.get('/signup');
        },
        signin: function () {
            return $.get('/signin');
        },
        storeList: function () {
            return $.get('/store');
        },
        home: function () {
            return $.get('/');
        },
        manageStore: function () {
            return $.get('/manage/store');
        },
        manageStoreNew: function () {
            return $.get('/manage/store/new');
        }
    },
    post: {
        signup: function (data) {
            return $.post('/signup', data);
        },
        signin: function (data) {
            return $.post('/signin', data);
        },
        manageStoreNew: function (data) {
            return $.post('/manage/store/new', data);
        },
        imageUpload: function (data) {
            
        }
    }
};
