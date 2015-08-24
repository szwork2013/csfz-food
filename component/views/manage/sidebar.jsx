var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var json = [
    {
        channel: 'manage-store',
        text: '店铺管理',
        iconClass: 'fa-building',
        to: 'manage-store'
    }
];


module.exports = React.createClass({
    render: function () {
        var channel = this.props.channel;
        return (
            <div className="manage-sidebar">
                <div className="header">管理导航</div>
                <ul className="nav nav-pills nav-stacked">
                    {json.map(function (nav, index) {
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