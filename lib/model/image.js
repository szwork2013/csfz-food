var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    name: String,
    data: Buffer,
    creater: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    addTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ImageModel', ImageSchema);