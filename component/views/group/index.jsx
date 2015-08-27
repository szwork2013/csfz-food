var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var _ = require('underscore');
var backend = require('../../utils/backend');

var Sidebar = require('./sidebar.jsx');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <Sidebar channel="group"/>
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
            <div className="main-content">
                <div className="page-header">
                    <h4>所有餐组</h4>
                </div>
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