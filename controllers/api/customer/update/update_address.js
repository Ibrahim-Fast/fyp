const customer = require('../../../../models/customer')
const jwt = require('jsonwebtoken')

const send_account_info = async (req, res) => {
    try {
        if (typeof req.body.address === undefined || req.body.address === '') {
            throw { error_msg: "incomplete" }
        }
        const decoded = jwt.decode(req.body.token)
        t = await customer.findOne({ email: decoded.email }, ['-password', '-updatedAt', '-__v', '-_id'])
        if (t === null || !t) {
            throw { error_msg: "customer does not exists" }
        }

        a = await customer.updateOne({ email: decoded.email }, { address: req.body.address })
        if (a === null || !a) {
            throw { error_msg: "update unsuccessfull" }
        }

        res.send('successfully updated')
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_account_info