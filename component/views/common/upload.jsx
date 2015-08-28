var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function () {
        return {error: ''};
    },
    componentDidMount: function () {
        this.createUpload();
    },
    createUpload: function () {
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
        }, this.props.config))
            .on('error', function (type) {
                switch (type) {
                    case 'Q_TYPE_DENIED':
                        this.setState({error: '文件格式错误'});
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
                {this.state.error ?
                    <div className="form-error"><i className="fa fa-warning"></i><span> {this.state.error}</span>
                    </div> : ''}
            </div>
        )
    }
});