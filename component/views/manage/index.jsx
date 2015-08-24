var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var Manage = React.createClass({
    render: function () {
        return <RouteHandler {...this.props}/>
    }
});

module.exports = Manage;