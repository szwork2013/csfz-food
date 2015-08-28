var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var _ = require('underscore');

var backend = require('../../utils/backend');
var Validator = require('../../utils/react-validator');
var Constants = require('../../../lib/utils/constants');


var LabelInput = require('../common/label-input.jsx');
var Sidebar = require('./sidebar.jsx');
var Upload = require('../common/upload.jsx');

var Image = React.createClass({
    render: function () {
        return (
            <div className="head-img">
                <div className="vam">
                    <div className="vam-out">
                        <div className="vam-in">
                            <img src={this.props.src}/>
                        </div>
                    </div>
                </div>
                <i className="icon icon-close upload-delete" onClick={this.props.handleDelete}></i>
            </div>
        )
    }
});


module.exports = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            image: this.props.data.image ? {id: this.props.data.image} : null,
            isSubmitting: false,
            initUpload: false,
            errors: {}
        };
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        _.extend(model, {image: this.state.image && this.state.image.id || ''});

        backend.post.accountMessage(model).then(function (response) {
            if (response.code === Constants.resCode.COMMON) {
                this.transitionTo('index');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    handleDeleteImg: function () {
        this.setState({image: null});
    },
    uploadSuccess: function (file, response) {
        this.setState({image: response.data});
    },
    render: function () {
        var btnText = this.state.isSubmitting ? '保存中...' : '保存';
        var user = this.props.data || {};
        return (
            <div className="container">
                <Sidebar channel="account-message"/>

                <div className="col-sm-9 main-content">
                    <div className="page-header">
                        <h4>基本信息</h4>
                    </div>
                    <Validator.Form className="form-horizontal public-form" submit={this.handleSubmit} type="blur">
                        <div className="alert alert-danger"
                             style={{display:_.isEmpty(this.state.errors)?'none':'block'}}>
                            {_.values(this.state.errors).map(function (error, index) {
                                return <p key={index}>{error}</p>
                            })}
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">头像</label>

                            <div className="col-sm-10">

                                {this.state.image ?
                                    <Image handleDelete={this.handleDeleteImg}
                                           src={'/image/'+this.state.image.id}/> :
                                    <Upload uploadSuccess={this.uploadSuccess}/>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">邮箱</label>

                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={user.email} disabled/>
                            </div>
                        </div>
                        <LabelInput name="realName"
                                    type="text"
                                    key="realName"
                                    maxLength="10"
                                    label="姓名"
                                    defaultValue={user.realName}
                                    required="true"
                                    requiredError="请输入中文姓名"
                                    pattern={Constants.regexp.REALNAME}
                                    patternError="姓名格式错误"
                                    maxlen="10"
                                    maxlenError="10个字符以内"
                            />
                        <LabelInput name="telephone"
                                    type="text"
                                    key="telephone"
                                    maxLength="20"
                                    label="电话"
                                    defaultValue={user.telephone}
                                    pattern={Constants.regexp.TELEPHONE}
                                    patternError="电话格式错误"
                            />
                        <LabelInput name="mobile"
                                    type="text"
                                    key="mobile"
                                    maxLength="11"
                                    label="手机"
                                    defaultValue={user.mobile}
                                    pattern={Constants.regexp.MOBILE}
                                    patternError="手机格式错误"
                            />

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
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