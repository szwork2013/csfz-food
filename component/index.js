var Routes = require('./routes.jsx');
var Client = require('react-engine/lib/client');

var options = {
    routes: Routes,
    viewResolver: function(viewName) {
        return require('./views/' + viewName);
    }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
    Client.boot(options);
});