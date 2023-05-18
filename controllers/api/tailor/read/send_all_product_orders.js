const product_orders = require('./../../../../models/product_order')
const tailor = require('../../../../models/tailor')
const tailor_shop = require('../../../../models/tailor_shop')
const jwt = require('jsonwebtoken')

const send_all_product_orders = async (req, res) => {
    try {
        const decoded = jwt.decode(req.body.token)
        t = await tailor.findOne({ email: decoded.email })
        if (t === null || !t) {
            console.log("tailor not exists")
            throw { error_msg: "tailor does not exists" }
        }
        ts = await tailor_shop.find({ tailor_id: t._id }, ['_id'])
        if (ts === null || !ts) {
            console.log("tailor not exists")
            throw { error_msg: "tailor shop does not exists" }
        }

        total = results = await product_orders.countDocuments({ shop_id: { $in: ts } })
        if (total === null || !total) {
            console.log("tailor not exists")
            throw { error_msg: "Query error exists" }
        }
        results = await product_orders.find({ shop_id: { $in: ts } }, ["-updatedAt", "-__v", "-tailor_id", "-completion_pictures",]).limit(10).sort('-createdOn')
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