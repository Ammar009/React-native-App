const mongoose = require('mongoose');

const UserTipRecieverSchema = mongoose.Schema({
    reciever_name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    reciever_email: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    reciever_cardNo : {
        type: Number,
        trim: true,
        minLength: 5,
        maxLength: 255,
        required: true
    },
    tipGiver_name: {
        type: String,
        minLength: 5,
        maxLength: 1024,
        required: true
    },
    tipGiver_email: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    tipAmount: {
        type: Number,
        required: true
    },
    recievingDate: {
        type: String,
        required: true
    },
})
const UserTipReciever = mongoose.model('UsersTipReciever', UserTipRecieverSchema, 'userTipReciever');
exports.UserTipReciever = UserTipReciever;