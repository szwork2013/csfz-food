var React = require('react');
var Validator = require('../../utils/react-validator');

module.exports = React.createClass({
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
                <label className="col-sm-2 control-label">{this.props.label}</label>

                <div className="col-sm-10">
                    <textarea {...this.props}
                        className="form-control"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        style={{resize:'none'}}
                        />

                    <p className="form-error" style={{display:this.isValid()?'none':'block'}}>
                        <i className="fa fa-warning"></i><span> {errorMsg}</span>
                    </p>
                </div>
            </div>
        )
    }
});
