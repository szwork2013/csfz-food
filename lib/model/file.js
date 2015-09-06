var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var FileSchema = new Schema({
    data: Buffer
});

module.exports = mongoose.model('FileModel', FileSchema);