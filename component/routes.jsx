var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./app.jsx');
var Index = require('./views/index.jsx');
var Signin = require('./views/sign/signin.jsx');
var Signup = require('./views/sign/signup.jsx');

var Manage = require('./views/manage/index.jsx');
var ManageStore = require('./views/manage/store.jsx');
var ManageStoreNew = require('./views/manage/store-new.jsx');

var AccountMessage =require('./views/account/message.jsx');
var AccountPassword =require('./views/account/password.jsx');

var Group =require('./views/group/index.jsx');
var GroupMessage =require('./views/group/message.jsx');

var Store = require('./views/store/index.jsx');

var routes = (
    <Route handler={App} path="/">
        <DefaultRoute name="index" handler={Index}/>
        <Route name="signin" path="signin" handler={Signin}/>
        <Route name="signup" path="signup" handler={Signup}/>

        <Route name="account-message" path="account/message" handler={AccountMessage}/>
        <Route name="account-password" path="account/password" handler={AccountPassword}/>

        <Route name="group" path="group" handler={Group}/>
        <Route name="group-message" path="group/message" handler={GroupMessage}/>

        <Route name="store" path="store" handler={Store}/>

        <Route name="manage" path="manage" handler={Manage}>
            <Route name="manage-store" path="store" handler={ManageStore}/>
            <Route name="manage-store-new" path="store/new" handler={ManageStoreNew}/>
        </Route>
    </Route>
);

module.exports = routes;