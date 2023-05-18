const mongoose = require('mongoose');


const image_schema = mongoose.Schema({
    mimetype: {
        type: String,
        trim: true,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    uploaded_by: {
        type: String,
        required: true
    }
}, { timestamps: true })

const image = mongoose.model("image", image_schema);

module.exports = image