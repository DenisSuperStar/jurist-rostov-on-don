const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const activityScheme = new Schema({
    ordinal: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Activity', activityScheme);