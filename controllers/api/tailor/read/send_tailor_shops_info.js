const tailor_shop = require('../../../../models/tailor_shop')
const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')

const send_all_shops = async (req, res) => {
    try {
        const decoded = jwt.decode(req.body.token)
        t = await tailor.findOne({ email: decoded.email })
        if (t === null || !t) {
            console.log("customer not exists")
            throw { error_msg: "customer does not exists" }
        }

        total = await tailor_shop.countDocuments({ tailor_id: t._id })
        results = await tailor_shop.find({ tailor_id: t._id }, ["-updatedAt", "-__v", "-tailor_id", "-shop_pictures", "-other_contacts", "-shop_address_link", "-shop_schedule"]).limit(10).sort('-createdOn')
        if (results === null || !results || results.length === 0) {
            console.log("no shops")
            return res.send({ results: results })
        }
        // console.log(results)
        res.send({ results: results, current: 10, of: total, next: total > 10 ? true : false })
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_all_shops