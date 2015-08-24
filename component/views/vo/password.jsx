var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var backend = require('../../utils/backend');
var ee = require('../../utils/eventemitter');

var Sidebar = require('../common/sidebar.jsx');
var SidebarJSON = require('./sidebar.json');

module.exports = React.createClass({
    componentDidMount: function () {
        backend.get.voPassword().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Sidebar channel="vo-password" channels={SidebarJSON}/>
            </div>
        )
    }
});