/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Routes = __webpack_require__(1);
	var Client = __webpack_require__(31);

	var options = {
	    routes: Routes,
	    viewResolver: function(viewName) {
	        return __webpack_require__(33)("./" + viewName);
	    }
	};

	document.addEventListener('DOMContentLoaded', function onLoad() {
	    Client.boot(options);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);

	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;

	var App = __webpack_require__(5);
	var Index = __webpack_require__(12);
	var Signin = __webpack_require__(14);
	var Signup = __webpack_require__(18);

	var Manage = __webpack_require__(2);
	var ManageStore = __webpack_require__(20);
	var ManageStoreNew = __webpack_require__(23);

	var VoMessage = __webpack_require__(25);
	var VoPassword = __webpack_require__(29);

	var Store = __webpack_require__(30);

	var routes = React.createElement(
	    Route,
	    { handler: App, path: '/' },
	    React.createElement(DefaultRoute, { name: 'index', handler: Index }),
	    React.createElement(Route, { name: 'signin', path: 'signin', handler: Signin }),
	    React.createElement(Route, { name: 'signup', path: 'signup', handler: Signup }),
	    React.createElement(Route, { name: 'vo-message', path: 'vo/message', handler: VoMessage }),
	    React.createElement(Route, { name: 'vo-password', path: 'vo/password', handler: VoPassword }),
	    React.createElement(Route, { name: 'store', path: 'store', handler: Store }),
	    React.createElement(
	        Route,
	        { name: 'manage', path: 'manage', handler: Manage },
	        React.createElement(Route, { name: 'manage-store', path: 'store', handler: ManageStore }),
	        React.createElement(Route, { name: 'manage-store-new', path: 'store/new', handler: ManageStoreNew })
	    )
	);

	module.exports = routes;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);

	var RouteHandler = Router.RouteHandler;

	var Manage = React.createClass({
	    displayName: 'Manage',

	    render: function render() {
	        return React.createElement(RouteHandler, this.props);
	    }
	});

	module.exports = Manage;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = ReactRouter;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var ee = __webpack_require__(7);

	var Layout = __webpack_require__(9);

	var RouteHandler = Router.RouteHandler;

	var App = React.createClass({
	    displayName: 'App',

	    getInitialState: function getInitialState() {
	        return { response: this.props };
	    },
	    componentDidMount: function componentDidMount() {
	        ee.on('update', (function (response) {
	            this.setState({ response: response });
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            Layout,
	            { data: this.state.response, session: this.state.response.session },
	            React.createElement(RouteHandler, { data: this.state.response.data, session: this.state.response.session })
	        );
	    }
	});

	module.exports = App;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(8);

	module.exports = new EventEmitter();

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = EventEmitter;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var Navbar = __webpack_require__(10);

	var Layout = React.createClass({
	    displayName: 'Layout',

	    render: function render() {
	        return React.createElement(
	            'html',
	            null,
	            React.createElement(
	                'head',
	                null,
	                React.createElement('meta', { charSet: 'utf-8' }),
	                React.createElement(
	                    'title',
	                    null,
	                    this.props.data.seo.title
	                ),
	                React.createElement('link', { rel: 'stylesheet', href: '/css/font-awesome.min.css' }),
	                React.createElement('link', { rel: 'stylesheet', href: '/css/bootstrap.css' }),
	                React.createElement('link', { rel: 'stylesheet', href: '/css/style.css' })
	            ),
	            React.createElement(
	                'body',
	                null,
	                this.props.data.layout !== 'empty' ? React.createElement(
	                    'div',
	                    null,
	                    React.createElement(Navbar, { channel: this.props.data.channel, session: this.props.session })
	                ) : '',
	                this.props.children,
	                React.createElement('script', { src: '/build/lib/bundle.js' }),
	                React.createElement('script', { src: '/build/bundle.js' })
	            )
	        );
	    }
	});

	module.exports = Layout;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);

	var Link = Router.Link;

	var navJson = __webpack_require__(11);

	var NavItem = React.createClass({
	    displayName: 'NavItem',

	    render: function render() {
	        var channel = this.props.channel;
	        var nav = this.props.nav;

	        var active = channel === nav.channel ? 'active' : '';

	        return React.createElement(
	            'li',
	            { className: active },
	            React.createElement(
	                Link,
	                { to: nav.to },
	                nav.text
	            )
	        );
	    }
	});

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        var session = this.props.session;
	        return React.createElement(
	            'nav',
	            { className: 'navbar navbar-default navbar-fixed-top' },
	            React.createElement(
	                'div',
	                { className: 'container-fluid' },
	                React.createElement(
	                    'div',
	                    { className: 'navbar-header' },
	                    React.createElement(
	                        Link,
	                        { className: 'navbar-brand', to: 'index' },
	                        'CSFZ-FOOD'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'collapse navbar-collapse', id: 'bs-example-navbar-collapse-1' },
	                    React.createElement(
	                        'ul',
	                        { className: 'nav navbar-nav' },
	                        navJson.map((function (nav, index) {
	                            return React.createElement(NavItem, { nav: nav, key: index, channel: this.props.channel });
	                        }).bind(this))
	                    ),
	                    session.user ? React.createElement(
	                        'ul',
	                        { className: 'nav navbar-nav navbar-right' },
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                'a',
	                                { href: '' },
	                                'welcome' + session.user.realName
	                            )
	                        )
	                    ) : React.createElement(
	                        'ul',
	                        { className: 'nav navbar-nav navbar-right' },
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                Link,
	                                { to: 'signin' },
	                                '登录'
	                            )
	                        ),
	                        React.createElement(
	                            'li',
	                            null,
	                            React.createElement(
	                                Link,
	                                { to: 'signup' },
	                                '注册'
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = [
		{
			"channel": "index",
			"text": "首页",
			"to": "index"
		},
		{
			"channel": "vo",
			"text": "我的",
			"to": "vo-message"
		},
		{
			"channel": "manage",
			"text": "管理",
			"to": "manage-store"
		}
	]

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var backend = __webpack_require__(13);
	var ee = __webpack_require__(7);

	module.exports = React.createClass({
	    displayName: 'exports',

	    componentDidMount: function componentDidMount() {
	        backend.get.home().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'main-content' },
	            React.createElement(
	                'div',
	                null,
	                'd'
	            )
	        );
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);

	module.exports = {
	    get: {
	        signup: function () {
	            return $.get('/signup');
	        },
	        signin: function () {
	            return $.get('/signin');
	        },
	        voMessage: function () {
	            return $.get('/vo/message');
	        },
	        voPassword: function () {
	            return $.get('/vo/password');
	        },
	        storeList: function () {
	            return $.get('/store');
	        },
	        home: function () {
	            return $.get('/');
	        },
	        manageStore: function () {
	            return $.get('/manage/store');
	        },
	        manageStoreNew: function () {
	            return $.get('/manage/store/new');
	        }
	    },
	    post: {
	        signup: function (data) {
	            return $.post('/signup', data);
	        },
	        signin: function (data) {
	            return $.post('/signin', data);
	        },
	        voMessage: function (data) {
	            return $.post('/vo/message', data);
	        },
	        manageStoreNew: function (data) {
	            return $.post('/manage/store/new', data);
	        },
	        imageUpload: function (data) {

	        }
	    }
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var _ = __webpack_require__(16);
	var Validator = __webpack_require__(15);
	var constants = __webpack_require__(17);
	var backend = __webpack_require__(13);
	var ee = __webpack_require__(7);

	var Link = Router.Link;

	var Signin = React.createClass({
	    displayName: 'Signin',

	    mixins: [Router.Navigation],
	    getInitialState: function getInitialState() {
	        return {
	            isSubmitting: false,
	            errors: {}
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        backend.get.signin().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        backend.post.signin(model).then((function (response) {
	            if (response.code === constants.resCode.COMMON) {
	                this.transitionTo('index');
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '登录中...' : '登录';
	        return React.createElement(
	            Validator.Form,
	            { className: 'form-container form-horizontal', submit: this.handleSubmit,
	                type: 'blur' },
	            React.createElement(
	                'div',
	                { className: 'page-header' },
	                React.createElement(
	                    'h3',
	                    null,
	                    '用户登录'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'alert alert-danger', style: { display: _.isEmpty(this.state.errors) ? 'none' : 'block' } },
	                _.values(this.state.errors).map(function (error, index) {
	                    return React.createElement(
	                        'p',
	                        { key: index },
	                        error
	                    );
	                })
	            ),
	            React.createElement(SigninInput, { name: 'email',
	                placeholder: 'Email',
	                type: 'text',
	                key: 'email',
	                required: 'true',
	                requiredError: '请输入邮箱'
	            }),
	            React.createElement(SigninInput, { name: 'password',
	                placeholder: 'Password',
	                type: 'password',
	                key: 'password',
	                required: 'true',
	                requiredError: '请输入密码'
	            }),
	            React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                    'div',
	                    { className: 'col-sm-12' },
	                    React.createElement(
	                        'button',
	                        { type: 'submit', className: 'btn btn-primary btn-block',
	                            disabled: this.state.isSubmitting },
	                        btnText
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                    'p',
	                    { className: 'col-sm-12 text-muted' },
	                    '还没有账号，马上',
	                    React.createElement(
	                        Link,
	                        { to: 'signup' },
	                        '注册'
	                    )
	                )
	            )
	        );
	    }
	});

	var SigninInput = React.createClass({
	    displayName: 'SigninInput',

	    mixins: [Validator.Mixin],
	    handleChange: function handleChange(e) {
	        this.setValue(e.currentTarget.value);
	    },
	    handleBlur: function handleBlur() {
	        this.valid();
	    },
	    handleFocus: function handleFocus() {
	        this.setValid();
	    },
	    render: function render() {
	        var errorMsg = this.isValid() ? '' : this.getErrorMsg();

	        var classes = 'form-group' + (this.isInvalid() ? ' has-error' : '');
	        return React.createElement(
	            'div',
	            { className: classes },
	            React.createElement(
	                'div',
	                { className: 'col-sm-12' },
	                React.createElement('input', { name: this.props.name,
	                    className: 'form-control',
	                    type: this.props.type,
	                    placeholder: this.props.placeholder,
	                    onChange: this.handleChange,
	                    onBlur: this.handleBlur,
	                    onFocus: this.handleFocus
	                }),
	                React.createElement(
	                    'p',
	                    { className: 'form-error', style: { display: this.isValid() ? 'none' : 'block' } },
	                    React.createElement('i', { className: 'fa fa-warning' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        ' ',
	                        errorMsg
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Signin;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);

	var Validator = {};

	Validator.methods = {
	    required: function (value, ruleValue) {
	        var isValid = value.length > 0;
	        return isValid;
	    },
	    maxlen: function (value, ruleValue) {
	        return value && value.length && value.length <= ruleValue;
	    },
	    minlen: function (value, ruleValue) {
	        return value && value.length && value.length >= ruleValue;
	    },
	    email: function (value, ruleValue) {
	        return !value || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
	    },
	    url: function (value, ruleValue) {
	        return !value || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
	    },
	    date: function (value, ruleValue) {
	        return !value || !/Invalid|NaN/.test(new Date(value).toString());
	    },
	    number: function (value, ruleValue) {
	        return !value || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
	    },
	    pattern: function (value, rulevalue) {
	        if (!value) {
	            return true;
	        }
	        return rulevalue.test(value);
	    },
	    equalTo: function (value, rulevalue, component) {
	        return value === component.state._value;
	    }
	};


	Validator.Mixin = {
	    getInitialState: function () {
	        return {
	            _value: this.props.defaultValue || '',
	            _validType: '',
	            _isValid: true
	        };
	    },
	    componentWillMount: function () {
	        this.props.attachToForm(this);
	    },
	    setValue: function (value) {
	        this.setState({_value: value}, function () {
	            if (this.props.isTypeKeyup()) {
	                this.valid();
	            }
	        });
	    },
	    setValid: function () {
	        this.setState({_isValid: true});
	    },
	    componentWillUnmount: function () {
	        this.props.detachFromForm(this);
	    },
	    getErrorMsg: function () {
	        return this.props.getErrorMsg(this);
	    },
	    isValid: function () {
	        return this.state._isValid;
	    },
	    isInvalid: function () {
	        return !this.isValid();
	    },
	    valid: function () {
	        this.props.valid(this);
	    }
	};

	Validator.Form = React.createClass({
	    isTypeKeyup: function () {
	        return this.props.type === 'keyup';
	    },
	    getErrorMsg: function (component) {
	        var validType = component.state._validType;
	        return component.props[validType + 'Error'];
	    },
	    validForm: function () {
	        var inputKeys = Object.keys(this.inputs);

	        var isValidArray = [];

	        inputKeys.forEach(function (key) {
	            isValidArray.push(this.valid(this.inputs[key]));
	        }.bind(this));

	        return isValidArray.every(function (isValid) {
	            return isValid;
	        });
	    },
	    valid: function (component) {
	        var value = component.state._value;
	        var props = component.props;

	        var isValid;
	        for (var rule in props) {
	            var validMethod = Validator.methods[rule];
	            if (validMethod) {
	                var ruleValue = props[rule];

	                isValid = validMethod(value, ruleValue, this.inputs[ruleValue]);

	                if (!isValid) {
	                    component.setState({_isValid: false, _validType: rule});
	                    return false;
	                }
	            }

	        }
	        component.setState({_isValid: true});
	        return true;
	    },
	    componentWillMount: function () {
	        this.model = {};
	        this.inputs = {};
	        this.errors = {};
	    },
	    handleSubmit: function (e) {
	        if (this.validForm()) {
	            this.updateModel();

	            if (this.props.submit) {
	                this.props.submit(e, this.model);
	            }
	        } else {
	            e.preventDefault();
	        }


	    },
	    attachToForm: function (component) {
	        this.inputs[component.props.name] = component;
	        this.model[component.props.name] = component.state._value;
	    },
	    detachFromForm: function (component) {
	        delete this.inputs[component.props.name];
	        delete this.model[component.props.name];
	    },
	    updateModel: function () {
	        Object.keys(this.inputs).forEach(function (name) {
	            var component = this.inputs[name];
	            this.model[name] = component.state._value;
	        }.bind(this));
	    },
	    registerInputs: function (children) {
	        if ('object' != typeof children || null === children) {
	            return children;
	        }

	        return React.Children.map(children, function (child) {

	            if ('object' != typeof child || null === child) {
	                return child;
	            }

	            if (child.props && child.props.name) {

	                return React.cloneElement(child, {
	                    attachToForm: this.attachToForm,
	                    getErrorMsg: this.getErrorMsg,
	                    detachFromForm: this.detachFromForm,
	                    valid: this.valid,
	                    isTypeKeyup: this.isTypeKeyup
	                }, this.registerInputs(child.props.children));

	            } else {
	                return React.cloneElement(child, {}, this.registerInputs(child.props.children));
	            }

	        }.bind(this));
	    },
	    render: function () {
	        var method = this.props.method || 'POST';
	        var action = this.props.action;
	        var className = this.props.className;
	        return React.DOM.form({
	            noValidate: true,
	            method: method,
	            action: action,
	            className: className,
	            onSubmit: this.handleSubmit
	        }, this.registerInputs(this.props.children));
	    }
	});


	//Validator.Utils = {
	//    contains: function (array, item) {
	//        return _.map(array)
	//    }
	//};
	module.exports = Validator;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * Created by yuyangyang on 2015/4/29.
	 */
	module.exports = {
	    resCode: {
	        COMMON: 0,
	        NOT_FOUND: 10000,
	        EXCEPTION: 10001,
	        VALIDATOR_ERROR: 10002
	    },
	    regexp: {
	        USERNAME: /^[0-9a-zA-Z]{6,15}$/,
	        PASSWORD: /^[0-9a-zA-Z_]{6,15}$/,
	        REALNAME: /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/,
	        TELEPHONE: /^[0-9-]{1,20}$/,
	        MOBILE: /^[0-9]{11}$/,
	        EMAIL: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	        PRICE: /^[0-9]*\.?[0-9]+$/
	    },
	    defaultPassword: '123456a'
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var _ = __webpack_require__(16);
	var Input = __webpack_require__(19);
	var Validator = __webpack_require__(15);
	var Constants = __webpack_require__(17);
	var backend = __webpack_require__(13);
	var ee = __webpack_require__(7);

	var Link = Router.Link;

	var Signup = React.createClass({
	    displayName: 'Signup',

	    mixins: [Router.Navigation],
	    getInitialState: function getInitialState() {
	        return {
	            isSubmitting: false,
	            errors: {}
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        backend.get.signup().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        backend.post.signup(model).then((function (response) {
	            if (response.code === Constants.resCode.COMMON) {
	                this.transitionTo('index');
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '注册中...' : '注册';
	        return React.createElement(
	            Validator.Form,
	            { className: 'form-container form-horizontal', submit: this.handleSubmit,
	                type: 'blur' },
	            React.createElement(
	                'div',
	                { className: 'page-header' },
	                React.createElement(
	                    'h3',
	                    null,
	                    '用户注册'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'alert alert-danger', style: { display: _.isEmpty(this.state.errors) ? 'none' : 'block' } },
	                _.values(this.state.errors).map(function (error, index) {
	                    return React.createElement(
	                        'p',
	                        { key: index },
	                        error
	                    );
	                })
	            ),
	            React.createElement(Input, { name: 'email',
	                placeholder: 'Email',
	                type: 'text',
	                key: 'email',
	                maxLength: '50',
	                required: 'true',
	                requiredError: '请输入邮箱',
	                email: 'true',
	                emailError: '邮箱格式错误'
	            }),
	            React.createElement(Input, { name: 'password',
	                placeholder: 'Password',
	                type: 'password',
	                maxLength: '15',
	                key: 'password',
	                required: 'true',
	                requiredError: '请输入密码',
	                pattern: Constants.regexp.PASSWORD,
	                patternError: '密码格式错误'
	            }),
	            React.createElement(Input, { name: 'confirmPassword',
	                placeholder: 'Confirm Password',
	                type: 'password',
	                key: 'confirmPassword',
	                maxLength: '15',
	                equalTo: 'password',
	                equalToError: '两次密码输入不一致'
	            }),
	            React.createElement(Input, { name: 'realName',
	                placeholder: 'Chinese Name',
	                type: 'text',
	                key: 'realName',
	                maxLength: '10',
	                required: 'true',
	                requiredError: '请输入中文姓名',
	                pattern: Constants.regexp.REALNAME,
	                patternError: '中文姓名格式错误',
	                maxlen: '10',
	                maxlenError: '10个字符以内'
	            }),
	            React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                    'div',
	                    { className: 'col-sm-12' },
	                    React.createElement(
	                        'button',
	                        { type: 'submit', className: 'btn btn-primary btn-block',
	                            disabled: this.state.isSubmitting },
	                        btnText
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'form-group' },
	                React.createElement(
	                    'p',
	                    { className: 'col-sm-12 text-muted' },
	                    '已有账号，马上',
	                    React.createElement(
	                        Link,
	                        { to: 'signin' },
	                        '登录'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Signup;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var Validator = __webpack_require__(15);

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [Validator.Mixin],
	    handleChange: function handleChange(e) {
	        this.setValue(e.currentTarget.value);
	    },
	    handleBlur: function handleBlur() {
	        this.valid();
	    },
	    handleFocus: function handleFocus() {
	        this.setValid();
	    },
	    render: function render() {
	        var errorMsg = this.isValid() ? '' : this.getErrorMsg();

	        var classes = 'form-group' + (this.isInvalid() ? ' has-error' : '');
	        return React.createElement(
	            'div',
	            { className: classes },
	            React.createElement(
	                'div',
	                { className: 'col-sm-12' },
	                React.createElement('input', _extends({}, this.props, {
	                    className: 'form-control',
	                    onChange: this.handleChange,
	                    onBlur: this.handleBlur,
	                    onFocus: this.handleFocus
	                })),
	                React.createElement(
	                    'p',
	                    { className: 'form-error', style: { display: this.isValid() ? 'none' : 'block' } },
	                    React.createElement('i', { className: 'fa fa-warning' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        ' ',
	                        errorMsg
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var backend = __webpack_require__(13);
	var moment = __webpack_require__(21);
	var ee = __webpack_require__(7);

	var Sidebar = __webpack_require__(22);

	var Store = React.createClass({
	    displayName: 'Store',

	    componentDidMount: function componentDidMount() {
	        backend.get.manageStore().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Sidebar, { channel: 'manage-store' }),
	            React.createElement(List, { data: this.props.data })
	        );
	    }
	});

	var List = React.createClass({
	    displayName: 'List',

	    getInitialState: function getInitialState() {
	        return { list: this.props.data || [] };
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'manage-content' },
	            React.createElement(
	                'table',
	                { className: 'table table-striped table-hover ' },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'th',
	                            null,
	                            '#'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '店铺名称'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '主营产品'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '联系方式'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '店铺地址'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '创建人'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '创建时间'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '更新人'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '更新时间'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '操作'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    this.state.list.map(function (item, index) {
	                        return React.createElement(Item, { data: item, index: index, key: index });
	                    })
	                )
	            )
	        );
	    }
	});

	var Item = React.createClass({
	    displayName: 'Item',

	    render: function render() {
	        var index = this.props.index;
	        var store = this.props.data;
	        return React.createElement(
	            'tr',
	            null,
	            React.createElement(
	                'td',
	                null,
	                index
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.name
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.mainProduct
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.telephone
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.address
	            ),
	            React.createElement(
	                'td',
	                null,
	                moment(store.addTime).format('YYYY-MM-DD')
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.creater ? store.creater.realname : ''
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.updater ? store.updater.realname : ''
	            ),
	            React.createElement(
	                'td',
	                null,
	                moment(store.updateTime).format('YYYY-MM-DD')
	            ),
	            React.createElement(
	                'td',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'btn-group btn-group-xs' },
	                    React.createElement(
	                        'button',
	                        { type: 'button', className: 'btn btn-primary' },
	                        '修改'
	                    ),
	                    React.createElement(
	                        'button',
	                        { type: 'button', className: 'btn btn-danger' },
	                        '删除'
	                    ),
	                    React.createElement(
	                        'button',
	                        { type: 'button', className: 'btn btn-success' },
	                        '管理套餐'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Store;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);

	var Link = Router.Link;

	var json = [{
	    channel: 'manage-store',
	    text: '店铺管理',
	    iconClass: 'fa-building',
	    to: 'manage-store'
	}];

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        var channel = this.props.channel;
	        return React.createElement(
	            'div',
	            { className: 'manage-sidebar' },
	            React.createElement(
	                'div',
	                { className: 'header' },
	                '管理导航'
	            ),
	            React.createElement(
	                'ul',
	                { className: 'nav nav-pills nav-stacked' },
	                json.map(function (nav, index) {
	                    return React.createElement(
	                        'li',
	                        { className: nav.channel === channel ? 'active' : '', key: index },
	                        React.createElement(
	                            Link,
	                            { to: nav.to },
	                            React.createElement('i', { className: 'fa ' + nav.iconClass }),
	                            nav.text
	                        )
	                    );
	                })
	            )
	        );
	    }
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var backend = __webpack_require__(13);
	var constants = __webpack_require__(17);
	var Validator = __webpack_require__(15);
	var Dropzone = __webpack_require__(24);

	var Sidebar = __webpack_require__(22);

	var StoreNew = React.createClass({
	    displayName: 'StoreNew',

	    componentDidMount: function componentDidMount() {
	        backend.get.manageStoreNew().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Sidebar, { channel: 'manage-store' }),
	            React.createElement(Form, null)
	        );
	    }
	});

	var Form = React.createClass({
	    displayName: 'Form',

	    mixins: [Router.Navigation],
	    getInitialState: function getInitialState() {
	        return {
	            isSubmitting: false,
	            errors: []
	        };
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        backend.post.manageStoreNew(model).then((function (response) {
	            if (response.code === constants.resCode.COMMON) {
	                this.transitionTo('manage-store');
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    handleUpload: function handleUpload() {},
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '新增中...' : '新增';

	        return React.createElement(
	            'div',
	            { className: 'manage-content' },
	            React.createElement(
	                Validator.Form,
	                { className: 'form-horizontal store-form', submit: this.handleSubmit,
	                    type: 'blur' },
	                React.createElement(
	                    'div',
	                    { className: 'page-header' },
	                    React.createElement(
	                        'h3',
	                        null,
	                        '新增店铺'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'alert alert-danger', style: { display: this.state.errors.length > 0 ? 'block' : 'none' } },
	                    this.state.errors.map(function (error, index) {
	                        return React.createElement(
	                            'p',
	                            { key: index },
	                            error
	                        );
	                    })
	                ),
	                React.createElement(Upload, { upload: this.props.handleUpload }),
	                React.createElement(Input, { name: 'name',
	                    type: 'text',
	                    key: 'name',
	                    label: '店铺名称',
	                    maxLength: '50',
	                    required: 'true',
	                    requiredError: '请输入店铺名称'
	                }),
	                React.createElement(Input, { name: 'mainProduct',
	                    type: 'text',
	                    label: '主营产品',
	                    key: 'mainProduct',
	                    maxLength: '50',
	                    required: 'true',
	                    requiredError: '请输入主营产品'
	                }),
	                React.createElement(Input, { name: 'telephone',
	                    type: 'text',
	                    label: '联系方式',
	                    key: 'telephone',
	                    maxLength: '20',
	                    required: 'true',
	                    requiredError: '请输入联系方式',
	                    pattern: constants.regexp.TELEPHONE,
	                    patternError: '联系方式格式错误'
	                }),
	                React.createElement(Input, { name: 'address',
	                    type: 'text',
	                    label: '店铺地址',
	                    key: 'address',
	                    maxLength: '50',
	                    required: 'true',
	                    requiredError: '请输入店铺地址'
	                }),
	                React.createElement(Input, { name: 'description',
	                    type: 'text',
	                    label: '店铺描述',
	                    cate: 'textarea',
	                    key: 'description',
	                    maxLength: '200'
	                }),
	                React.createElement(
	                    'div',
	                    { className: 'form-group' },
	                    React.createElement(
	                        'div',
	                        { className: 'col-lg-offset-2 col-lg-4' },
	                        React.createElement(
	                            'button',
	                            { type: 'submit', className: 'btn btn-primary btn-block',
	                                disabled: this.state.isSubmitting },
	                            btnText
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	var Input = React.createClass({
	    displayName: 'Input',

	    mixins: [Validator.Mixin],
	    handleChange: function handleChange(e) {
	        this.setValue(e.currentTarget.value);
	    },
	    handleBlur: function handleBlur() {
	        this.valid();
	    },
	    handleFocus: function handleFocus() {
	        this.setValid();
	    },
	    render: function render() {
	        var errorMsg = this.isValid() ? '' : this.getErrorMsg();

	        var classes = 'form-group' + (this.isInvalid() ? ' has-error' : '');
	        return React.createElement(
	            'div',
	            { className: classes },
	            React.createElement(
	                'label',
	                { className: 'col-lg-2 control-label' },
	                this.props.label
	            ),
	            React.createElement(
	                'div',
	                { className: 'col-lg-10' },
	                this.props.cate === 'textarea' ? React.createElement('textarea', { name: this.props.name,
	                    className: 'form-control',
	                    type: this.props.type,
	                    placeholder: this.props.placeholder,
	                    onChange: this.handleChange,
	                    onBlur: this.handleBlur,
	                    onFocus: this.handleFocus,
	                    maxLength: this.props.maxLength,
	                    rows: '4'
	                }) : React.createElement('input', { name: this.props.name,
	                    className: 'form-control',
	                    type: this.props.type,
	                    placeholder: this.props.placeholder,
	                    onChange: this.handleChange,
	                    onBlur: this.handleBlur,
	                    onFocus: this.handleFocus
	                }),
	                React.createElement(
	                    'p',
	                    { className: 'form-error', style: { display: this.isValid() ? 'none' : 'block' } },
	                    React.createElement('i', { className: 'fa fa-warning' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        ' ',
	                        errorMsg
	                    )
	                )
	            )
	        );
	    }
	});

	var Upload = React.createClass({
	    displayName: 'Upload',

	    onDrop: function onDrop(files) {
	        console.log('Received files: ', files);
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'form-group' },
	            React.createElement(
	                'label',
	                { className: 'col-lg-2 control-label' },
	                '店铺图片'
	            ),
	            React.createElement(
	                'div',
	                { className: 'col-lg-10' },
	                React.createElement(
	                    Dropzone,
	                    { onDrop: this.onDrop, multiple: false,
	                        style: { width: 152, height: 152, border: '1px solid #cccccc' } },
	                    React.createElement('img', { src: '/image/noimg.jpg', width: '150' })
	                )
	            )
	        );
	    }
	});

	module.exports = StoreNew;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(3);

	var Dropzone = React.createClass({
	    getDefaultProps: function() {
	        return {
	            supportClick: true,
	            multiple: true
	        };
	    },

	    getInitialState: function() {
	        return {
	            isDragActive: false
	        };
	    },

	    propTypes: {
	        onDrop: React.PropTypes.func.isRequired,
	        size: React.PropTypes.number,
	        style: React.PropTypes.object,
	        supportClick: React.PropTypes.bool,
	        accept: React.PropTypes.string,
	        multiple: React.PropTypes.bool
	    },

	    onDragLeave: function(e) {
	        this.setState({
	            isDragActive: false
	        });
	    },

	    onDragOver: function(e) {
	        e.preventDefault();
	        e.dataTransfer.dropEffect = 'copy';

	        this.setState({
	            isDragActive: true
	        });
	    },

	    onDrop: function(e) {
	        e.preventDefault();

	        this.setState({
	            isDragActive: false
	        });

	        var files;
	        if (e.dataTransfer) {
	            files = e.dataTransfer.files;
	        } else if (e.target) {
	            files = e.target.files;
	        }

	        var maxFiles = (this.props.multiple) ? files.length : 1;
	        for (var i = 0; i < maxFiles; i++) {
	            files[i].preview = URL.createObjectURL(files[i]);
	        }

	        if (this.props.onDrop) {
	            files = Array.prototype.slice.call(files, 0, maxFiles);
	            this.props.onDrop(files, e);
	        }
	    },

	    onClick: function () {
	        if (this.props.supportClick === true) {
	            this.open();
	        }
	    },

	    open: function() {
	        var fileInput = React.findDOMNode(this.refs.fileInput);
	        fileInput.value = null;
	        fileInput.click();
	    },

	    render: function() {

	        var className = this.props.className || 'dropzone';
	        if (this.state.isDragActive) {
	            className += ' active';
	        }

	        var style = this.props.style || {
	                width: this.props.size || 100,
	                height: this.props.size || 100,
	                borderStyle: this.state.isDragActive ? 'solid' : 'dashed'
	            };


	        return (
	            React.createElement('div', {className: className, style: style, onClick: this.onClick, onDragLeave: this.onDragLeave, onDragOver: this.onDragOver, onDrop: this.onDrop},
	                React.createElement('input', {style: {display: 'none'}, type: 'file', multiple: this.props.multiple, ref: 'fileInput', onChange: this.onDrop, accept: this.props.accept}),
	                this.props.children
	            )
	        );
	    }

	});

	module.exports = Dropzone;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var _ = __webpack_require__(16);
	var backend = __webpack_require__(13);
	var ee = __webpack_require__(7);
	var Validator = __webpack_require__(15);
	var Constants = __webpack_require__(17);

	var LabelInput = __webpack_require__(26);
	var Sidebar = __webpack_require__(27);
	var SidebarJSON = __webpack_require__(28);

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [Router.Navigation],
	    getInitialState: function getInitialState() {
	        return {
	            isSubmitting: false,
	            errors: {}
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        backend.get.voMessage().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        backend.post.voMessage(model).then((function (response) {
	            if (response.code === Constants.resCode.COMMON) {
	                this.transitionTo('index');
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '保存中...' : '保存';
	        var user = this.props.data || {};
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Sidebar, { channel: 'vo-message', channels: SidebarJSON }),
	            React.createElement(
	                'div',
	                { className: 'main-content' },
	                React.createElement(
	                    'div',
	                    { className: 'page-header' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '基本信息'
	                    )
	                ),
	                React.createElement(
	                    Validator.Form,
	                    { className: 'form-horizontal col-lg-4', submit: this.handleSubmit, type: 'blur' },
	                    React.createElement(
	                        'div',
	                        { className: 'alert alert-danger',
	                            style: { display: _.isEmpty(this.state.errors) ? 'none' : 'block' } },
	                        _.values(this.state.errors).map(function (error, index) {
	                            return React.createElement(
	                                'p',
	                                { key: index },
	                                error
	                            );
	                        })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group' },
	                        React.createElement(
	                            'label',
	                            { className: 'col-lg-2 control-label' },
	                            '邮箱'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'col-lg-10' },
	                            React.createElement('input', { type: 'text', className: 'form-control', defaultValue: user.email, disabled: true })
	                        )
	                    ),
	                    React.createElement(LabelInput, { name: 'realName',
	                        type: 'text',
	                        key: 'realName',
	                        maxLength: '10',
	                        label: '姓名',
	                        defaultValue: user.realName,
	                        required: 'true',
	                        requiredError: '请输入中文姓名',
	                        pattern: Constants.regexp.REALNAME,
	                        patternError: '姓名格式错误',
	                        maxlen: '10',
	                        maxlenError: '10个字符以内'
	                    }),
	                    React.createElement(LabelInput, { name: 'telephone',
	                        type: 'text',
	                        key: 'telephone',
	                        maxLength: '20',
	                        label: '电话',
	                        defaultValue: user.telephone,
	                        pattern: Constants.regexp.TELEPHONE,
	                        patternError: '电话格式错误'
	                    }),
	                    React.createElement(LabelInput, { name: 'mobile',
	                        type: 'text',
	                        key: 'mobile',
	                        maxLength: '11',
	                        label: '手机',
	                        defaultValue: user.mobile,
	                        pattern: Constants.regexp.MOBILE,
	                        patternError: '手机格式错误'
	                    }),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group' },
	                        React.createElement(
	                            'div',
	                            { className: 'col-sm-12' },
	                            React.createElement(
	                                'button',
	                                { type: 'submit', className: 'btn btn-primary btn-block',
	                                    disabled: this.state.isSubmitting },
	                                btnText
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);
	var Validator = __webpack_require__(15);

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [Validator.Mixin],
	    handleChange: function handleChange(e) {
	        this.setValue(e.currentTarget.value);
	    },
	    handleBlur: function handleBlur() {
	        this.valid();
	    },
	    handleFocus: function handleFocus() {
	        this.setValid();
	    },
	    render: function render() {
	        var errorMsg = this.isValid() ? '' : this.getErrorMsg();

	        var classes = 'form-group' + (this.isInvalid() ? ' has-error' : '');
	        console.log(this.props);
	        return React.createElement(
	            'div',
	            { className: classes },
	            React.createElement(
	                'label',
	                { className: 'col-lg-2 control-label' },
	                this.props.label
	            ),
	            React.createElement(
	                'div',
	                { className: 'col-lg-10' },
	                React.createElement('input', _extends({}, this.props, {
	                    className: 'form-control',
	                    onChange: this.handleChange,
	                    onBlur: this.handleBlur,
	                    onFocus: this.handleFocus
	                })),
	                React.createElement(
	                    'p',
	                    { className: 'form-error', style: { display: this.isValid() ? 'none' : 'block' } },
	                    React.createElement('i', { className: 'fa fa-warning' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        ' ',
	                        errorMsg
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);

	var Link = Router.Link;

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        var channel = this.props.channel;
	        return React.createElement(
	            'div',
	            { className: 'main-sidebar' },
	            React.createElement(
	                'div',
	                { className: 'header' },
	                '管理导航'
	            ),
	            React.createElement(
	                'ul',
	                { className: 'nav nav-pills nav-stacked' },
	                this.props.channels.map(function (nav, index) {
	                    return React.createElement(
	                        'li',
	                        { className: nav.channel === channel ? 'active' : '', key: index },
	                        React.createElement(
	                            Link,
	                            { to: nav.to },
	                            React.createElement('i', { className: 'fa ' + nav.iconClass }),
	                            nav.text
	                        )
	                    );
	                })
	            )
	        );
	    }
	});

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = [
		{
			"channel": "vo-message",
			"text": "基本信息",
			"iconClass": "fa-building",
			"to": "vo-message"
		},
		{
			"channel": "vo-password",
			"text": "修改密码",
			"iconClass": "fa-building",
			"to": "vo-password"
		}
	]

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var backend = __webpack_require__(13);
	var ee = __webpack_require__(7);

	var Sidebar = __webpack_require__(27);
	var SidebarJSON = __webpack_require__(28);

	module.exports = React.createClass({
	    displayName: 'exports',

	    componentDidMount: function componentDidMount() {
	        backend.get.voPassword().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Sidebar, { channel: 'vo-password', channels: SidebarJSON })
	        );
	    }
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);
	var $ = __webpack_require__(6);
	var backend = __webpack_require__(13);
	var ee = __webpack_require__(7);

	var Link = Router.Link;

	var Store = React.createClass({
	    displayName: 'Store',

	    componentDidMount: function componentDidMount() {
	        backend.get.storeList().then((function (response) {
	            ee.emit('update', response);
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(
	                'div',
	                { className: 'page-header' },
	                React.createElement(
	                    'h3',
	                    null,
	                    React.createElement('i', { className: 'fa fa-coffee' }),
	                    '店铺列表'
	                )
	            ),
	            React.createElement(List, { data: this.props.data })
	        );
	    }
	});

	var List = React.createClass({
	    displayName: 'List',

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'list-group' },
	            this.props.data && this.props.data.map(function (item, index) {
	                return React.createElement(Item, { data: item, key: index });
	            })
	        );
	    }
	});

	var Item = React.createClass({
	    displayName: 'Item',

	    render: function render() {
	        var store = this.props.data;
	        return React.createElement(
	            'a',
	            { className: 'list-group-item store-item', params: { storeId: store._id }, href: '#' },
	            React.createElement(
	                'h3',
	                { className: 'list-group-item-heading' },
	                store.name
	            ),
	            React.createElement(
	                'div',
	                { className: 'list-group-item-text' },
	                React.createElement('i', { className: 'fa fa-shopping-cart' }),
	                React.createElement(
	                    'span',
	                    null,
	                    ' ',
	                    store.mainProduct,
	                    ' '
	                ),
	                React.createElement('i', { className: 'fa fa-mobile-phone' }),
	                React.createElement(
	                    'span',
	                    null,
	                    ' ',
	                    store.telephone,
	                    ' '
	                ),
	                React.createElement('i', { className: 'fa fa-taxi' }),
	                React.createElement(
	                    'span',
	                    null,
	                    ' ',
	                    store.address
	                )
	            )
	        );
	    }
	});

	module.exports = Store;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*-------------------------------------------------------------------------------------------------------------------*\
	|  Copyright (C) 2015 PayPal                                                                                          |
	|                                                                                                                     |
	|  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance     |
	|  with the License.                                                                                                  |
	|                                                                                                                     |
	|  You may obtain a copy of the License at                                                                            |
	|                                                                                                                     |
	|       http://www.apache.org/licenses/LICENSE-2.0                                                                    |
	|                                                                                                                     |
	|  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed   |
	|  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for  |
	|  the specific language governing permissions and limitations under the License.                                     |
	\*-------------------------------------------------------------------------------------------------------------------*/

	'use strict';

	var Config = __webpack_require__(32);
	var React = __webpack_require__(3);
	var Router = __webpack_require__(4);

	// declaring like this helps in unit test
	// dependency injection using `rewire` module
	var _window;
	var _document;
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	  _window = window;
	  _document = document;
	}

	// returns the data/state that was
	// injected by server during rendering
	exports.data = function data() {
	  return _window[Config.client.variableName];
	};

	// the client side boot function
	exports.boot = function boot(options, callback) {

	  var Routes = options.routes;
	  var viewResolver = options.viewResolver;

	  // pick up the state that was injected by server during rendering
	  var props = _window[Config.client.variableName];

	  var useRouter = (props.__meta.view === null);

	  if (useRouter) {
	    // boot the react-router
	    Router.run(Routes, Router.HistoryLocation, function onRouterRun(Component) {

	      // create a component instance
	      var componentInstance = React.createElement(Component, props);

	      // finally, render the component instance into the document
	      React.render(componentInstance, _document);
	    });
	  }
	  else {
	    // get the file from viewResolver supplying it with a view name
	    var view = viewResolver(props.__meta.view);

	    // create a react view factory
	    var viewFactory = React.createFactory(view);

	    // render the factory on the client
	    // doing this, sets up the event
	    // listeners and stuff aka mounting views.
	    React.render(viewFactory(props), _document);
	  }

	  // call the callback with the data that was used for rendering
	  return callback && callback(props);
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = {
		"docType": "<!DOCTYPE html>",
		"client": {
			"markupId": "react-engine-props",
			"variableName": "__REACT_ENGINE__"
		}
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./common/input.jsx": 19,
		"./common/label-input.jsx": 26,
		"./common/sidebar.jsx": 27,
		"./index.jsx": 12,
		"./layouts/default.jsx": 9,
		"./manage/index.jsx": 2,
		"./manage/sidebar.jsx": 22,
		"./manage/store-new.jsx": 23,
		"./manage/store.jsx": 20,
		"./partials/navbar": 11,
		"./partials/navbar.json": 11,
		"./partials/navbar.jsx": 10,
		"./sign/signin.jsx": 14,
		"./sign/signup.jsx": 18,
		"./store/index.jsx": 30,
		"./vo/message.jsx": 25,
		"./vo/password.jsx": 29,
		"./vo/sidebar": 28,
		"./vo/sidebar.json": 28
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 33;


/***/ }
/******/ ]);