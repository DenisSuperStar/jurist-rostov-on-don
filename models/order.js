const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const orderScheme = new Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceDecs: {
        type: String,
        required: true
    },
    servicePrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderScheme);