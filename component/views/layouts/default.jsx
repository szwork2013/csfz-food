var React = require('react');

var Navbar = require('../partials/navbar.jsx');


var Layout = React.createClass({
    render: function render() {
        return (
            <html>
            <head>
                <meta charSet='utf-8'/>
                <title>{this.props.data.seo.title}</title>
                <link rel="stylesheet" href="/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="/css/bootstrap.css"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>
            <body>
            {this.props.data.layout !== 'empty' ?
                <div>
                    <Navbar channel={this.props.data.channel} session={this.props.session}/>
                </div>
                : ''
            }
            {this.props.children}
            <script src="/build/lib/bundle.js"></script>
            <script src="/build/bundle.js"></script>
            </body>
            </html>
        );
    }
});

module.exports = Layout;