const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const adScheme = new Schema({
    adName: {
        type: String,
        required: true
    },
    descName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ad', adScheme);