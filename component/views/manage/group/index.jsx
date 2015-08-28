var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var _ = require('underscore');
var backend = require('../../../utils/backend');

var Sidebar = require('../sidebar.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="container">
                <Sidebar channel="manage-group"/>
                <List data={this.props.data} user={this.props.session.user}/>
            </div>
        )
    }
});


var List = React.createClass({
    getDefaultProps: function () {
        return {data: []};
    },
    render: function () {
        return (
            <div className="col-sm-9 main-content">
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><a href="#">我的餐组</a></li>
                    <li role="presentation"><a href="#">我的申请</a></li>
                    <li role="presentation"><a href="#">管理申请</a></li>
                </ul>
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>餐组名称</th>
                        <th>创建人</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {_.isArray(this.props.data) ? this.props.data.map(function (item, index) {
                        return <Item data={item} user={this.props.user} index={index} key={index}/>
                    }.bind(this)) : ''}
                    </tbody>
                </table>
            </div>
        )
    }
});


var Item = React.createClass({
    render: function () {
        var index = this.props.index;
        var group = this.props.data;

        var user = this.props.user;

        return (
            <tr>
                <td>{index}</td>
                <td>{group.groupName}</td>
                <td>{group.adder.realName}</td>
                <td>{moment(group.addTime).format('YYYY-MM-DD')}</td>
                <td>
                    {group._id === user.group ?
                        <button type="button" className="btn btn-danger btn-xs">退出该组</button> :
                        <button type="button" className="btn btn-primary btn-xs">申请加入</button>
                    }

                </td>
            </tr>
        )
    }
});