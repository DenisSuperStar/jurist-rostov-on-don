const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const personScheme = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    userMessage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Person', personScheme);