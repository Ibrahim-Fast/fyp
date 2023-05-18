const mongoose = require('mongoose');


const service_schema = mongoose.Schema({
    service_name: {
        type: String,
        trim: true,
        required: true
    }, 
    visibility: { type: Number, default: 0 },
    service_description: {
        type: String,
        trim: true
    },
    service_price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },

    service_images: [{
        _id: false,
        type: String
    }],
    service_options: [{
        _id: false,
        type: Number
    }],
    payment_methods: [{
        _id: false,
        type: Number
    }],
    ordering_methods: [{
        _id: false,
        type: Number
    }],
    status: {
        type: Number,
        default: 0
    },
    shop_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "tailor_shop",
        required: true
    },
    tailor_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "tailor",
        required: true
    },
    thumbnail: {
        type: String
    },
    service_categories: {
        other_tags: [{
            _id: false,
            type: String
        }],
        gender: { type: String },
        age_group: { type: String },
        season: { type: String },
        service_type: { type: String }
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const service = mongoose.model("service", service_schema);

module.exports = service


