const mongoose = require('mongoose');


const product_order_schema = mongoose.Schema({
    shop_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "tailor_shop",
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "customer",
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "product",
        required: true
    },
    quantity: {
        type: Number
    },
    order_payment_type: {
        type: Number
    },
    negotiation_status: {
        type: Number
    },
    negotiation_amount_offered: {
        type: Number,
        default: -1
    },
    urgent: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    customer_expected_dates: {
        min: String,
        max: String
    },
    tailor_estimated_dates: {
        min: String,
        max: String
    },
    extra_charges: [{
        _id: false,
        description: { type: String },
        amount: { type: Number }
    }],
    amount: { type: Number },
    balance: { type: Number },
    given: { type: Number },
    payment_token: { type: Object, default: {} },
    message: [{
        by: { type: String },
        message: { type: String }
    }],
    product_name: {
        type: String
    },
    delivery_address: {
        type: String
    },
    completion_pictures: [String]
}, { timestamps: true })

const product_order = mongoose.model("product_order", product_order_schema);

module.exports = product_order