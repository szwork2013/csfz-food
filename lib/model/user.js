var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: String,
    password: String,
    realName: String,
    dept: String,
    duty: String,
    telephone: String,
    mobile: String,
    headImg: {
        type: String,
        ref: 'ImageModel'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'GroupModel'
    },
    adder: {
        type: String,
        ref: 'UserModel'
    },
    addTime: {
        type: Date,
        default: Date.now
    },
    updater: {
        type: String,
        ref: 'UserModel'
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserModel', UserSchema);