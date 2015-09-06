var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var backend = require('../../../component/backend');

var Sidebar = require('../sidebar.jsx');

var Link = Router.Link;

module.exports = React.createClass({
    render: function () {
        return (
            <div className="container">
                <Sidebar channel="manage-store"/>

                <div className="main-content col-sm-9">
                    <div className="page-header">
                        <h4>
                            所有店铺
                            <Link to="manage-store-new" className="btn btn-primary btn-sm pull-right">新增店铺</Link>
                        </h4>
                    </div>
                    <table className="table table-striped table-hover ">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>店铺名称</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th>更新人</th>
                            <th>更新时间</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.data.map(function (item, index) {
                            return <Item data={item} index={index} key={index}/>
                        }.bind(this))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
});


var Item = React.createClass({
    render: function () {
        var store = this.props.data;
        var index = this.props.index;
        return (
            <tr>
                <td>{index}</td>
                <td>{store.name}</td>
                <td>{store.adder && store.adder.realName}</td>
                <td>{moment(store.addTime).format('YYYY-MM-DD')}</td>
                <td>{store.updater && store.updater.realName}</td>
                <td>{moment(store.updateTime).format('YYYY-MM-DD')}</td>
                <td>
                    <Link to="manage-store-edit" className="btn btn-primary btn-xs" params={{storeId:store._id}}>修改</Link>
                    <button type="button" className="btn btn-danger btn-xs">删除</button>
                    <button type="button" className="btn btn-info btn-xs">套餐管理</button>
                </td>
            </tr>
        )
    }
});