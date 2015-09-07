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

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var $ = __webpack_require__(3);
	var Routes = __webpack_require__(4);

	var CLIENT_VARIABLENAME = '__REACT_ENGINE__';

	var _window;
	var _document;
	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
	    _window = window;
	    _document = document;
	}


	document.addEventListener('DOMContentLoaded', function onLoad() {
	    Router.run(Routes, Router.HistoryLocation, function onRouterRun(Root, state) {
	        var props = _window[CLIENT_VARIABLENAME];

	        if (props) {
	            var componentInstance = React.createElement(Root, props);
	            React.render(componentInstance, _document);
	            _window[CLIENT_VARIABLENAME] = null;
	        } else {
	            $.get(state.path, state.query).then(function (data) {
	                var componentInstance = React.createElement(Root, data);
	                React.render(componentInstance, _document);
	            });
	        }

	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactRouter;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var Route = Router.Route;
	var DefaultRoute = Router.DefaultRoute;

	var App = __webpack_require__(11);
	var Index = __webpack_require__(16);
	var Signin = __webpack_require__(17);
	var Signup = __webpack_require__(5);

	var AccountMessage = __webpack_require__(18);
	var AccountPassword = __webpack_require__(29);

	var ManageStore = __webpack_require__(30);
	var ManageStoreEdit = __webpack_require__(35);

	var routes = React.createElement(
	    Route,
	    { handler: App, path: '/' },
	    React.createElement(DefaultRoute, { name: 'index', handler: Index }),
	    React.createElement(Route, { name: 'signin', path: 'signin', handler: Signin }),
	    React.createElement(Route, { name: 'signup', path: 'signup', handler: Signup }),
	    React.createElement(Route, { name: 'account-message', path: 'account/message', handler: AccountMessage }),
	    React.createElement(Route, { name: 'account-password', path: 'account/password', handler: AccountPassword }),
	    React.createElement(Route, { name: 'manage-store', path: 'manage/store', handler: ManageStore }),
	    React.createElement(Route, { name: 'manage-store-new', path: 'manage/store/new', handler: ManageStoreEdit }),
	    React.createElement(Route, { name: 'manage-store-edit', path: 'manage/store/edit/:storeId', handler: ManageStoreEdit })
	);

	module.exports = routes;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var _ = __webpack_require__(6);
	var Input = __webpack_require__(7);
	var Validator = __webpack_require__(8);
	var Constants = __webpack_require__(9);
	var backend = __webpack_require__(10);

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
/* 6 */
/***/ function(module, exports) {

	module.exports = _;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var Validator = __webpack_require__(8);

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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);

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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);

	module.exports = {
	    post: {
	        signup: function (data) {
	            return $.post('/signup', data);
	        },
	        signin: function (data) {
	            return $.post('/signin', data);
	        },
	        accountMessage: function (data) {
	            return $.post('/account/message', data);
	        },
	        accountPassword: function (data) {
	            return $.post('/account/password', data);
	        },
	        manageStoreNew: function (data) {
	            return $.post('/manage/store/new', data);
	        },
	        manageStoreUpdate: function (data) {
	            return $.post('/manage/store/update', data);
	        },
	        manageStoreDelete: function (data) {
	            return $.post('/manage/store/delete', data);
	        }
	    }
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var $ = __webpack_require__(3);
	var bootstrap = __webpack_require__(12);

	var Layout = __webpack_require__(13);

	var RouteHandler = Router.RouteHandler;

	module.exports = React.createClass({
	    displayName: 'exports',

	    componentDidMount: function componentDidMount() {
	        bootstrap();
	    },
	    render: function render() {
	        var data = this.props.data;
	        var layout = this.props.layout;
	        var session = this.props.session;
	        var channel = this.props.channel;
	        var seo = this.props.seo;
	        return React.createElement(
	            Layout,
	            { layout: layout, session: session, channel: channel, seo: seo },
	            React.createElement(RouteHandler, { data: data, session: session })
	        );
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);


	module.exports = function () {
	    $('.dropdown-toggle').dropdown();
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);

	var Navbar = __webpack_require__(14);

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        var layout = this.props.layout;
	        var seo = this.props.seo;
	        var channel = this.props.channel;
	        var session = this.props.session;

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
	                    seo.title
	                ),
	                React.createElement('link', { rel: 'stylesheet', href: '/css/font-awesome.min.css' }),
	                React.createElement('link', { rel: 'stylesheet', href: '/css/bootstrap.css' }),
	                React.createElement('link', { rel: 'stylesheet', href: '/css/style.css' })
	            ),
	            React.createElement(
	                'body',
	                null,
	                layout !== 'empty' ? React.createElement(
	                    'div',
	                    null,
	                    React.createElement(Navbar, { channel: channel, session: session })
	                ) : '',
	                this.props.children,
	                React.createElement('script', { src: '/build/lib/bundle.js' }),
	                React.createElement('script', { src: '/build/bundle.js' })
	            )
	        );
	    }
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var Link = Router.Link;

	var navJson = __webpack_require__(15);

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
	                { className: 'container' },
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
	                    React.createElement(
	                        'ul',
	                        { className: 'nav navbar-nav navbar-right' },
	                        React.createElement(
	                            'li',
	                            { className: 'dropdown' },
	                            React.createElement(
	                                'a',
	                                { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
	                                session.user.realName,
	                                ' ',
	                                React.createElement('span', { className: 'caret' })
	                            ),
	                            React.createElement(
	                                'ul',
	                                { className: 'dropdown-menu' },
	                                React.createElement(
	                                    'li',
	                                    null,
	                                    React.createElement(
	                                        Link,
	                                        { to: 'account-message' },
	                                        '账号管理'
	                                    )
	                                ),
	                                React.createElement(
	                                    'li',
	                                    null,
	                                    React.createElement(
	                                        'a',
	                                        { href: '/signout' },
	                                        '注销'
	                                    )
	                                )
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = [
		{
			"channel": "index",
			"text": "首页",
			"to": "index"
		},
		{
			"channel": "manage",
			"text": "店铺管理",
			"to": "manage-store"
		}
	]

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var backend = __webpack_require__(10);

	module.exports = React.createClass({
	    displayName: 'exports',

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var _ = __webpack_require__(6);
	var Validator = __webpack_require__(8);
	var constants = __webpack_require__(9);
	var backend = __webpack_require__(10);

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var $ = __webpack_require__(3);
	var _ = __webpack_require__(6);

	var backend = __webpack_require__(10);
	var Validator = __webpack_require__(8);
	var Constants = __webpack_require__(9);
	var Utils = __webpack_require__(19);
	var ui = __webpack_require__(20);

	var LabelInput = __webpack_require__(24);
	var Sidebar = __webpack_require__(25);
	var Upload = __webpack_require__(28);

	var Image = React.createClass({
	    displayName: 'Image',

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'head-img' },
	            React.createElement(
	                'div',
	                { className: 'vam' },
	                React.createElement(
	                    'div',
	                    { className: 'vam-out' },
	                    React.createElement(
	                        'div',
	                        { className: 'vam-in' },
	                        React.createElement('img', { src: '/image/' + this.props.image._id,
	                            style: Utils.calcuImageSize(this.props.image.width, this.props.image.height, 100, 100) })
	                    )
	                )
	            ),
	            React.createElement('i', { className: 'icon icon-close upload-delete', onClick: this.props.handleDeleteImg })
	        );
	    }
	});

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [Router.Navigation],
	    getInitialState: function getInitialState() {
	        return {
	            image: this.props.data.image ? this.props.data.image : null,
	            isSubmitting: false,
	            errors: {}
	        };
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        _.extend(model, { image: this.state.image && this.state.image._id || '' });

	        backend.post.accountMessage(model).then((function (response) {
	            if (response.code === Constants.resCode.COMMON) {
	                this.setState({ errors: {}, isSubmitting: false });
	                ui.tip('保存成功！');
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    handleDeleteImg: function handleDeleteImg() {
	        this.setState({ image: null });
	    },
	    uploadSuccess: function uploadSuccess(file, response) {
	        this.setState({ image: response.data });
	    },
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '保存中...' : '保存';
	        var user = this.props.data || {};
	        return React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(Sidebar, { channel: 'account-message' }),
	            React.createElement(
	                'div',
	                { className: 'col-sm-9 main-content' },
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
	                    { className: 'form-horizontal public-form', submit: this.handleSubmit, type: 'blur' },
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
	                            { className: 'col-sm-2 control-label' },
	                            '头像'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'col-sm-10' },
	                            this.state.image ? React.createElement(Image, { handleDeleteImg: this.handleDeleteImg, image: this.state.image }) : React.createElement(Upload, { uploadSuccess: this.uploadSuccess })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group' },
	                        React.createElement(
	                            'label',
	                            { className: 'col-sm-2 control-label' },
	                            '邮箱'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'col-sm-10' },
	                            React.createElement('input', { type: 'text', className: 'form-control', value: user.email, disabled: true })
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
	                            { className: 'col-sm-offset-2 col-sm-10' },
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
/* 19 */
/***/ function(module, exports) {

	module.exports = {
	    calcuImageSize: function (imgWidth, imageHeight, destWidth, desHeight) {
	        if (!imgWidth || !imageHeight || !destWidth || !desHeight) {
	            return {};
	        }
	        var rate = destWidth / desHeight;

	        if (imgWidth > imageHeight * rate && imgWidth > destWidth) {
	            return {width: destWidth};
	        }

	        if (imgWidth <= imageHeight * rate && imageHeight > desHeight) {
	            return {height: desHeight};
	        }

	        return {};
	    }
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    tip: __webpack_require__(21),
	    alert: __webpack_require__(23)
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);
	var utils = __webpack_require__(22);


	module.exports = function (content, callback) {
	    var $tip = $('<div><div class="tip-alpha"></div><div class="alert alert-success">' + content + '</div></div>').appendTo('body').hide();

	    var $alpha = $tip.find('.tip-alpha');
	    var $content = $tip.find('.alert');

	    $alpha.css({
	        position: 'fixed',
	        top: 0,
	        left: 0,
	        width: '100%',
	        height: '100%',
	        opacity: 0
	    });

	    utils.calcuPosition($content);
	    $tip.show();

	    setTimeout(
	        function () {
	            $tip.remove();
	            if (typeof(callback) === 'function') {
	                callback();
	            }
	        },
	        1000
	    )
	    ;

	    $(window).on('resize scroll', function () {
	        if ($tip.is(':visible')) {
	            utils.calcuPosition($content);
	        }
	    });
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {
	    calcuPosition: function (el) {
	        var winWidth = $(window).width();
	        var winHeight = $(window).height();

	        var elWidth = el.width();
	        var elHeight = el.height();

	        el.css({
	            position: 'fixed',
	            top: (winHeight - elHeight) / 2,
	            left: (winWidth - elWidth) / 2
	        });
	    }
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(3);
	var utils = __webpack_require__(22);

	module.exports = function (options) {

	    var $alert = $('<div class="ui-alert">' +
	    '<div class="alert-alpha"></div>' +
	    '    <div class="modal-content">' +
	    '           <div class="modal-header">           ' +
	    '               <button type="button" class="close" >×</button>' +
	    '               <h4 class="modal-title">' + options.title + '</h4>' +
	    '           </div>' +
	    '           <div class="modal-body">' + options.content + '</div>' +
	    '           <div class="modal-footer">' +
	    '               <button type="button" class="btn btn-default btn-sm">取消</button>' +
	    '               <button type="button" class="btn btn-primary btn-sm">确定</button>' +
	    '           </div>' +
	    '        </div>' +
	    '</div>').appendTo('body').addClass(options.addClass);

	    var $alpha = $alert.find('.alert-alpha');
	    var $content = $alert.find('.modal-content');

	    $content.on('click', '.modal-footer .btn-default', function () {
	        $alert.remove();
	        options && options.onCancel && options.onCancel();
	    });

	    $content.on('click', '.modal-footer .btn-primary', function () {
	        $alert.remove();
	        options && options.onCertain && options.onCertain();
	    });

	    $content.on('click', '.close', function () {
	        $alert.remove();
	    });


	    $alpha.css({
	        position: 'fixed',
	        top: 0,
	        left: 0,
	        width: '100%',
	        height: '100%',
	        opacity: 0.2,
	        backgroundColor: 'black'
	    });

	    utils.calcuPosition($content);


	    $(window).on('resize scroll', function () {
	        if ($alert.is(':visible')) {
	            utils.calcuPosition($content);
	        }
	    });
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var Validator = __webpack_require__(8);

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
	                'label',
	                { className: 'col-sm-2 control-label' },
	                this.props.label
	            ),
	            React.createElement(
	                'div',
	                { className: 'col-sm-10' },
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var Sidebar = __webpack_require__(26);
	var SidebarJSON = __webpack_require__(27);

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        return React.createElement(Sidebar, { channel: this.props.channel, channels: SidebarJSON, header: '账号管理' });
	    }
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var Link = Router.Link;

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        var channel = this.props.channel;
	        return React.createElement(
	            'div',
	            { className: 'col-sm-3 main-sidebar' },
	            React.createElement(
	                'div',
	                { className: 'header' },
	                this.props.header
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
/* 27 */
/***/ function(module, exports) {

	module.exports = [
		{
			"channel": "account-message",
			"text": "基本信息",
			"iconClass": "fa-building",
			"to": "account-message"
		},
		{
			"channel": "account-password",
			"text": "修改密码",
			"iconClass": "fa-book",
			"to": "account-password"
		}
	]

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var _ = __webpack_require__(6);

	module.exports = React.createClass({
	    displayName: 'exports',

	    getInitialState: function getInitialState() {
	        return { error: '' };
	    },
	    componentDidMount: function componentDidMount() {
	        this.createUpload();
	    },
	    createUpload: function createUpload() {
	        WebUploader.create(_.extend({
	            server: '/image/upload',
	            pick: {
	                id: '#uploadBtn',
	                multiple: false
	            },
	            compress: {
	                width: 100,
	                height: 100,
	                quality: 90,
	                allowMagnify: false,
	                crop: false
	            },
	            auto: true,
	            accept: {
	                title: 'Images',
	                extensions: 'gif,jpg,jpeg,bmp,png',
	                mimeTypes: 'image/*'
	            },
	            fileVal: 'file',
	            multiple: false,
	            duplicate: true
	        }, this.props.config)).on('error', (function (type) {
	            switch (type) {
	                case 'Q_TYPE_DENIED':
	                    this.setState({ error: '文件格式错误' });
	                    break;
	                case 'Q_EXCEED_SIZE_LIMIT':

	                    break;
	            }
	        }).bind(this)).on('uploadSuccess', (function (file, response) {
	            this.props.uploadSuccess(file, response);
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'span',
	                { id: 'uploadBtn' },
	                '上传图片'
	            ),
	            this.state.error ? React.createElement(
	                'div',
	                { className: 'form-error' },
	                React.createElement('i', { className: 'fa fa-warning' }),
	                React.createElement(
	                    'span',
	                    null,
	                    ' ',
	                    this.state.error
	                )
	            ) : ''
	        );
	    }
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var $ = __webpack_require__(3);
	var _ = __webpack_require__(6);
	var backend = __webpack_require__(10);
	var Validator = __webpack_require__(8);
	var Constants = __webpack_require__(9);
	var ui = __webpack_require__(20);

	var LabelInput = __webpack_require__(24);
	var Sidebar = __webpack_require__(25);

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [Router.Navigation],
	    getInitialState: function getInitialState() {
	        return {
	            isSubmitting: false,
	            errors: {}
	        };
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        backend.post.accountPassword(model).then((function (response) {
	            if (response.code === Constants.resCode.COMMON) {
	                this.setState({ errors: {}, isSubmitting: false });
	                ui.tip('修改成功！');
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '修改中...' : '修改';
	        return React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(Sidebar, { channel: 'account-password' }),
	            React.createElement(
	                'div',
	                { className: 'col-sm-9 main-content' },
	                React.createElement(
	                    'div',
	                    { className: 'page-header' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '修改密码'
	                    )
	                ),
	                React.createElement(
	                    Validator.Form,
	                    { className: 'form-horizontal public-form', submit: this.handleSubmit, type: 'blur' },
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
	                    React.createElement(LabelInput, { name: 'oldPassword',
	                        type: 'password',
	                        key: 'oldPassword',
	                        maxLength: '15',
	                        label: '原密码',
	                        required: 'true',
	                        requiredError: '请输入原密码',
	                        pattern: Constants.regexp.PASSWORD,
	                        patternError: '原密码格式错误'
	                    }),
	                    React.createElement(LabelInput, { name: 'password',
	                        type: 'password',
	                        key: 'password',
	                        maxLength: '15',
	                        label: '密码',
	                        required: 'true',
	                        requiredError: '请输入密码',
	                        pattern: Constants.regexp.PASSWORD,
	                        patternError: '密码格式错误'
	                    }),
	                    React.createElement(LabelInput, { name: 'confirmPassword',
	                        type: 'password',
	                        key: 'confirmPassword',
	                        label: '确认密码',
	                        maxLength: '15',
	                        equalTo: 'password',
	                        equalToError: '两次密码输入不一致'
	                    }),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group' },
	                        React.createElement(
	                            'div',
	                            { className: 'col-sm-offset-2 col-sm-10' },
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var moment = __webpack_require__(31);
	var _ = __webpack_require__(6);
	var backend = __webpack_require__(10);
	var EventEmitter = __webpack_require__(32);
	var ui = __webpack_require__(20);
	var Constants = __webpack_require__(9);

	var Sidebar = __webpack_require__(33);
	var ee = new EventEmitter();
	var Link = Router.Link;

	module.exports = React.createClass({
	    displayName: 'exports',

	    getInitialState: function getInitialState() {
	        return { data: this.props.data || [] };
	    },
	    componentDidMount: function componentDidMount() {
	        ee.on('delete', (function (index, storeId, callback) {
	            backend.post.manageStoreDelete({ storeId: storeId }).then((function (response) {
	                callback && callback();
	                if (response.code === Constants.resCode.COMMON) {
	                    ui.tip('删除成功！');
	                    this.state.data.splice(index, 1);
	                    this.forceUpdate();
	                } else {
	                    ui.tip('删除失败，请稍后再试！');
	                }
	            }).bind(this));
	        }).bind(this));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(Sidebar, { channel: 'manage-store' }),
	            React.createElement(
	                'div',
	                { className: 'main-content col-sm-9' },
	                React.createElement(
	                    'div',
	                    { className: 'page-header' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        '所有店铺',
	                        React.createElement(
	                            Link,
	                            { to: 'manage-store-new', className: 'btn btn-primary btn-sm pull-right' },
	                            '新增店铺'
	                        )
	                    )
	                ),
	                _.isEmpty(this.state.data) ? React.createElement(
	                    'div',
	                    { className: 'text-center' },
	                    '暂无店铺，马上',
	                    React.createElement(
	                        Link,
	                        { to: 'manage-store-new' },
	                        '添加'
	                    )
	                ) : React.createElement(
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
	                        this.state.data.map((function (item, index) {
	                            return React.createElement(Item, { data: item, index: index, key: index });
	                        }).bind(this))
	                    )
	                )
	            )
	        );
	    }
	});

	var Item = React.createClass({
	    displayName: 'Item',

	    getInitialState: function getInitialState() {
	        return { deleting: false };
	    },
	    handleDelete: function handleDelete(index, storeId) {
	        ui.alert({
	            title: '删除',
	            content: '确认删除该店铺？',
	            onCertain: (function () {
	                this.setState({ deleting: true });
	                ee.emit('delete', index, storeId, (function () {
	                    this.setState({ deleting: false });
	                }).bind(this));
	            }).bind(this)
	        });
	    },
	    render: function render() {
	        var store = this.props.data;
	        var index = this.props.index;

	        var delText = this.state.deleting ? '删除中...' : '删除';

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
	                store.adder && store.adder.realName
	            ),
	            React.createElement(
	                'td',
	                null,
	                moment(store.addTime).format('YYYY-MM-DD')
	            ),
	            React.createElement(
	                'td',
	                null,
	                store.updater && store.updater.realName
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
	                    Link,
	                    { to: 'manage-store-edit', className: 'btn btn-primary btn-xs',
	                        params: { storeId: store._id } },
	                    '修改'
	                ),
	                React.createElement(
	                    'button',
	                    { type: 'button', className: 'btn btn-danger btn-xs',
	                        onClick: this.handleDelete.bind(this, index, store._id) },
	                    delText
	                ),
	                React.createElement(
	                    'button',
	                    { type: 'button', className: 'btn btn-info btn-xs' },
	                    '套餐管理'
	                )
	            )
	        );
	    }
	});

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = moment;

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = EventEmitter;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);

	var Sidebar = __webpack_require__(26);
	var SidebarJSON = __webpack_require__(34);

	module.exports = React.createClass({
	    displayName: 'exports',

	    render: function render() {
	        return React.createElement(Sidebar, { channel: this.props.channel, channels: SidebarJSON, header: '内容管理' });
	    }
	});

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = [
		{
			"channel": "manage-store",
			"text": "店铺管理",
			"iconClass": "fa-building",
			"to": "manage-store"
		}
	]

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(1);
	var Router = __webpack_require__(2);
	var $ = __webpack_require__(3);
	var _ = __webpack_require__(6);

	var backend = __webpack_require__(10);
	var Validator = __webpack_require__(8);
	var Constants = __webpack_require__(9);
	var Utils = __webpack_require__(19);
	var ui = __webpack_require__(20);

	var LabelInput = __webpack_require__(24);
	var LabelTextarea = __webpack_require__(36);
	var Sidebar = __webpack_require__(33);
	var Upload = __webpack_require__(28);

	var Image = React.createClass({
	    displayName: 'Image',

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'head-img' },
	            React.createElement(
	                'div',
	                { className: 'vam' },
	                React.createElement(
	                    'div',
	                    { className: 'vam-out' },
	                    React.createElement(
	                        'div',
	                        { className: 'vam-in' },
	                        React.createElement('img', { src: '/image/' + this.props.image._id,
	                            style: Utils.calcuImageSize(this.props.image.width, this.props.image.height, 100, 100) })
	                    )
	                )
	            ),
	            React.createElement('i', { className: 'icon icon-close upload-delete', onClick: this.props.handleDeleteImg })
	        );
	    }
	});

	module.exports = React.createClass({
	    displayName: 'exports',

	    mixins: [Router.Navigation],
	    getDefaultProps: function getDefaultProps() {
	        return {
	            config: {
	                compress: {
	                    width: 500,
	                    height: 500,
	                    quality: 90,
	                    allowMagnify: false,
	                    crop: false
	                }
	            }

	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            image: this.props.data && this.props.data.image || null,
	            isSubmitting: false,
	            errors: {}
	        };
	    },
	    handleSubmit: function handleSubmit(e, model) {
	        var store = this.props.data;

	        e.preventDefault();
	        this.setState({ isSubmitting: true });

	        if (this.state.image) {
	            _.extend(model, { image: this.state.image._id });
	        }

	        if (store && store._id) {

	            backend.post.manageStoreUpdate(_.extend({ _id: store._id }, model)).then((function (response) {
	                if (response.code === Constants.resCode.COMMON) {
	                    ui.tip('修改成功！', (function () {
	                        this.transitionTo('manage-store');
	                    }).bind(this));
	                } else {
	                    this.setState({ errors: response.errors, isSubmitting: false });
	                }
	            }).bind(this));

	            return;
	        }

	        backend.post.manageStoreNew(model).then((function (response) {
	            if (response.code === Constants.resCode.COMMON) {
	                ui.tip('新增成功！', (function () {
	                    this.transitionTo('manage-store');
	                }).bind(this));
	            } else {
	                this.setState({ errors: response.errors, isSubmitting: false });
	            }
	        }).bind(this));
	    },
	    handleDeleteImg: function handleDeleteImg() {
	        this.setState({ image: null });
	    },
	    uploadSuccess: function uploadSuccess(file, response) {
	        this.setState({ image: response.data });
	    },
	    render: function render() {
	        var btnText = this.state.isSubmitting ? '保存中...' : '保存';
	        var store = this.props.data || {};

	        return React.createElement(
	            'div',
	            { className: 'container' },
	            React.createElement(Sidebar, null),
	            React.createElement(
	                'div',
	                { className: 'col-sm-9 main-content' },
	                React.createElement(
	                    'div',
	                    { className: 'page-header' },
	                    React.createElement(
	                        'h4',
	                        null,
	                        store._id ? '修改店铺' : '新增店铺'
	                    )
	                ),
	                React.createElement(
	                    Validator.Form,
	                    { className: 'form-horizontal public-form', submit: this.handleSubmit, type: 'blur' },
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
	                            { className: 'col-sm-2 control-label' },
	                            '图片'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'col-sm-10' },
	                            this.state.image ? React.createElement(Image, { handleDeleteImg: this.handleDeleteImg, image: this.state.image }) : React.createElement(Upload, { uploadSuccess: this.uploadSuccess, config: this.props.config })
	                        )
	                    ),
	                    React.createElement(LabelInput, { name: 'name',
	                        type: 'text',
	                        key: 'name',
	                        maxLength: '40',
	                        label: '店铺名称',
	                        defaultValue: store.name,
	                        required: 'true',
	                        requiredError: '请输入店铺名称',
	                        maxlen: '40',
	                        maxlenError: '40个字符以内'
	                    }),
	                    React.createElement(LabelTextarea, { name: 'description',
	                        type: 'text',
	                        key: 'description',
	                        rows: '4',
	                        maxLength: '200',
	                        label: '店铺描述',
	                        defaultValue: store.description,
	                        required: 'true',
	                        requiredError: '请输入店铺描述',
	                        maxlen: '200',
	                        maxlenError: '200个字符以内'
	                    }),
	                    React.createElement(LabelInput, { name: 'mainProduct',
	                        type: 'text',
	                        key: 'mainProduct',
	                        maxLength: '20',
	                        label: '主营产品',
	                        defaultValue: store.mainProduct,
	                        required: 'true',
	                        requiredError: '请输入主营产品',
	                        maxlen: '20',
	                        maxlenError: '20个字符以内'
	                    }),
	                    React.createElement(LabelInput, { name: 'telephone',
	                        type: 'text',
	                        key: 'telephone',
	                        maxLength: '20',
	                        label: '联系方式',
	                        defaultValue: store.telephone,
	                        required: 'true',
	                        requiredError: '请输入联系方式',
	                        pattern: Constants.regexp.TELEPHONE,
	                        patternError: '联系方式格式错误'
	                    }),
	                    React.createElement(LabelInput, { name: 'address',
	                        type: 'text',
	                        key: 'address',
	                        maxLength: '40',
	                        label: '店铺地址',
	                        required: 'true',
	                        requiredError: '请输入店铺地址',
	                        defaultValue: store.address,
	                        maxlen: '40',
	                        maxlenError: '40个字符以内'
	                    }),
	                    React.createElement(LabelInput, { name: 'minPrice',
	                        type: 'text',
	                        key: 'minPrice',
	                        maxLength: '10',
	                        label: '起送价',
	                        required: 'true',
	                        requiredError: '请输入起送价',
	                        defaultValue: store.minPrice,
	                        pattern: Constants.regexp.PRICE,
	                        patternError: '起送价格式错误'
	                    }),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group' },
	                        React.createElement(
	                            'div',
	                            { className: 'col-sm-offset-2 col-sm-10' },
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(1);
	var Validator = __webpack_require__(8);

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
	                'label',
	                { className: 'col-sm-2 control-label' },
	                this.props.label
	            ),
	            React.createElement(
	                'div',
	                { className: 'col-sm-10' },
	                React.createElement('textarea', _extends({}, this.props, {
	                    className: 'form-control',
	                    onChange: this.handleChange,
	                    onBlur: this.handleBlur,
	                    onFocus: this.handleFocus,
	                    style: { resize: 'none' }
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

/***/ }
/******/ ]);