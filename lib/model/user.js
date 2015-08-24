var mongoose = require('./mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: String,       //����
    password: String,    //����
    realName: String,    //��ʵ����
    dept: String,        //����
    duty: String,        //ְλ
    telephone: String,   //�绰
    mobile: String,      //�ֻ�
    adder: {             //�����
        type: String,
        ref: 'UserModel'
    },
    addTime: {           //���ʱ��
        type: Date,
        default: Date.now
    },
    updater: {
        type: String,    //������
        ref: 'UserModel'
    },
    updateTime: {        //����ʱ��
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserModel', UserSchema);