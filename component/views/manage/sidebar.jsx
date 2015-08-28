var React = require('react');
var Router = require('react-router');

var Sidebar = require('../common/sidebar.jsx');
var SidebarJSON = require('./sidebar.json');


module.exports = React.createClass({
    render: function () {
        return <Sidebar channel={this.props.channel} channels={SidebarJSON} header="内容管理"/>
    }
});