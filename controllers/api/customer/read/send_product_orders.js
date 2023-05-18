const jwt = require('jsonwebtoken')
const customer = require('../../../../models/customer')
const product_order = require('../../../../models/product_order')
const mongoose = require('mongoose');

const send_product_order = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            throw { error_msg: "INVALID PRODUCT ORDER ID" }
        }
        const decoded = jwt.decode(req.body.token)
        c = await customer.findOne({ email: decoded.email })
        if (c === null || !c) {
            throw { error_msg: "CUSTOMER DOES NOT EXISTS" }
        }

        so = await product_order.findOne({ _id: req.params.id, customer_id: c._id }, ['-__v', '-customer_id', '-tailor_id', '-ordering_type.discount'])
        if (so === null || !so) {
            throw { error_msg: "THIS PRODUCT ORDER DOES NOT EXISTS RELATIVE TO THIS CUSTOMER" }
        }
        res.send(so)
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = send_product_order