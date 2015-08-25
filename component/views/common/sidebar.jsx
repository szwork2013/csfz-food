var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

module.exports = React.createClass({
    render: function () {
        var channel = this.props.channel;
        return (
            <div className="main-sidebar">
                <div className="header">内容导航</div>
                <ul className="nav nav-pills nav-stacked">
                    {this.props.channels.map(function (nav, index) {
                        return (
                            <li className={nav.channel===channel?'active':''} key={index}>
                                <Link to={nav.to}><i className={'fa '+nav.iconClass}></i>{nav.text}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
});