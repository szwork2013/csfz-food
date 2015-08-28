var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var _ = require('underscore');

var backend = require('../../utils/backend');
var Validator = require('../../utils/react-validator');
var Constants = require('../../../lib/utils/constants');


var LabelInput = require('../common/label-input.jsx');
var Sidebar = require('./sidebar.jsx');


var HeadImg = React.createClass({
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

var Upload = React.createClass({
    getInitialState: function () {
        return {error: ''};
    },
    componentDidMount: function () {
        this.createUpload();
    },
    createUpload: function () {
        WebUploader.create({
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
        })
            .on('error', function (type) {
                switch (type) {
                    case 'Q_TYPE_DENIED':
                        this.setState({error: '图片格式错误'});
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':

                        break;
                }
            }.bind(this))
            .on('uploadSuccess', function (file, response) {
                this.props.uploadSuccess(file, response);
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <span id="uploadBtn">上传图片</span>
                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}
            </div>
        )
    }
});

module.exports = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            headImg: this.props.data.headImg || '',
            isSubmitting: false,
            initUpload: false,
            errors: {}
        };
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        backend.post.accountMessage(_.extend(model, {headImg: this.state.headImg})).then(function (response) {
            if (response.code === Constants.resCode.COMMON) {
                this.transitionTo('index');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    handleDeleteImg: function () {
        this.setState({headImg: ''});
    },
    uploadSuccess: function (file, response) {
        this.setState({headImg: response.data.imageId});
    },
    render: function () {
        var btnText = this.state.isSubmitting ? '保存中...' : '保存';
        var user = this.props.data || {};
        return (
            <div>
                <Sidebar channel="account-message"/>

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
                        <div className="form-group">
                            <label className="col-lg-2 control-label">头像</label>

                            <div className="col-lg-10">

                                {this.state.headImg ?
                                    <HeadImg handleDelete={this.handleDeleteImg} src={'/image/'+this.state.headImg}/> :
                                    <Upload uploadSuccess={this.uploadSuccess}/>}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-lg-2 control-label">邮箱</label>

                            <div className="col-lg-10">
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