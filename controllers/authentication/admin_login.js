const admin = require('../../models/admin')
const bcrypt = require('bcryptjs')
const generate_token = require('../../configs/generate_token')
const generate_refresh_token = require('../../configs/generate_refresh_token')
const refresh_token = require('../../models/token')

const admin_login = async (req, res) => {
    try {

        let c = await admin.find({ email: req.body.email }, 'email password profile_picture first_name last_name mobile')
        if (c.length == 0) {
            return res.status(404).send({ error: true, error_msg: "email not registered" })
        }
        r = await bcrypt.compare(req.body.password, c[0].password)
        if (r) {
            let c2 = await refresh_token.find({ email: req.body.email, type: "a" })
            if (c2.length !== 0) {
                c2 = await refresh_token.deleteOne({ email: req.body.email, type: "a" })
                if (!c2.acknowledged) {
                    throw 'error deleting previous token'
                }
            }
            c = c[0]._doc
            rt = await generate_refresh_token(req.body.email, 'a', 0)

            c2 = await refresh_token.create({
                refresh_token: rt,
                type: "a",
                email: req.body.email,
                reuse_count: 0,
                usage_count: 0
            })
            if (c2.length === 0) {
                throw "something went wrong with session creation"
            }
            token = await generate_token(req.body.email, 'a')

            res.status(200).json({
                message: 'welcome ' + c.first_name + ' ' + c.last_name,
                token: token,
                refresh_token: rt
            })
        } else {
            return res.status(400).send({ error: true, error_msg: "wrong password" })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).send({ error: true, error_msg: "could not process" })
    }
}
module.exports = admin_login