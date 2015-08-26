var React = require('react');
var Router = require('react-router');
var _ = require('underscore');
var Validator = require('../../utils/react-validator');
var constants = require('../../../lib/utils/constants');
var backend = require('../../utils/backend');
var ee = require('../../utils/eventemitter');

var Link = Router.Link;

var Signin = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            isSubmitting: false,
            errors: {}
        };
    },
    componentDidMount: function () {
        backend.get.signin().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        backend.post.signin(model).then(function (response) {
            if (response.code === constants.resCode.COMMON) {
                this.transitionTo('index');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    render: function () {
        var btnText = this.state.isSubmitting ? '登录中...' : '登录';
        return (
            <Validator.Form className="form-container form-horizontal" submit={this.handleSubmit}
                            type="blur">
                <div className="page-header">
                    <h3>用户登录</h3>
                </div>
                <div className="alert alert-danger" style={{display:_.isEmpty(this.state.errors)?'none':'block'}}>
                    {_.values(this.state.errors).map(function (error, index) {
                        return <p key={index}>{error}</p>
                    })}
                </div>
                <SigninInput name="email"
                             placeholder="Email"
                             type="text"
                             key="email"
                             required="true"
                             requiredError="请输入邮箱"
                    />
                <SigninInput name="password"
                             placeholder="Password"
                             type="password"
                             key="password"
                             required="true"
                             requiredError="请输入密码"
                    />

                <div className="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary btn-block"
                                disabled={this.state.isSubmitting}>{btnText}</button>
                    </div>
                </div>
                <div className="form-group">
                    <p className="col-sm-12 text-muted">还没有账号，马上<Link to="signup">注册</Link></p>
                </div>
            </Validator.Form>
        )
    }
});

var SigninInput = React.createClass({
    mixins: [Validator.Mixin],
    handleChange: function (e) {
        this.setValue(e.currentTarget.value);
    },
    handleBlur: function () {
        this.valid();
    },
    handleFocus: function () {
        this.setValid();
    },
    render: function () {
        var errorMsg = this.isValid() ? '' : this.getErrorMsg();

        var classes = 'form-group' + (this.isInvalid() ? ' has-error' : '');
        return (
            <div className={classes}>
                <div className="col-sm-12">
                    <input name={this.props.name}
                           className="form-control"
                           type={this.props.type}
                           placeholder={this.props.placeholder}
                           onChange={this.handleChange}
                           onBlur={this.handleBlur}
                           onFocus={this.handleFocus}
                        />

                    <p className="form-error" style={{display:this.isValid()?'none':'block'}}>
                        <i className="fa fa-warning"></i><span> {errorMsg}</span>
                    </p>
                </div>
            </div>
        )
    }
});

module.exports = Signin;