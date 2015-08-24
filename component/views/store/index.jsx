var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var backend = require('../../utils/backend');
var ee = require('../../utils/eventemitter');

var Link = Router.Link;

var Store = React.createClass({
    componentDidMount: function () {
        backend.get.storeList().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    render: function () {
        return (
            <div className="container">
                <div className="page-header">
                    <h3><i className="fa fa-coffee"></i>店铺列表</h3>
                </div>
                <List data={this.props.data}/>
            </div>
        )
    }
});


var List = React.createClass({
    render: function () {
        return (
            <div className="list-group">
                {this.props.data && this.props.data.map(function (item, index) {
                    return <Item data={item} key={index}/>
                })}
            </div>
        )
    }
});


var Item = React.createClass({
    render: function () {
        var store = this.props.data;
        return (
            <a className="list-group-item store-item" params={{storeId:store._id}} href="#">
                <h3 className="list-group-item-heading">{store.name}</h3>

                <div className="list-group-item-text">
                    <i className="fa fa-shopping-cart"></i>
                    <span>&nbsp;{store.mainProduct}&nbsp;</span>
                    <i className="fa fa-mobile-phone"></i>
                    <span>&nbsp;{store.telephone}&nbsp;</span>
                    <i className="fa fa-taxi"></i>
                    <span>&nbsp;{store.address}</span>
                </div>
            </a>
        )
    }
});

module.exports = Store;