const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const mainScheme = new Schema({
    ad: {
        type: Array,
        required: true
    },
    activity: {
        type: Array,
        required: true
    },
    service: {
        type: Array,
        required: true
    },
    order: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Main', mainScheme);