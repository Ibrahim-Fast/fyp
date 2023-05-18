const service_orders = require('./../../../../models/service_order')
const customer = require('../../../../models/customer')
const jwt = require('jsonwebtoken')
const send_all_service_orders_paged = async (req, res) => {
    try {

        page = parseInt(req.params.page)
        if (isNaN(page)||page===0) {
            throw { error_msg: "Invalid page" }
        }

        const decoded = jwt.decode(req.body.token)
        c = await customer.findOne({ email: decoded.email })
        if (c === null || !c) {
            console.log("customer not exists")
            throw { error_msg: "customer does not exists" }
        }

        total = results = await service_orders.countDocuments({ customer_id: c._id })
        if ((page * 10) > total && page!==1) {
            throw { error_msg: "no more results" }
        }
        results = await service_orders.find({ customer_id: c._id }, ["-updatedAt", "-__v", "-customer_id", "-tailor_id", "-completion_pictures",]).skip((page - 1) * 10).limit(10).sort('-createdOn')
        if (results === null || !results) {
            console.log("no service orders")
            return res.send({ results: results })
        }
        res.send({ results: results, current: 10*page, of: total, next: total > page * 10 ? true : false, previous: page > 1 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        else return res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_service_orders_paged