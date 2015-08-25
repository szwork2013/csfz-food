var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var _ = require('underscore');
var backend = require('../../utils/backend');
var ee = require('../../utils/eventemitter');
var Validator = require('../../utils/react-validator');
var Constants = require('../../../lib/utils/constants');


var LabelInput = require('../common/label-input.jsx');
var Sidebar = require('./sidebar.jsx');

module.exports = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            isSubmitting: false,
            errors: {}
        };
    },
    componentDidMount: function () {
        backend.get.accountPassword().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        backend.post.accountPassword(model).then(function (response) {
            if (response.code === Constants.resCode.COMMON) {
                this.transitionTo('index');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    render: function () {
        var btnText = this.state.isSubmitting ? '修改中...' : '修改';
        return (
            <div>
                <Sidebar channel="account-password"/>

                <div className="main-content">
                    <div className="page-header">
                        <h4>修改密码</h4>
                    </div>
                    <Validator.Form className="form-horizontal col-lg-4" submit={this.handleSubmit} type="blur">
                        <div className="alert alert-danger"
                             style={{display:_.isEmpty(this.state.errors)?'none':'block'}}>
                            {_.values(this.state.errors).map(function (error, index) {
                                return <p key={index}>{error}</p>
                            })}
                        </div>
                        <LabelInput name="oldPassword"
                                    type="password"
                                    key="oldPassword"
                                    maxLength="15"
                                    label="原密码"
                                    required="true"
                                    requiredError="请输入原密码"
                                    pattern={Constants.regexp.PASSWORD}
                                    patternError="原密码格式错误"
                            />
                        <LabelInput name="password"
                                    type="password"
                                    key="password"
                                    maxLength="15"
                                    label="密码"
                                    required="true"
                                    requiredError="请输入密码"
                                    pattern={Constants.regexp.PASSWORD}
                                    patternError="密码格式错误"
                            />
                        <LabelInput name="confirmPassword"
                                    type="password"
                                    key="confirmPassword"
                                    label="确认密码"
                                    maxLength="15"
                                    equalTo="password"
                                    equalToError="两次密码输入不一致"
                            />

                        <div className="form-group">
                            <div className="col-lg-offset-2 col-lg-10">
                                <button type="submit" className="btn btn-primary btn-block"
                                        disabled={this.state.isSubmitting}>{btnText}</button>
                            </div>
                        </div>
                    </Validator.Form>
                </div>
            </div>
        )
    }
});