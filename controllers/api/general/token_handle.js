const jwt = require('jsonwebtoken')
const generate_refresh_token = require('./../../../configs/generate_refresh_token')
const generate_token = require('./../../../configs/generate_token')
const refresh_token_model = require('./../../../models/token')
const tailor = require('./../../../models/tailor')
const customer = require('./../../../models/customer')
const admin = require('./../../../models/admin')


const token_handle = async (req, res) => {
    try {
        c = []
        c2 = []
        if (!req.body.action || !req.body.refresh_token) {
            throw { error_msg: "incomplete", error_status: 400 }
        }
        decoded_token = jwt.decode(req.body.refresh_token)

        if (req.body.action === 'lo') {
            c2 = await refresh_token_model.deleteOne({ type: decoded_token.type, refresh_token: req.body.refresh_token })
            return res.status(200).send({ error: false, msg: "logged out" })
        }

        decoded_token = await jwt.verify(req.body.refresh_token, process.env.JWT_REFRESH_SECRET)

        c2 = await refresh_token_model.findOne({ refresh_token: req.body.refresh_token })
        let prt = JSON.parse(JSON.stringify(c2))
        // console.log(prt)

        if (c2 === null || c2.length === 0) {
            throw { error_msg: "session expired", error_status: 410 }
        }
        if (c2.usage_count >= 20 || c2.reuse_count >= 5) {
            c2 = await refresh_token_model.deleteOne({ type: decoded_token.type, refresh_token: req.body.refresh_token })
            // console.log(c2)
            if (!c2.acknowledged) {
                throw { error_msg: "request error", error_status: 404 }
            } else {
                throw { error_msg: "too many usages", error_status: 403 }
            }
        }

        if (decoded_token.type === 'a') {
            c = await admin.findOne({ email: decoded_token.email })
        } else if (decoded_token.type === 't') {
            c = await tailor.findOne({ email: decoded_token.email })
        } else if (decoded_token.type === 'c') {
            c = await customer.findOne({ email: decoded_token.email })
        } else {
            throw { error_msg: "bad request", error_status: 400 }
        }
        if (c === null || c.length === 0) {
            throw { error_msg: "invalid request", error_status: 410 }
        }

        if (req.body.action === 'rt') {
            // console.log(decoded_token)
            c2 = await refresh_token_model.updateOne({ email: decoded_token.email, type: decoded_token.type }, { $inc: { "usage_count": 1 } })
            t = generate_token(decoded_token.email, decoded_token.type)
            return res.send({ token: t })

        } else if (req.body.action === 'rrt') {

            c2 = await refresh_token_model.deleteOne({ type: decoded_token.type, refresh_token: req.body.refresh_token })
            rt = generate_refresh_token(decoded_token.email, decoded_token.type, decoded_token.rc + 1)
            c2 = await refresh_token_model.create({
                refresh_token: rt,
                type: decoded_token.type,
                email: decoded_token.email,
                reuse_count: prt.reuse_count + 1,
                usage_count: 0
            })
            return res.status(200).send({ error: false, refresh_token: rt })
        }
        else {
            return res.status(400).send({ error: true, error_msg: "bad request" })
        }
        return res.status(500).send({ error: false, msg: "hello" })

    } catch (e) {
        console.log(e)
        // console.log(JSON.stringify(e))
        if (e.error_msg) {
            return res.status(e.error_status).send({ error: true, error_msg: e.error_msg })
        } else if (e.name === "TokenExpiredError") {
            return res.status(401).send({ error: true, error_msg: "credentials expired" })
        } else if (e.reuse_count_exceed_error) {
            return res.status(e.error_status).send({ error: true, error_msg: "too many usages, current credentials block" })
        } else if (e.refresh_count_exceed_error) {
            return res.status(e.error_status).send({ error: true, error_msg: "refersh token can no longer be reused" })
        }
        else {
            return res.status(500).send({ error: true, error_msg: "could not process" })
        }
    }
}

module.exports = token_handle