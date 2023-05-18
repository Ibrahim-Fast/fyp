const product_orders = require('./../../../../models/product_order')
const customer = require('../../../../models/customer')
const jwt = require('jsonwebtoken')

const send_all_product_orders = async (req, res) => {
    try {
        const decoded = jwt.decode(req.body.token)
        c = await customer.findOne({ email: decoded.email })
        if (c === null || !c) {
            console.log("customer not exists")
            throw { error_msg: "customer does not exists" }
        }

        total = results = await product_orders.countDocuments({ customer_id: c._id })
        results = await product_orders.find({ customer_id: c._id }, ["-updatedAt", "-__v", "-customer_id", "-tailor_id", "-completion_pictures",]).limit(10).sort('-createdOn')
        if (results === null || !results) {
            console.log("no product orders")
            res.send({ results: results })
        }
        res.send({ results: results, current: 10, of: total, next: total > 10 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_product_orders