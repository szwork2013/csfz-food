var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var ee = require('./utils/eventemitter');

var Layout = require('./views/layouts/default.jsx');

var RouteHandler = Router.RouteHandler;


var App = React.createClass({
    getInitialState: function () {
        return {response: this.props};
    },
    componentDidMount: function () {
        ee.on('update', function (response) {
            this.setState({response: response});
        }.bind(this));
    },
    render: function () {
        return (
            <Layout data={this.state.response} session={this.state.response.session}>
                <RouteHandler data={this.state.response.data} session={this.state.response.session}/>
            </Layout>
        )
    }
});

module.exports = App;
