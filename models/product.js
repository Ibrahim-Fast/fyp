const mongoose = require('mongoose');


const product_schema = mongoose.Schema({
    product_name: {
        type: String,
        trim: true,
        required: true
    },
    stock_status: {
        type: Number,
        default: -1
    },
    stock_amount: {
        type: Number,
        default: -1
    },
    product_description: {
        type: String,
        trim: true
    },
    product_price: {
        type: Number,
        required: true
    },
    bulk_product_price: {
        type: Number,
        default: -1
    },
    bulk_minimum_items: {
        type: Number,
        default: -1
    },
    rating: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    visibility: { type: Number, default: 0 },
    product_images: [{
        _id: false,
        type: String
    }],
    product_options: [{
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
    product_categories: {
        other_tags: [{
            _id: false,
            type: String
        }],
        gender: { type: String },
        age_group: { type: String },
        season: { type: String },
        wear_type: { type: String },
        article_type: { type: String }
    }
}, { timestamps: true })

const product = mongoose.model("product", product_schema);

module.exports = product


