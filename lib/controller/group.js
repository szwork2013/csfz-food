var _ = require('underscore');

var userService = require('../service/user');
var groupService = require('../service/group');
var Constants = require('../utils/constants');

module.exports = {
    mapping: '/group',
    get: {
        /**
         * 所有餐组
         */
        '/': function (req, res) {
            groupService.queryGroupList().then(function (groups) {
                res.render(req.url, {
                    data: groups,
                    channel: 'group',
                    seo: {
                        title: '所有餐组'
                    }
                });
            });
        },
        /**
         * 基本信息
         */
        '/message': function (req, res) {
            var userId = req.session.user._id;

            userService.queryUserById(userId)
                .then(function (user) {
                    return groupService.queryGroupById(user.group);
                })
                .then(function (group) {
                    res.render(req.url, {
                        data: group,
                        channel: 'group',
                        seo: {
                            title: '我的餐组'
                        }
                    });
                });
        }
    },
    post: {
        /**
         * 基本信息
         */
        '/message': function (req, res) {
            var currUser = req.session.user;
            var userId = currUser._id;
            var reqGroup = req.body;
            var groupId = reqGroup.groupId;

            var errors = groupService.checkUpdate(reqGroup);

            if (!_.isEmpty(errors)) {
                res.render(req.url, {
                    code: Constants.resCode.VALIDATOR_ERROR,
                    errors: errors
                });

                return;
            }

            if (!groupId) {
                groupService.addGroup({
                    adder: userId,
                    updater: userId,
                    groupName: reqGroup.groupName
                }).then(function (group) {
                    res.put({data: group});
                    return userService.updateUser({_id: userId}, {group: group._id});
                }).then(function (user) {
                    res.render(req.url, {
                        code: Constants.resCode.COMMON
                    });
                });


                return;
            }

            groupService.updateGroup({_id: groupId}, {
                updater: userId,
                groupName: reqGroup.groupName
            }).then(function (group) {
                res.render(req.url, {
                    code: Constants.resCode.COMMON,
                    data: group
                });
            });
        }
    }
};