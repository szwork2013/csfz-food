var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var backend = require('../../utils/backend');
var moment = require('moment');
var ee = require('../../utils/eventemitter');

var Sidebar = require('./sidebar.jsx');

var Store = React.createClass({
    componentDidMount: function () {
        backend.get.manageStore().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Sidebar channel="manage-store"/>
                <List data={this.props.data}/>
            </div>
        )
    }
});


var List = React.createClass({
    getInitialState: function () {
        return {list: this.props.data || []};
    },
    render: function () {
        return (
            <div className="manage-content">
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>店铺名称</th>
                        <th>主营产品</th>
                        <th>联系方式</th>
                        <th>店铺地址</th>
                        <th>创建人</th>
                        <th>创建时间</th>
                        <th>更新人</th>
                        <th>更新时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.list.map(function (item, index) {
                        return <Item data={item} index={index} key={index}/>
                    })}
                    </tbody>
                </table>
            </div>
        )
    }
});


var Item = React.createClass({
    render: function () {
        var index = this.props.index;
        var store = this.props.data;
        return (
            <tr>
                <td>{index}</td>
                <td>{store.name}</td>
                <td>{store.mainProduct}</td>
                <td>{store.telephone}</td>
                <td>{store.address}</td>
                <td>{moment(store.addTime).format('YYYY-MM-DD')}</td>
                <td>{store.creater ? store.creater.realname : ''}</td>
                <td>{store.updater ? store.updater.realname : ''}</td>
                <td>{moment(store.updateTime).format('YYYY-MM-DD')}</td>
                <td>
                    <div className="btn-group btn-group-xs">
                        <button type="button" className="btn btn-primary">修改
                        </button>
                        <button type="button" className="btn btn-danger">删除
                        </button>
                        <button type="button" className="btn btn-success">管理套餐
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
});

module.exports = Store;