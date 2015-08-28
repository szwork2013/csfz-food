var React = require('react');
var Router = require('react-router');

var Link = Router.Link;

var navJson = require('./navbar.json');


var NavItem = React.createClass({
    render: function () {
        var channel = this.props.channel;
        var nav = this.props.nav;

        var active = channel === nav.channel ? 'active' : '';

        return (
            <li className={active}><Link to={nav.to}>{nav.text}</Link></li>
        )
    }
});


module.exports = React.createClass({
    render: function () {
        var session = this.props.session;

        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="index">CSFZ-FOOD</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {navJson.map(function (nav, index) {
                                return <NavItem nav={nav} key={index} channel={this.props.channel}/>
                            }.bind(this))}
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    {session.user.realName} <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="account-message">账号管理</Link></li>
                                    <li><a href="/signout">注销</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});



