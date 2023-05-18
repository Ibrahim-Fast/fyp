const jwt = require('jsonwebtoken')
const tailor = require('../../../../models/tailor')
const tailor_portfolio = require('../../../../models/tailor_portfolio')
const product = require('../../../../models/product')
const mongoose = require('mongoose');

const send_tailor_portfolio = async (req, res) => {
    try {
        const decoded = jwt.decode(req.body.token)
        t = await tailor.exists({ email: decoded.email })
        if (t === null || !t) {
            throw { error_msg: "TAILOR DOES NOT EXISTS" }
        }

        tp = await tailor_portfolio.findOne({ tailor_id: t }).populate({
            path: 'tailor_id', model: 'tailor', select: `
        email first_name last_name mobile profile_picture
        `}).exec()
        if (tp === null || !tp) {
            return res.status(404).send({ error_msg: "Portfolio Has Either been deleted or not been made" })
            // throw { error_msg: "DOES NOT EXISTS" }
        }


        return res.send(tp)
    } catch (e) {
        console.log(e)
        if (e.error_msg) res.status(400).send({ error_msg: e.error_msg })
        else res.status(500).send({ error_msg: "server error" })
    }

}

module.exports = send_tailor_portfolio