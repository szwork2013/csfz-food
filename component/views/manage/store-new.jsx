var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var backend = require('../../utils/backend');
var constants = require('../../../lib/utils/constants');
var Validator = require('../../utils/react-validator');
var Dropzone = require('../../utils/react-dropzone');

var Sidebar = require('./sidebar.jsx');

var StoreNew = React.createClass({
    componentDidMount: function () {
        backend.get.manageStoreNew().then(function (response) {
            ee.emit('update', response);
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Sidebar channel="manage-store"/>
                <Form/>
            </div>
        )
    }
});


var Form = React.createClass({
    mixins: [Router.Navigation],
    getInitialState: function () {
        return {
            isSubmitting: false,
            errors: []
        };
    },
    handleSubmit: function (e, model) {
        e.preventDefault();
        this.setState({isSubmitting: true});

        backend.post.manageStoreNew(model).then(function (response) {
            if (response.code === constants.resCode.COMMON) {
                this.transitionTo('manage-store');
            } else {
                this.setState({errors: response.errors, isSubmitting: false});
            }
        }.bind(this));
    },
    handleUpload: function () {

    },
    render: function () {
        var btnText = this.state.isSubmitting ? '新增中...' : '新增';

        return (
            <div className="manage-content">
                <Validator.Form className="form-horizontal store-form" submit={this.handleSubmit}
                                type="blur">
                    <div className="page-header">
                        <h3>新增店铺</h3>
                    </div>
                    <div className="alert alert-danger" style={{display:this.state.errors.length>0?'block':'none'}}>
                        {this.state.errors.map(function (error, index) {
                            return <p key={index}>{error}</p>
                        })}
                    </div>
                    <Upload upload={this.props.handleUpload}/>
                    <Input name="name"
                           type="text"
                           key="name"
                           label="店铺名称"
                           maxLength="50"
                           required="true"
                           requiredError="请输入店铺名称"
                        />
                    <Input name="mainProduct"
                           type="text"
                           label="主营产品"
                           key="mainProduct"
                           maxLength="50"
                           required="true"
                           requiredError="请输入主营产品"
                        />
                    <Input name="telephone"
                           type="text"
                           label="联系方式"
                           key="telephone"
                           maxLength="20"
                           required="true"
                           requiredError="请输入联系方式"
                           pattern={constants.regexp.TELEPHONE}
                           patternError="联系方式格式错误"
                        />
                    <Input name="address"
                           type="text"
                           label="店铺地址"
                           key="address"
                           maxLength="50"
                           required="true"
                           requiredError="请输入店铺地址"
                        />
                    <Input name="description"
                           type="text"
                           label="店铺描述"
                           cate="textarea"
                           key="description"
                           maxLength="200"
                        />

                    <div className="form-group">
                        <div className="col-lg-offset-2 col-lg-4">
                            <button type="submit" className="btn btn-primary btn-block"
                                    disabled={this.state.isSubmitting}>{btnText}</button>
                        </div>
                    </div>
                </Validator.Form>
            </div>
        )
    }
});

var Input = React.createClass({
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
                <label className="col-lg-2 control-label">{this.props.label}</label>

                <div className="col-lg-10">
                    {this.props.cate === 'textarea' ?
                        <textarea name={this.props.name}
                                  className="form-control"
                                  type={this.props.type}
                                  placeholder={this.props.placeholder}
                                  onChange={this.handleChange}
                                  onBlur={this.handleBlur}
                                  onFocus={this.handleFocus}
                                  maxLength={this.props.maxLength}
                                  rows="4"
                            ></textarea>
                        :
                        <input name={this.props.name}
                               className="form-control"
                               type={this.props.type}
                               placeholder={this.props.placeholder}
                               onChange={this.handleChange}
                               onBlur={this.handleBlur}
                               onFocus={this.handleFocus}
                            />
                    }
                    <p className="form-error" style={{display:this.isValid()?'none':'block'}}>
                        <i className="fa fa-warning"></i><span> {errorMsg}</span>
                    </p>
                </div>
            </div>
        )
    }
});


var Upload = React.createClass({
    onDrop: function (files) {
        console.log('Received files: ', files);
    },
    render: function () {
        return (
            <div className="form-group">
                <label className="col-lg-2 control-label">店铺图片</label>

                <div className="col-lg-10">
                    <Dropzone onDrop={this.onDrop} multiple={false}
                              style={{width:152,height:152,border:'1px solid #cccccc'}}>
                        <img src="/image/noimg.jpg" width="150"/>
                    </Dropzone>
                </div>
            </div>
        )
    }
});

module.exports = StoreNew;