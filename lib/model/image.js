var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    filename: String,
    data: Buffer,
    contentType: String,
    width: Number,
    height: Number,
    size: Number,
    adder: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    addTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ImageModel', ImageSchema);