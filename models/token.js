const mongoose = require('mongoose');

const token_schema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        index: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        index: true,
        required: true
    },
    refresh_token: {
        type: String,
        trim: true,
        required: true,
        index: true
    },
    reuse_count: {
        type: Number,
        trim: true,
        required: true
    },
    usage_count:{
        type: Number,
        trim: true,
        required: true
    }
}, { timestamps: true })

token_schema.index({ email: 1, refresh_token: 1, type: 1 }, { unique: true })

const token = mongoose.model("token", token_schema);
module.exports = token