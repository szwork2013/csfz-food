var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var StoreSchema = new Schema({
    name: String,
    description: String,
    mainProduct: String,
    telephone: String,
    address: String,
    image: {
        type: String,
        ref: 'ImageModel'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'GroupModel'
    },
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

module.exports = mongoose.model('StoreModel', StoreSchema);