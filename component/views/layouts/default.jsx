var React = require('react');

var Navbar = require('../partials/navbar.jsx');


module.exports = React.createClass({
    render: function render() {
        var layout = this.props.layout;
        var seo = this.props.seo;
        var channel = this.props.channel;
        var session = this.props.session;

        return (
            <html>
            <head>
                <meta charSet='utf-8'/>
                <title>{seo.title}</title>
                <link rel="stylesheet" href="/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="/css/bootstrap.css"/>
                <link rel="stylesheet" href="/css/style.css"/>
            </head>
            <body>
            {layout !== 'empty' ?
                <div>
                    <Navbar channel={channel} session={session}/>
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
