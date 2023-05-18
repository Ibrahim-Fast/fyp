const mongoose = require('mongoose');


const service_order_schema = mongoose.Schema({
    shop_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "tailor_shop",
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "customer",
        required: true
    },
    tailor_id: {
        type: mongoose.Schema.Types.ObjectId, ref: "tailor",
        required: true
    },
    selected_services: [{
        service_id: { type: mongoose.Schema.Types.ObjectId, ref: "service", required: true },
        quantity: Number
    }],
    payment_method: {
        payment_name: String
    },
    ordering_type: {
        type_name: String,
        discount: Number
    },
    status: {
        type: String,
        default: 0
    },
    expected_dates: {
        min: String,
        max: String
    },
    estimated_dates: {
        min: String,
        max: String
    },
    final_cost: Number,
    final_discount: Number,
    completion_pictures:[String]
}, { timestamps: true })

const service_order = mongoose.model("service_order", service_order_schema);

module.exports = service_order