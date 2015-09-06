var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app.jsx');
var Index = require('./views/index.jsx');
var Signin = require('./views/sign/signin.jsx');
var Signup = require('./views/sign/signup.jsx');


var AccountMessage = require('./views/account/message.jsx');
var AccountPassword = require('./views/account/password.jsx');


var ManageStore = require('./views/manage/store/index.jsx');
var ManageStoreEdit = require('./views/manage/store/edit.jsx');

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute name="index" handler={Index}/>
        <Route name="signin" path="signin" handler={Signin}/>
        <Route name="signup" path="signup" handler={Signup}/>

        <Route name="account-message" path="account/message" handler={AccountMessage}/>
        <Route name="account-password" path="account/password" handler={AccountPassword}/>

        <Route name="manage-store" path="manage/store" handler={ManageStore}/>
        <Route name="manage-store-new" path="manage/store/new" handler={ManageStoreEdit}/>
        <Route name="manage-store-edit" path="manage/store/edit/:storeId" handler={ManageStoreEdit}/>
    </Route>
);

module.exports = routes;