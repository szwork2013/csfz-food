var React = require('react');
var Router = require('react-router');
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
        backend.get.groupMessage().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        var group = this.props.data;
        var groupId = group ? group.groupId : '';

        backend.post.groupMessage(_.extend({groupId: groupId}, model)).then(function (response) {
            if (response.code === Constants.resCode.COMMON) {
                this.transitionTo('index');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    render: function () {
        var btnText = this.state.isSubmitting ? '保存中...' : '保存';
        var group = this.props.data || {};

        return (
            <div>
                <Sidebar channel="group-message"/>

                <div className="main-content">
                    <div className="page-header">
                        <h4>基本信息</h4>
                    </div>
                    <Validator.Form className="form-horizontal col-lg-4" submit={this.handleSubmit} type="blur">
                        <div className="alert alert-danger"
                             style={{display:_.isEmpty(this.state.errors)?'none':'block'}}>
                            {_.values(this.state.errors).map(function (error, index) {
                                return <p key={index}>{error}</p>
                            })}
                        </div>
                        <LabelInput name="groupName"
                                    type="text"
                                    key="groupName"
                                    maxLength="20"
                                    label="餐组名称"
                                    defaultValue={group.groupName}
                                    required="true"
                                    requiredError="请输入餐组名称"
                                    maxlen="20"
                                    maxlenError="20个字符以内"
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