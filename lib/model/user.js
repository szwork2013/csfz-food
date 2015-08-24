var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: String,       //邮箱
    password: String,    //密码
    realName: String,    //真实姓名
    dept: String,        //部门
    duty: String,        //职位
    telephone: String,   //电话
    mobile: String,      //手机
    adder: {             //添加人
        type: String,
        ref: 'UserModel'
    },
    addTime: {           //添加时间
        type: Date,
        default: Date.now
    },
    updater: {
        type: String,    //更新人
        ref: 'UserModel'
    },
    updateTime: {        //更新时间
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserModel', UserSchema);