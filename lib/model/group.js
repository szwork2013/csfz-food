var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var GroupSchema = new Schema({
    groupName: String,
    adder: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    updater: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    addTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GroupModel', GroupSchema);