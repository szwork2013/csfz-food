var React = require('react');
var Router = require('react-router');
var _ = require('underscore');
var Input = require('../common/input.jsx');
var Validator = require('../../component/react-validator');
var Constants = require('../../../lib/utils/constants');
var backend = require('../../component/backend');

var Link = Router.Link;

var Signup = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            isSubmitting: false,
            errors: {}
        };
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        backend.post.signup(model).then(function (response) {
            if (response.code === Constants.resCode.COMMON) {
                this.transitionTo('index');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    render: function () {
        var btnText = this.state.isSubmitting ? '注册中...' : '注册';
        return (
            <Validator.Form className="form-container form-horizontal" submit={this.handleSubmit}
                            type="blur">
                <div className="page-header">
                    <h3>用户注册</h3>
                </div>
                <div className="alert alert-danger" style={{display:_.isEmpty(this.state.errors)?'none':'block'}}>
                    {_.values(this.state.errors).map(function (error, index) {
                        return <p key={index}>{error}</p>
                    })}
                </div>
                <Input name="email"
                       placeholder="Email"
                       type="text"
                       key="email"
                       maxLength="50"
                       required="true"
                       requiredError="请输入邮箱"
                       email="true"
                       emailError="邮箱格式错误"
                    />
                <Input name="password"
                       placeholder="Password"
                       type="password"
                       maxLength="15"
                       key="password"
                       required="true"
                       requiredError="请输入密码"
                       pattern={Constants.regexp.PASSWORD}
                       patternError="密码格式错误"
                    />
                <Input name="confirmPassword"
                       placeholder="Confirm Password"
                       type="password"
                       key="confirmPassword"
                       maxLength="15"
                       equalTo="password"
                       equalToError="两次密码输入不一致"
                    />
                <Input name="realName"
                       placeholder="Chinese Name"
                       type="text"
                       key="realName"
                       maxLength="10"
                       required="true"
                       requiredError="请输入中文姓名"
                       pattern={Constants.regexp.REALNAME}
                       patternError="中文姓名格式错误"
                       maxlen="10"
                       maxlenError="10个字符以内"
                    />

                <div className="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary btn-block"
                                disabled={this.state.isSubmitting}>{btnText}</button>
                    </div>
                </div>
                <div className="form-group">
                    <p className="col-sm-12 text-muted">已有账号，马上<Link to="signin">登录</Link></p>
                </div>
            </Validator.Form>
        )
    }
});

module.exports = Signup;