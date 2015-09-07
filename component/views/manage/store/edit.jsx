var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var _ = require('underscore');

var backend = require('../../../component/backend');
var Validator = require('../../../component/react-validator');
var Constants = require('../../../../lib/utils/constants');
var Utils = require('../../../component/utils');
var ui = require('../../../component/ui');


var LabelInput = require('../../common/label-input.jsx');
var LabelTextarea = require('../../common/label-textarea.jsx');
var Sidebar = require('../sidebar.jsx');
var Upload = require('../../common/upload.jsx');


var Image = React.createClass({
    render: function () {
        return (
            <div className="head-img">
                <div className="vam">
                    <div className="vam-out">
                        <div className="vam-in">
                            <img src={'/image/'+this.props.image._id}
                                 style={Utils.calcuImageSize(this.props.image.width,this.props.image.height,100,100)}/>
                        </div>
                    </div>
                </div>
                <i className="icon icon-close upload-delete" onClick={this.props.handleDeleteImg}></i>
            </div>
        )
    }
});


module.exports = React.createClass({
    mixins: [Router.Navigation],
    getDefaultProps: function () {
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

        }
    },
    getInitialState: function () {
        return {
            image: this.props.data && this.props.data.image || null,
            isSubmitting: false,
            errors: {}
        };
    },
    handleSubmit: function (e, model) {
        var store = this.props.data;


        e.preventDefault();
        this.setState({isSubmitting: true});

        if (this.state.image) {
            _.extend(model, {image: this.state.image._id});
        }


        if (store && store._id) {

            backend.post.manageStoreUpdate(_.extend({_id: store._id}, model)).then(function (response) {
                if (response.code === Constants.resCode.COMMON) {
                    ui.tip('修改成功！', function () {
                        this.transitionTo('manage-store');
                    }.bind(this));
                } else {
                    this.setState({errors: response.errors, isSubmitting: false});
                }
            }.bind(this));

            return;
        }


        backend.post.manageStoreNew(model).then(function (response) {
            if (response.code === Constants.resCode.COMMON) {
                ui.tip('新增成功！', function () {
                    this.transitionTo('manage-store');
                }.bind(this));
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
        var store = this.props.data || {};

        return (
            <div className="container">
                <Sidebar/>

                <div className="col-sm-9 main-content">
                    <div className="page-header">
                        <h4>{store._id ? '修改店铺' : '新增店铺'}</h4>
                    </div>
                    <Validator.Form className="form-horizontal public-form" submit={this.handleSubmit} type="blur">
                        <div className="alert alert-danger"
                             style={{display:_.isEmpty(this.state.errors)?'none':'block'}}>
                            {_.values(this.state.errors).map(function (error, index) {
                                return <p key={index}>{error}</p>
                            })}
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">图片</label>

                            <div className="col-sm-10">

                                {this.state.image ?
                                    <Image handleDeleteImg={this.handleDeleteImg} image={this.state.image}/> :
                                    <Upload uploadSuccess={this.uploadSuccess} config={this.props.config}/>}
                            </div>
                        </div>
                        <LabelInput name="name"
                                    type="text"
                                    key="name"
                                    maxLength="40"
                                    label="店铺名称"
                                    defaultValue={store.name}
                                    required="true"
                                    requiredError="请输入店铺名称"
                                    maxlen="40"
                                    maxlenError="40个字符以内"
                            />
                        <LabelTextarea name="description"
                                       type="text"
                                       key="description"
                                       rows="4"
                                       maxLength="200"
                                       label="店铺描述"
                                       defaultValue={store.description}
                                       required="true"
                                       requiredError="请输入店铺描述"
                                       maxlen="200"
                                       maxlenError="200个字符以内"
                            />
                        <LabelInput name="mainProduct"
                                    type="text"
                                    key="mainProduct"
                                    maxLength="20"
                                    label="主营产品"
                                    defaultValue={store.mainProduct}
                                    required="true"
                                    requiredError="请输入主营产品"
                                    maxlen="20"
                                    maxlenError="20个字符以内"
                            />
                        <LabelInput name="telephone"
                                    type="text"
                                    key="telephone"
                                    maxLength="20"
                                    label="联系方式"
                                    defaultValue={store.telephone}
                                    required="true"
                                    requiredError="请输入联系方式"
                                    pattern={Constants.regexp.TELEPHONE}
                                    patternError="联系方式格式错误"
                            />
                        <LabelInput name="address"
                                    type="text"
                                    key="address"
                                    maxLength="40"
                                    label="店铺地址"
                                    required="true"
                                    requiredError="请输入店铺地址"
                                    defaultValue={store.address}
                                    maxlen="40"
                                    maxlenError="40个字符以内"
                            />
                        <LabelInput name="minPrice"
                                    type="text"
                                    key="minPrice"
                                    maxLength="10"
                                    label="起送价"
                                    required="true"
                                    requiredError="请输入起送价"
                                    defaultValue={store.minPrice}
                                    pattern={Constants.regexp.PRICE}
                                    patternError="起送价格式错误"
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