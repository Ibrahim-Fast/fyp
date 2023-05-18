const customer = require('../../models/customer')
const bcrypt = require('bcryptjs')
const generate_token = require('../../configs/generate_token')
const refresh_token = require('../../models/token')
const generate_refresh_token = require('../../configs/generate_refresh_token')


const customer_login = async (req, res) => {
    try {

        let c = await customer.find({ email: req.body.email }, 'email password profile_picture first_name last_name mobile')
        if (c.length == 0) {
            return res.status(404).send({ error: true, error_msg: "email not registered" })
        }
        r = await bcrypt.compare(req.body.password, c[0].password)
        if (r) {
            let c2 = await refresh_token.find({ email: req.body.email, type: "c" })
            if (c2.length !== 0) {
                c2 = await refresh_token.deleteOne({ email: req.body.email, type: "c" })
                if (!c2.acknowledged) {
                    throw 'error deleting previous token'
                }
            }
            rt = generate_refresh_token(req.body.email, 'c', 0)

            c2 = await refresh_token.create({
                refresh_token: rt,
                type: "c",
                email: req.body.email,
                reuse_count: 0,
                usage_count: 0
            })
            if (c2.length === 0) {
                throw "something went wrong with session creation"
            }
            c = c[0]._doc
            // console.dir(c)
            token = generate_token(req.body.email, 'c')

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
module.exports = customer_login