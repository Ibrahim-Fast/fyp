const tailor = require('../../../../models/tailor')
const service = require('../../../../models/service')
const jwt = require('jsonwebtoken')

const send_all_services = async (req, res) => {
    try {
        const decoded = jwt.decode(req.body.token)
        t = await tailor.findOne({ email: decoded.email })
        if (t === null || !t) {
            console.log("Tailor not exists")
            throw { error_msg: "Tailor does not exists" }
        }

        total = await service.countDocuments({ tailor_id: t._id })
        results = await service.find({ tailor_id: t._id }, ["-updatedAt", "-__v", "-tailor_id", "-service_description","-service_options","-payment_methods","-ordering_methods" ]).limit(10)
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

module.exports = send_all_services