const tailor_shop = require('../../../../models/tailor_shop')
const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')
const send_all_service_orders_paged = async (req, res) => {
    try {

        page = parseInt(req.params.page)
        if (isNaN(page) || page === 0) {
            throw { error_msg: "Invalid page" }
        }

        const decoded = jwt.decode(req.body.token)
        t = await tailor.findOne({ email: decoded.email })
        if (t === null || !t) {
            console.log("tailor not exists")
            throw { error_msg: "tailor does not exists" }
        }

        total = results = await tailor_shop.countDocuments({ tailor_id: t._id })
        if (Math.ceil(page / 10) * 10 > total && page !== 1) {
            throw { error_msg: "no more results" }
        }
        results = await tailor_shop.find({ tailor_id: t._id }, ["-updatedAt", "-__v", "-tailor_id", "-shop_pictures", "-other_contacts", "-shop_address_link", "-shop_schedule"]).skip((page - 1) * 10).limit(10)
        if (results === null || !results) {
            console.log("no shops")
            return res.send({ results: results })
        }
        res.send({ results: results, current: 10 * page, of: total, next: total > page * 10 ? true : false, previous: page > 1 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) return res.status(400).send({ error_msg: e.error_msg })
        else return res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_service_orders_paged