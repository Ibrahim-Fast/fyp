const customer = require('../../../../models/customer')
const jwt = require('jsonwebtoken')

const send_account_info = async (req, res) => {
    try {
        // console.log('here')
        const decoded = jwt.decode(req.body.token)
        t = await customer.findOne({ email: decoded.email },['-password','-updatedAt','-__v','-_id'])
        if (t === null || !t) {
            // console.log("customer not exists")
            throw { error_msg: "customer does not exists" }
        }
        res.send(t)
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_account_info