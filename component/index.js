var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var Routes = require('./routes.jsx');


var _window;
var _document;
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    _window = window;
    _document = document;
}


document.addEventListener('DOMContentLoaded', function onLoad() {
    Router.run(Routes, Router.HistoryLocation, function onRouterRun(Root, state) {
        $.get(state.path, state.query).then(function (data) {
            var componentInstance = React.createElement(Root, data);
            React.render(componentInstance, _document);
        });
    });
});