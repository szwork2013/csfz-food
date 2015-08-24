var React = require('react');
var backend = require('../utils/backend');

module.exports = React.createClass({
    componentDidMount: function () {
        backend.get.home().then(function (response) {
            this.props.update(response);
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