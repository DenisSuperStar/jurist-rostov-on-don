const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPhone: {
        type: String,
        required: true,
        unique: true
    },
    userMessage: {
        type: String,
        required: true
    }
}, 
{
    versionKey: false
});

module.exports = mongoose.model('User', userSchema);