var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var _ = require('underscore');
var backend = require('../../../component/backend');
var EventEmitter = require('wolfy87-eventemitter');
var ui = require('../../../component/ui');
var Constants = require('../../../../lib/utils/constants');

var Sidebar = require('../sidebar.jsx');
var ee = new EventEmitter();
var Link = Router.Link;

module.exports = React.createClass({
    getInitialState: function () {
        return {data: this.props.data || []};
    },
    componentDidMount: function () {
        ee.on('delete', function (index, storeId, callback) {
            backend.post.manageStoreDelete({storeId: storeId}).then(function (response) {
                callback && callback();
                if (response.code === Constants.resCode.COMMON) {
                    ui.tip('删除成功！');
                    this.state.data.splice(index, 1);
                    this.forceUpdate();
                } else {
                    ui.tip('删除失败，请稍后再试！');
                }

            }.bind(this));
        }.bind(this));
    },
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
                    {_.isEmpty(this.state.data) ?

                        <div className="text-center">暂无店铺，马上<Link to="manage-store-new">添加</Link></div> :
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
                            {this.state.data.map(function (item, index) {
                                return <Item data={item} index={index} key={index}/>
                            }.bind(this))}
                            </tbody>
                        </table>
                    }

                </div>
            </div>
        )
    }
});


var Item = React.createClass({
    getInitialState: function () {
        return {deleting: false};
    },
    handleDelete: function (index, storeId) {
        ui.alert({
            title: '删除',
            content: '确认删除该店铺？',
            onCertain: function () {
                this.setState({deleting: true});
                ee.emit('delete', index, storeId, function () {
                    this.setState({deleting: false});
                }.bind(this));
            }.bind(this)
        });

    },
    render: function () {
        var store = this.props.data;
        var index = this.props.index;

        var delText = this.state.deleting ? '删除中...' : '删除';

        return (
            <tr>
                <td>{index}</td>
                <td>{store.name}</td>
                <td>{store.adder && store.adder.realName}</td>
                <td>{moment(store.addTime).format('YYYY-MM-DD')}</td>
                <td>{store.updater && store.updater.realName}</td>
                <td>{moment(store.updateTime).format('YYYY-MM-DD')}</td>
                <td>
                    <Link to="manage-store-edit" className="btn btn-primary btn-xs"
                          params={{storeId:store._id}}>修改</Link>
                    <button type="button" className="btn btn-danger btn-xs"
                            onClick={this.handleDelete.bind(this,index,store._id)}>{delText}
                    </button>
                    <button type="button" className="btn btn-info btn-xs">套餐管理</button>
                </td>
            </tr>
        )
    }
});