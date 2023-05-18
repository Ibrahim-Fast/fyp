const tailor = require('../../../../models/tailor')
const jwt = require('jsonwebtoken')

const send_tailor_info = async (req, res) => {
    try {
        // console.log('here')
        const decoded = jwt.decode(req.body.token)
        t = await tailor.findOne({ email: decoded.email },['-password','-updatedAt','-__v','-_id'])
        if (t === null || !t) {
            // console.log("tailor not exists")
            throw { error_msg: "tailor does not exists" }
        }
        res.send(t)
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "SERVER ERROR" })
    }

}

module.exports = send_tailor_info