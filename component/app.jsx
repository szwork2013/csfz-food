var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var bootstrap = require('./bootstrap/index');

var Layout = require('./views/layouts/default.jsx');

var RouteHandler = Router.RouteHandler;


module.exports  = React.createClass({
    componentDidMount: function () {
        bootstrap();
    },
    render: function () {
        var data = this.props.data;
        var layout = this.props.layout;
        var session = this.props.session;
        var channel = this.props.channel;
        var seo = this.props.seo;
        return (
            <Layout layout={layout} session={session} channel={channel} seo={seo}>
                <RouteHandler data={data} session={session}/>
            </Layout>
        )
    }
});