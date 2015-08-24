var React = require('react');
var backend = require('../utils/backend');
var ee = require('../utils/eventemitter');

module.exports = React.createClass({
    componentDidMount: function () {
        backend.get.home().then(function (response) {
            ee.emit('update', response);
        }.bind(this))
    },
    render: function () {
        return (
            <div className="main-content">
                <div>d</div>
            </div>
        )
    }
});