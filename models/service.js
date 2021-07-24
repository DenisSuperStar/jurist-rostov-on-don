const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const serviceScheme = new Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tooltip: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Service', serviceScheme);